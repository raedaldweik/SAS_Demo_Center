# META AI Demo Center

A website that shows the team's demos as a grid of cards, with a search box and filter buttons.

**The list of demos lives in one Excel file: [`demos.xlsx`](demos.xlsx).**
You do not need to write code to add, change or remove a demo. Edit the Excel file, upload it, and the website rebuilds itself.

```
demos.xlsx  ──►  GitHub (this repository)  ──►  Railway rebuilds the site  ──►  live website
 you edit          you upload the file           automatic, a few minutes
```

## Contents

1. [Add, change or remove a demo](#1-add-change-or-remove-a-demo)
2. [Open the site on your own computer](#2-open-the-site-on-your-own-computer)
3. [Deploy on Railway](#3-deploy-on-railway)
4. [Troubleshooting](#4-troubleshooting)
5. [For developers](#5-for-developers)

---

## 1. Add, change or remove a demo

### Step 1: Get the Excel file

1. Open this repository on GitHub.
2. Click **`demos.xlsx`** in the file list.
3. Click the **Download raw file** button (the arrow pointing down, top right of the file view).

### Step 2: Edit it in Excel

Open the file and go to the **Demos** sheet. Every row is one card on the website.

- **Add a demo:** fill in the next empty row.
- **Change a demo:** edit its row.
- **Remove a demo:** delete its row.
- **Change the order:** move the rows. Cards appear in the same order as the rows.

| Column | Needed? | What to write | Example |
| --- | --- | --- | --- |
| **Name** | Required | The demo title shown on the card. | `AI Radar` |
| **Description** | Optional | One or two sentences about the demo. | `A personalized AI intelligence platform.` |
| **Tags** | Optional | The filter buttons at the top of the website. Separate several tags with commas. The first tag is also shown on the card picture. | `Visual Analytics, Generative AI` |
| **Link** | Required | The full web address of the demo, starting with `https://`. If it is empty, the card shows "Coming soon" and cannot be opened. | `https://example.com/my-demo` |
| **Image Link** | Optional | The web address of a picture for the card. Leave it empty to use the default picture. | `https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800` |
| **Keywords** | Optional | Small `#hashtags` under the description. The search box also looks at them. Separate with commas. The card shows the first three. | `GenAI, Automation, AgenticAI` |
| **Featured** | Optional | `Yes` shows a "Featured" label on the card. | `Yes` |

The same guide is inside the Excel file, on the **How to use** sheet.

#### How tags become the navigation

The filter buttons at the top of the website are built from the **Tags** column. Nothing else needs to be changed.

- Type a tag nobody used before, and a new button appears.
- When no demo uses a tag any more, its button disappears.
- Buttons are sorted from A to Z, after the **All** button.
- Spelling matters: `Gen AI` and `Generative AI` become two different buttons. Capital letters do not matter (`ocr` and `OCR` are the same tag).

#### Pictures

- Leave **Image Link** empty and the card uses the default picture.
- An image link must point straight at a picture. The address usually ends in `.jpg` or `.png`. To test a link, paste it into your browser: you should see only the picture, nothing else.
- If a picture cannot be loaded, the website shows the default picture instead of a broken image.
- To use a picture file of your own, upload it to the `public/images` folder of this repository and write `images/your-file-name.png` in the Image Link column.

#### Rules for the Excel file

- Keep the file name `demos.xlsx` and keep the sheet name `Demos`.
- Do not rename the headers in row 1. You may reorder the columns or add extra columns of your own; the website ignores columns it does not know.
- Type web addresses out in full. Link text such as "Click here" does not work, even if Excel makes it clickable.

### Step 3: Upload it to GitHub

1. Save the file and close Excel.
2. Open this repository on GitHub.
3. Click **Add file**, then **Upload files**.
4. Drag your `demos.xlsx` into the page. Because the name is the same, it replaces the old file.
5. Click **Commit changes**.

Railway notices the new file and rebuilds the website. The change is live a few minutes later. Refresh the website to see it.

> GitHub keeps every earlier version of the file. If something goes wrong, open `demos.xlsx` on GitHub and click **History** to get an older version back.

---

## 2. Open the site on your own computer

Use this to preview your changes before you upload them. Everything stays on your computer.

### One-time setup

1. Install **Node.js**, version 22 or newer, from [nodejs.org](https://nodejs.org). Choose the **LTS** download and accept the default options.
2. Get the project: on GitHub click the green **Code** button, then **Download ZIP**, and unzip it. (If you use Git: `git clone https://github.com/raedaldweik/SAS_Demo_Center.git`.)
3. Open a terminal **inside the project folder**:
   - **Windows:** open the folder in File Explorer, click the address bar, type `cmd` and press Enter.
   - **Mac:** open the Terminal app, type `cd ` (with a space after it), drag the folder into the window and press Enter.
4. Install what the project needs. This takes a minute and is needed only once:

   ```bash
   npm install
   ```

### Start the site

```bash
npm run dev
```

Open **http://localhost:3000** in your browser.

While it is running, edit `demos.xlsx` in the project folder and save. The browser page refreshes by itself and shows your change. The terminal prints a warning for every row it could not use, for example a row with no name.

To stop the site, click in the terminal window and press **Ctrl + C**.

### Check the final version (optional)

This builds the site exactly the way Railway does and serves the result:

```bash
npm run build
```

```bash
npm run preview
```

Open **http://localhost:4173**.

---

## 3. Deploy on Railway

[Railway](https://railway.com) hosts the website. Set it up once; after that every upload to GitHub goes live by itself.

### First deployment

1. Sign in at [railway.com](https://railway.com) with the GitHub account that can see this repository.
2. On the dashboard click **New Project**.
3. Choose **GitHub repo**. If Railway asks for access to GitHub, allow it for this repository.
4. Search for `SAS_Demo_Center` and click it.
5. Click **Deploy Now**. Railway builds the site; wait until the deployment shows as successful.
6. Give the site an address: click the service, open **Settings**, find **Networking → Public Networking** and click **Generate Domain**.
7. Open the address Railway shows you (it ends in `.up.railway.app`). That is the live website.

No settings need to be filled in. Railway works out the rest from the files in this repository.

### What Railway does on every deployment

| Step | What happens |
| --- | --- |
| Install | Railway installs Node.js 22 (set in [`.nvmrc`](.nvmrc)) and the packages listed in `package.json`. |
| Build | It runs `npm run build`. This reads `demos.xlsx` and creates the finished website in a folder called `dist`. |
| Serve | It serves the `dist` folder as a static website. There is no server program to keep running and no start command. |

**Automatic updates:** the service is linked to the `main` branch. Every time a file is uploaded there, for example a new `demos.xlsx`, Railway deploys again. This needs at least one member of the Railway project to have a connected GitHub account with access to the repository. To check or change the branch, open the service **Settings**.

**Safety net:** if the Excel file is broken (for example the Name header was renamed), the build fails and Railway keeps showing the previous working version of the website. Fix the file and upload it again.

### Railway configuration in this repository

| File | What it is for |
| --- | --- |
| [`.nvmrc`](.nvmrc) | The Node.js version Railway uses. |
| [`package.json`](package.json) | Holds the `build` command Railway runs. |
| [`.railway/railway.ts`](.railway/railway.ts) | Optional. Describes the Railway service as code, for people who use the Railway command line. |

There is no `railway.json` on purpose. Railway has retired that file format: new services cannot use it, and existing ones stop reading it on 1 December 2026. `.railway/railway.ts` is the replacement.

### Optional: deploy with the Railway command line

The dashboard steps above are all most people need. Use this only if you prefer the terminal. Run the commands inside the project folder.

```bash
npm install
```

```bash
npm install -g @railway/cli
```

```bash
railway login
```

Create a new, empty Railway project (or use `railway link` to pick an existing one):

```bash
railway init
```

Preview what would change. This changes nothing:

```bash
railway config plan
```

Apply it:

```bash
railway config apply
```

Then generate the domain in the dashboard as in step 6 above.

> **Read the plan before applying.** `.railway/railway.ts` describes the whole Railway project. A service that exists in the project but is not in that file is deleted by `apply`. Only use it on a project that holds nothing but the demo center.

If the repository is moved or renamed, change the repository name inside `.railway/railway.ts`.

---

## 4. Troubleshooting

| Problem | What to do |
| --- | --- |
| I uploaded the Excel file but the website did not change. | Wait a few minutes and refresh the page. Then open the project on Railway and look at the latest deployment. If it failed, click it and read the build log: the reason is in a line starting with `[excel-demos]`. |
| The deployment failed with "needs a header row with a Name column". | A header in row 1 of the **Demos** sheet was renamed or deleted. Restore the headers from the table in section 1. |
| The deployment failed with "could not be read". | The file is not a real Excel workbook. In Excel use **Save As** and choose **Excel Workbook (.xlsx)**. |
| My new demo does not appear. | The **Name** cell is empty, or the row was added on a different sheet than **Demos**. |
| A card shows "Coming soon" and cannot be clicked. | The **Link** cell is empty or is not a full web address. It must look like `https://example.com/...`. |
| A card shows the default picture instead of mine. | The **Image Link** is not a direct link to a picture. See [Pictures](#pictures). |
| The same tag shows up as two buttons. | It is spelled in two different ways in the **Tags** column. Make the spelling identical. |
| `npm install` or `npm run dev` says the command was not found. | Node.js is not installed, or the terminal was opened before installing it. Install Node.js, then open a new terminal. |
| `npm run dev` says `demos.xlsx` could not be opened. | Close the file in Excel and save again, then refresh the page. |
| The page at `localhost:3000` does not open. | The site is not running. Run `npm run dev` and leave that terminal window open. |

---

## 5. For developers

The site is a React app built with Vite. It is a static site: there is no backend and no database.

`demos.xlsx` is read at build time by a small Vite plugin, [`plugins/excel-demos.ts`](plugins/excel-demos.ts). The plugin turns the rows into the module `virtual:demos`, which the app imports like any other file. In development the plugin watches the Excel file and reloads the browser when it is saved.

| Path | What it is |
| --- | --- |
| `demos.xlsx` | The demo list. The only file the team needs to edit. |
| `plugins/excel-demos.ts` | Reads `demos.xlsx`, checks each row, builds the tag list. The accepted column headers are at the top of this file. |
| `App.tsx` | The page: title, search box, filter buttons, grid. The site title and subtitle are plain text in this file. |
| `components/DemoCard.tsx` | One demo card. |
| `constants.ts` | The logo address and the default picture path. |
| `types.ts` | The shape of one demo. |
| `public/default-demo.svg` | The default card picture. Replace this file to change it. |
| `public/images/` | Put your own card pictures here (create the folder when you need it). |
| `index.html` | Page shell. Tailwind CSS and the Inter font are loaded from a CDN here. |
| `vite.config.ts` | Vite settings. The dev server runs on port 3000. |
| `.railway/railway.ts` | Railway Infrastructure as Code (optional, see section 3). |
| `metadata.json` | Left over from Google AI Studio. Not used by the site. |

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the site on http://localhost:3000 with live reload. |
| `npm run build` | Builds the production site into `dist`. |
| `npm run preview` | Serves the built `dist` folder on http://localhost:4173. |
