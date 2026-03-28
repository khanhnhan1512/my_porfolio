export const siteConfig = {
  name: 'Nhan Nguyen',
  title: 'Data Engineer & AI Engineer',
  description:
    'Portfolio of Nhan Nguyen — Data Engineer & AI Engineer building scalable data pipelines and intelligent AI systems.',
  url: 'https://your-domain.vercel.app',
}

export const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
] as const

export const email = 'khanhnhan012@gmail.com'

export const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/khanhnhan1512', icon: 'github' },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/nhan-nguyen-b22023260/',
    icon: 'linkedin',
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/nguyen.khanh.nhan.905779',
    icon: 'facebook',
  },
] as const

// About
export const aboutData = {
  bio: [
    "I'm Nhan Nguyen, a Data Engineer & AI Engineer passionate about building robust data infrastructure and intelligent systems. I design scalable pipelines, architect data platforms, and deploy AI solutions that drive real-world impact.",
    'My work spans data engineering (ETL/ELT, streaming, warehousing), machine learning engineering, LLM applications, and end-to-end AI product development. I love turning messy data into clean, reliable systems that power smart decisions.',
  ],
  stats: [
    { value: '3+', label: 'Years Experience' },
    { value: '15+', label: 'Projects Completed' },
    { value: '5', label: 'Publications' },
    { value: '10+', label: 'Technologies' },
  ],
}

// Skills
export type SkillCategory =
  | 'Languages'
  | 'Frameworks'
  | 'Tools'
  | 'Visualization'

export interface Skill {
  name: string
  category: SkillCategory
}

export const skills: Skill[] = [
  { name: 'Python', category: 'Languages' },
  { name: 'R', category: 'Languages' },
  { name: 'SQL', category: 'Languages' },
  { name: 'JavaScript', category: 'Languages' },
  { name: 'TypeScript', category: 'Languages' },
  { name: 'TensorFlow', category: 'Frameworks' },
  { name: 'PyTorch', category: 'Frameworks' },
  { name: 'scikit-learn', category: 'Frameworks' },
  { name: 'Pandas', category: 'Frameworks' },
  { name: 'NumPy', category: 'Frameworks' },
  { name: 'Keras', category: 'Frameworks' },
  { name: 'Docker', category: 'Tools' },
  { name: 'Git', category: 'Tools' },
  { name: 'Jupyter', category: 'Tools' },
  { name: 'AWS', category: 'Tools' },
  { name: 'Linux', category: 'Tools' },
  { name: 'Plotly', category: 'Visualization' },
  { name: 'D3.js', category: 'Visualization' },
  { name: 'Matplotlib', category: 'Visualization' },
  { name: 'Tableau', category: 'Visualization' },
]

export const skillCategoryColors: Record<SkillCategory, string> = {
  Languages: '#38bdf8',
  Frameworks: '#a78bfa',
  Tools: '#34d399',
  Visualization: '#fb923c',
}

// Projects
export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  category: 'ML' | 'Dashboard' | 'Viz' | 'Other'
  techStack: string[]
  githubUrl?: string
  liveUrl?: string
  metrics?: string
}

