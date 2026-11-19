/**
 * Reads the demo list from demos.xlsx and hands it to the app.
 *
 * The app imports the result with:  import { demos, tags } from 'virtual:demos'
 *
 * - `npm run dev`   re-reads the sheet and refreshes the browser every time the file is saved.
 * - `npm run build` reads the sheet once and bakes the demos into the site.
 */
import fs from 'node:fs';
import path from 'node:path';
import readExcelFile from 'read-excel-file/node';
import type { Plugin } from 'vite';
import type { Demo } from '../types';

const VIRTUAL_ID = 'virtual:demos';
const RESOLVED_ID = '\0' + VIRTUAL_ID;
const SHEET_NAME = 'demos';

/** Column headers we accept for each field (compared in lower case, ignoring spaces and punctuation). */
const COLUMN_ALIASES = {
  name: ['name', 'title', 'demo', 'demoname', 'demotitle'],
  description: ['description', 'desc', 'summary', 'about'],
  tags: ['tags', 'tag', 'category', 'categories'],
  link: ['link', 'url', 'demolink', 'demourl', 'links'],
  image: ['imagelink', 'image', 'imageurl', 'picture', 'picturelink', 'photo', 'thumbnail'],
  keywords: ['keywords', 'keyword', 'hashtags', 'hashtag'],
  featured: ['featured', 'feature', 'highlight', 'highlighted'],
} as const;

type Field = keyof typeof COLUMN_ALIASES;
type Cell = string | number | boolean | Date | null | undefined;

export interface DemoSheet {
  demos: Demo[];
  tags: string[];
  warnings: string[];
}

const normalizeHeader = (value: Cell) => String(value ?? '').toLowerCase().replace(/[^a-z0-9]/g, '');

const text = (value: Cell) => (value == null ? '' : String(value).trim());

