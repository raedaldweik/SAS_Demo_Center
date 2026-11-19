import { Demo, DemoCategory } from './types';

export const SAS_LOGO_URL = "https://awsmp-logos.s3.amazonaws.com/304bf786-2bd9-4c7c-ae65-8564a4debd6a/bb93d241691595c07cb96277299ee4da.png";

export const DEMO_DATA: Demo[] = [
  {
    id: '4',
    title: 'AI Radar',
    description: 'A personalized AI intelligence platform that curates emerging AI trends, use cases, and risks by industry and domain.',
    categories: [DemoCategory.VISUAL_ANALYTICS, DemoCategory.GENERATIVE_AI],
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800', // Tech/Radar/Connection
    tags: ['API Integration', 'GlobalIntelligence', 'Analytics', 'MapDashboard'],
    author: 'SAS AI Team',
    views: 1560,
    url: 'https://sas-ai-radar-211428915761.us-west1.run.app/'
  },
  {
    id: '6',
    title: 'Gen AI Operations Hub',
    description: 'A unified GenAI-powered operations platform for forecasting arrivals, monitoring KPIs, and optimizing airport performance.',
    categories: [DemoCategory.VISUAL_ANALYTICS, DemoCategory.MODEL_STUDIO, DemoCategory.OPTIMIZATION, DemoCategory.GENERATIVE_AI],
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800', // AI/Neural Network/Futuristic
    tags: ['GenAI', 'AIWorkflow', 'Automation', 'AgenticAI'],
    featured: true,
    author: 'GenAI Ops',
    views: 3200,
    url: 'https://sas-genai-operations-hub-211428915761.us-west1.run.app'
  },
  {
    id: '2',
    title: 'Driver Risk Score',
    description: 'Predictive risk scoring that identifies high-risk drivers using historical behavior and incidents to support proactive road safety interventions.',
    categories: [DemoCategory.VISUAL_ANALYTICS, DemoCategory.INTELLIGENT_DECISIONING, DemoCategory.MODEL_STUDIO],
    imageUrl: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=800', // Driving/Traffic
    tags: ['AI', 'RiskScoring', 'TrafficSafety'],
    featured: true,
    author: 'Raed Aldweik',
    views: 890,
    url: 'https://raedaldweik.github.io/Driver_risk_score/'
  },
  {
    id: '3',
    title: 'Flood Management',
    description: 'AI-driven flood risk forecasting and geospatial insights to support early warning, preparedness, and emergency response planning.',
    categories: [DemoCategory.VISUAL_ANALYTICS, DemoCategory.VISUAL_INVESTIGATOR, DemoCategory.MODEL_STUDIO, DemoCategory.OPTIMIZATION],
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800', // Geospatial/Map
    tags: ['SmartCity', 'FloodManagement', 'EmergencyResponse', 'GeospatialAI'],
    author: 'Raed Aldweik',
    views: 2100,
    url: 'https://raedaldweik.github.io/AD_Flood/New_Report/'
  },
  {
    id: '7',
    title: 'SAS AI Loan Risk Analyst',
    description: 'GenAI-assisted analysis of bank statements and financial documents to accelerate and standardize credit risk assessment.',
    categories: [DemoCategory.GENERATIVE_AI, DemoCategory.OCR, DemoCategory.INTELLIGENT_DECISIONING],
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800', // Finance/Charts/Data
    tags: ['FinanceAI', 'RiskAnalysis', 'CreditScoring', 'BankingAnalytics'],
    author: 'FinTech Solutions',
    views: 1100,
    url: 'https://ocr-retail-211428915761.us-west1.run.app/'
  },
  {
    id: '1',
    title: 'VA Landing Page',
    description: "Centralized Visual Analytics landing page for all of the customer's analytical dashboards.",
    categories: [DemoCategory.VISUAL_ANALYTICS],
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800', // Dashboard/Analytics
    tags: ['VisualAnalytics', 'Dashboard', 'Logs'],
    featured: true,
    author: 'Admin Team',
    views: 1240,
    url: 'https://va-landing-page-211428915761.us-west1.run.app'
  },
  {
    id: '8',
    title: 'Budget Processing Intelligence',
    description: 'AI-powered analytics for monitoring, analyzing, and optimizing government budget submission and approval workflows.',
    categories: [DemoCategory.VISUAL_ANALYTICS, DemoCategory.VISUAL_INVESTIGATOR, DemoCategory.GENERATIVE_AI, DemoCategory.OCR],
    imageUrl: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&q=80&w=800', // Finance/Accounting
    tags: ['Budgeting', 'Finance', 'ProcessOptimization'],
    author: 'Raed Aldweik',
    views: 450,
    url: 'https://raedaldweik.github.io/Budget_Processing'
  },
  {
    id: '5',
    title: 'AI Model Governance Assistant',
    description: 'A GenAI assistant that validates model documentation, checks regulatory compliance, and highlights governance risks and gaps.',
    categories: [DemoCategory.GENERATIVE_AI],
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800', // Document/Verification
    tags: ['ModelGovernance', 'ResponsibleAI', 'Compliance', 'MLAudit'],
    author: 'SAS Governance',
    views: 740,
    url: 'https://sas-ai-model-governance-assistant-211428915761.us-west1.run.app/'
  },
  {
    id: '9',
    title: 'Sports Analytics',
    description: 'Interactive analytics dashboards providing insights into sports event performance, revenue, attendance, and participation trends.',
    categories: [DemoCategory.VISUAL_ANALYTICS],
    imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=800', // Sports/Running/Analytics
    tags: ['Sports', 'PerformanceAnalytics', 'DataViz'],
    author: 'Raed Aldweik',
    views: 620,
    url: 'https://raedaldweik.github.io/ADSC/'
  }
];