export const projects: Project[] = [
  {
    id: 'sentiment-analysis',
    title: 'Sentiment Analysis Engine',
    description:
      'NLP pipeline for real-time sentiment analysis of social media data with 94% accuracy.',
    longDescription:
      'Built a production-ready NLP pipeline using transformer models to classify sentiment in social media posts. Implemented data preprocessing, model fine-tuning, and a REST API for real-time inference.',
    category: 'ML',
    techStack: ['Python', 'PyTorch', 'Hugging Face', 'FastAPI'],
    githubUrl: '#',
    metrics: '94% accuracy',
  },
  {
    id: 'sales-dashboard',
    title: 'Sales Analytics Dashboard',
    description:
      'Interactive dashboard visualizing sales trends, forecasts, and KPIs across regions.',
    longDescription:
      'Designed and built an interactive analytics dashboard that provides real-time insights into sales performance. Features include time-series forecasting, geographic heatmaps, and drill-down capabilities.',
    category: 'Dashboard',
    techStack: ['Python', 'Plotly Dash', 'PostgreSQL', 'Docker'],
    githubUrl: '#',
    liveUrl: '#',
  },
  {
    id: 'image-classifier',
    title: 'Medical Image Classifier',
    description:
      'Deep learning model for classifying medical images with ensemble techniques.',
    longDescription:
      'Developed a CNN-based classifier for medical imaging using transfer learning and ensemble methods. Achieved state-of-the-art results on the target dataset with careful data augmentation and validation strategies.',
    category: 'ML',
    techStack: ['Python', 'TensorFlow', 'Keras', 'OpenCV'],
    githubUrl: '#',
    metrics: '97% AUC-ROC',
  },
  {
    id: 'data-viz-covid',
    title: 'COVID-19 Data Explorer',
    description:
      'Interactive visualization exploring pandemic trends across 200+ countries.',
    longDescription:
      'Created an interactive web application that lets users explore COVID-19 data with animated time-series charts, geographic visualizations, and comparative analysis tools.',
    category: 'Viz',
    techStack: ['D3.js', 'React', 'Node.js', 'REST API'],
    githubUrl: '#',
    liveUrl: '#',
  },
  {
    id: 'recommendation-engine',
    title: 'Movie Recommendation System',
    description:
      'Collaborative filtering system using matrix factorization on 100K+ ratings.',
    longDescription:
      'Built a recommendation engine using collaborative filtering with matrix factorization. Implemented both user-based and item-based approaches with hybrid ensemble for improved accuracy.',
    category: 'ML',
    techStack: ['Python', 'scikit-learn', 'Surprise', 'Flask'],
    githubUrl: '#',
    metrics: 'RMSE 0.87',
  },
  {
    id: 'stock-predictor',
    title: 'Stock Price Predictor',
    description:
      'LSTM-based model for predicting stock prices with technical indicators.',
    longDescription:
      'Developed a time-series forecasting model using LSTM networks to predict stock price movements. Incorporated technical indicators and sentiment data for improved predictions.',
    category: 'Other',
    techStack: ['Python', 'TensorFlow', 'Pandas', 'yfinance'],
    githubUrl: '#',
    metrics: '72% directional accuracy',
  },
]

export const projectCategories = ['All', 'ML', 'Dashboard', 'Viz', 'Other'] as const

// Timeline
export interface TimelineItem {
  id: string
  type: 'experience' | 'education'
  title: string
  organization: string
  dateRange: string
  description: string
  tags?: string[]
}

export const timeline: TimelineItem[] = [
  {
    id: 'ds-intern-2',
    type: 'experience',
    title: 'Data Science Intern',
    organization: 'Tech Corp',
    dateRange: 'Jun 2025 - Present',
    description:
      'Building ML pipelines for product recommendations. Improved click-through rate by 15% using gradient boosting models.',
    tags: ['Python', 'AWS', 'XGBoost'],
  },
  {
    id: 'ms-ds',
    type: 'education',
    title: 'M.S. Data Science',
    organization: 'University of Technology',
    dateRange: '2024 - 2026',
    description:
      'Specializing in machine learning and statistical modeling. Research focus on NLP and transformer architectures.',
    tags: ['Machine Learning', 'NLP', 'Statistics'],
  },
  {
    id: 'ds-intern-1',
    type: 'experience',
    title: 'Data Analyst Intern',
    organization: 'Analytics Co.',
    dateRange: 'May 2024 - Aug 2024',
    description:
      'Developed automated reporting dashboards reducing manual effort by 40%. Conducted A/B tests for product features.',
    tags: ['SQL', 'Tableau', 'Python'],
  },
  {
    id: 'bs-cs',
    type: 'education',
    title: 'B.S. Computer Science',
    organization: 'State University',
    dateRange: '2020 - 2024',
    description:
      'Minor in Statistics. Graduated with honors. Senior thesis on predictive modeling for climate data.',
    tags: ['Algorithms', 'Statistics', 'Research'],
  },
  {
    id: 'ta-role',
    type: 'experience',
    title: 'Teaching Assistant',
    organization: 'State University',
    dateRange: 'Jan 2023 - May 2024',
    description:
      'TA for Introduction to Machine Learning. Mentored 50+ students, designed lab exercises, graded assignments.',
    tags: ['Teaching', 'Machine Learning', 'Python'],
  },
]