/** "Visual Analytics, GenAI; OCR" -> ["Visual Analytics", "GenAI", "OCR"] */
const splitList = (value: Cell) => {
  const seen = new Set<string>();
  return text(value)
    .split(/[,;\n]+/)
    .map((item) => item.trim().replace(/\s+/g, ' '))
    .filter((item) => {
      const key = item.toLowerCase();
      if (!item || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
};

const isYes = (value: Cell) => value === true || ['yes', 'y', 'true', '1', 'x', 'featured'].includes(text(value).toLowerCase());

/** Returns a safe http(s) address, or '' when the cell is not a web address. */
const toWebAddress = (value: Cell) => {
  const raw = text(value);
  if (!raw || /\s/.test(raw)) return '';
  const candidate = /^https?:\/\//i.test(raw) ? raw : /^[a-z0-9-]+(\.[a-z0-9-]+)+([/:?#]|$)/i.test(raw) ? `https://${raw}` : '';
  if (!candidate) return '';
  try {
    return new URL(candidate).href;
  } catch {
    return '';
  }
};

/** Images may be a web address or a file inside the `public` folder (e.g. "images/my-demo.png"). */
const toImageAddress = (value: Cell) => {
  const raw = text(value);
  if (!raw) return '';
  const web = toWebAddress(raw);
  if (web) return web;
  if (/^[a-z][a-z0-9+.-]*:/i.test(raw) || /\s/.test(raw) || !/\.(png|jpe?g|gif|webp|svg|avif)$/i.test(raw)) return '';
  return '/' + raw.replace(/\\/g, '/').replace(/^(\.?\/)+/, '').replace(/^public\//i, '');
};

const slug = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'demo';

export async function readDemoSheet(file: string): Promise<DemoSheet> {
  const fileName = path.basename(file);

  let buffer: Buffer;
  try {
    buffer = fs.readFileSync(file);
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    if (code === 'ENOENT') throw new Error(`${fileName} was not found. It must sit in the main project folder, next to package.json.`);
    throw new Error(`${fileName} could not be opened (${code}). If it is open in Excel, close it and try again.`);
  }

  let sheets: Awaited<ReturnType<typeof readExcelFile>>;
  try {
    sheets = await readExcelFile(buffer);
  } catch {
    throw new Error(`${fileName} could not be read. Make sure it is saved as an Excel Workbook (.xlsx).`);
  }

  const sheet = sheets.find((candidate) => candidate.sheet.trim().toLowerCase() === SHEET_NAME) ?? sheets[0];
  const rows = (sheet?.data ?? []) as Cell[][];

  // The header row is the first row that has a "Name" column.
  const headerIndex = rows.slice(0, 10).findIndex((row) => row.some((cell) => COLUMN_ALIASES.name.includes(normalizeHeader(cell) as never)));
  if (headerIndex === -1) {
    throw new Error(`${fileName}: the "${sheet?.sheet}" sheet needs a header row with a "Name" column. Compare it with the headers described in the README.`);
  }

  const columns = {} as Partial<Record<Field, number>>;
  rows[headerIndex].forEach((cell, index) => {
    const header = normalizeHeader(cell);
    for (const field of Object.keys(COLUMN_ALIASES) as Field[]) {
      if (columns[field] === undefined && (COLUMN_ALIASES[field] as readonly string[]).includes(header)) columns[field] = index;
    }
  });
  const cell = (row: Cell[], field: Field) => (columns[field] === undefined ? null : row[columns[field]!]);

  const warnings: string[] = [];
  const tagSpelling = new Map<string, string>(); // lower case -> spelling used the first time
  const demos: Demo[] = [];

  rows.slice(headerIndex + 1).forEach((row, offset) => {
    const rowNumber = headerIndex + offset + 2; // as shown in Excel
    if (row.every((value) => text(value) === '')) return;

    const title = text(cell(row, 'name'));
    if (!title) {
      warnings.push(`Row ${rowNumber} was skipped because the Name is empty.`);
      return;
    }

    const url = toWebAddress(cell(row, 'link'));
    if (!url) {
      warnings.push(
        text(cell(row, 'link'))
          ? `Row ${rowNumber} ("${title}"): the Link is not a web address, so the card shows "Coming soon". Use the full address, e.g. https://example.com`
          : `Row ${rowNumber} ("${title}"): the Link is empty, so the card shows "Coming soon".`,
      );
    }

    const imageUrl = toImageAddress(cell(row, 'image'));
    if (!imageUrl && text(cell(row, 'image'))) {
      warnings.push(`Row ${rowNumber} ("${title}"): the Image Link is not an image address, so the default picture is used.`);
    }

    const tags = splitList(cell(row, 'tags')).map((tag) => {
      const key = tag.toLowerCase();
      if (!tagSpelling.has(key)) tagSpelling.set(key, tag);
      return tagSpelling.get(key)!;
    });

    demos.push({
      id: `${rowNumber}-${slug(title)}`,
      title,
      description: text(cell(row, 'description')),
      tags,
      keywords: splitList(cell(row, 'keywords')).map((keyword) => keyword.replace(/^#+/, '')).filter(Boolean),
      url,
      imageUrl,
      featured: isYes(cell(row, 'featured')),
    });
  });

  const tags = [...tagSpelling.values()].sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }));
  return { demos, tags, warnings };
}

export default function excelDemos(fileName = 'demos.xlsx'): Plugin {
  let file = path.resolve(fileName);

  return {
    name: 'excel-demos',

    configResolved(config) {
      file = path.resolve(config.root, fileName);
    },

    resolveId(id) {
      return id === VIRTUAL_ID ? RESOLVED_ID : undefined;
    },

    async load(id) {
      if (id !== RESOLVED_ID) return undefined;

      const { demos, tags, warnings } = await readDemoSheet(file);
      console.log(`\n[demos] Loaded ${demos.length} demos and ${tags.length} tags from ${path.basename(file)}`);
      warnings.forEach((warning) => console.warn(`[demos] Warning: ${warning}`));

      return `export const demos = ${JSON.stringify(demos)};\nexport const tags = ${JSON.stringify(tags)};\n`;
    },

    // While developing: refresh the browser whenever the Excel file is saved.
    configureServer(server) {
      let timer: NodeJS.Timeout | undefined;
      const refresh = (changed: string) => {
        if (path.resolve(changed) !== file) return;
        clearTimeout(timer);
        timer = setTimeout(() => {
          const module = server.moduleGraph.getModuleById(RESOLVED_ID);
          if (module) server.moduleGraph.invalidateModule(module);
          server.ws.send({ type: 'full-reload' });
        }, 300);
      };
      server.watcher.add(file);
      server.watcher.on('add', refresh);
      server.watcher.on('change', refresh);
    },
  };
}
