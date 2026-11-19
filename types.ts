export interface Demo {
  id: string;
  title: string;
  description: string;
  categories: DemoCategory[];
  imageUrl: string;
  tags: string[];
  featured?: boolean;
  author: string;
  views: number;
  url: string;
}

export enum DemoCategory {
  ALL = 'All',
  VISUAL_ANALYTICS = 'Visual Analytics',
  VISUAL_INVESTIGATOR = 'Visual Investigator',
  INTELLIGENT_DECISIONING = 'Intelligent Decisioning',
  MODEL_STUDIO = 'Model Studio',
  OCR = 'OCR',
  OPTIMIZATION = 'Optimization',
  GENERATIVE_AI = 'Generative AI'
}

export interface NavItem {
  label: string;
  href: string;
}