export type EssayTopic =
  | 'All topics'
  | 'Textiles & Exports'
  | 'Markets & Finance'
  | 'Operations & Study';

export interface TimelineEntry {
  period: string;
  summary: string;
}

export interface Essay {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  topic: Exclude<EssayTopic, 'All topics'>;
  readTime: string;
  paragraphs: string[];
}

export type ReadingCategory = 'All' | 'Books' | 'Articles & Reports';

export interface ReadingItem {
  id: string;
  title: string;
  author: string;
  category: Exclude<ReadingCategory, 'All'>;
  mindsetPrinciple: string;
  takeaway: string;
  url?: string;
}

export interface MarketStat {
  figure: string;
  description: string;
}

export interface MindsetPrinciple {
  number: string;
  title: string;
  description: string;
  origin: string;
}

export interface SkillGroup {
  title: string;
  items: string[];
  evidence: string;
}

export const PROFILE = {
  name: 'Ansh Goel',
  location: 'Panipat, Haryana, India',
  headline: 'BBA-DBE Undergraduate, Indian Institute of Management Bangalore (2026–2029)',
  email: 'ansh.goel26@iimb.ac.in',
  phoneDisplay: '+91 99964 38163',
  phoneHref: '+919996438163',
  linkedinUrl: 'https://www.linkedin.com/in/ansh-goel-689051350/',
  linkedinHandle: 'ansh-goel-689051350',
  updatedLabel: 'Updated November 2026',
};

export const TIMELINE_20_SECONDS: TimelineEntry[] = [
  {
    period: 'Childhood–2026',
    summary:
      'Grew up in Panipat around my family’s yarn and fibre trading business, learning how raw materials connect to finished textiles.',
  },
  {
    period: 'Class IV–XII',
    summary:
      'Completed schooling at Delhi Public School Panipat Refinery (CBSE: 93.6% in Class X, 87% in Class XII).',
  },
  {
    period: 'Dec 2025',
    summary:
      'Qualified for the Final Round of the SRCC National Economics Olympiad 2025, earning AIR 46 among 2,480 participants (Top 1.9%).',
  },
  {
    period: 'Jun–Jul 2026',
    summary:
      'Worked 45 days as a Business Operations Intern at Jindal Textile Industries Ltd. in Panipat across production schedules and follow-ups.',
  },
  {
    period: '2026–2029',
    summary:
      'Pursuing the online BBA in Digital Business and Entrepreneurship at IIM Bangalore while following Indian financial markets and mutual funds.',
  },
  {
    period: 'What’s ahead',
    summary:
      'Preparing to build a textile manufacturing and export business starting with rugs, carpets, and home furnishings.',
  },
];

export const ABOUT_PARAGRAPHS = [
  'I grew up in Panipat around my family’s yarn and fibre trading business. Being around that trade got me interested early in textiles, in manufacturing, and in how a business connects raw materials to finished products. I’m now doing the online BBA in Digital Business and Entrepreneurship at IIM Bangalore, where the first year covers marketing, entrepreneurship, finance, statistics, and business communication.',
  'Outside class I follow Indian financial markets and mutual funds, and I’m interested in how sourcing, production, and trade fit together in manufacturing businesses. Longer term, I want to build a business in textile manufacturing and exports, starting with rugs, carpets, and home furnishings.',
];

export const EXPERIENCE = {
  role: 'Business Operations Intern',
  company: 'Jindal Textile Industries Ltd.',
  dates: '15 June 2026 – 30 July 2026',
  facts: [
    { label: 'Duration', value: '45 days' },
    { label: 'Location', value: 'Panipat, Haryana' },
    { label: 'Format', value: 'Hybrid internship' },
    { label: 'Sector', value: 'Textile manufacturing' },
  ],
  bullets: [
    'Helped with day-to-day operational tasks at a textile manufacturing company.',
    'Followed up with team members on ongoing tasks and internal process steps.',
    'Saw how production schedules, raw material supply, and administrative work connect in a textile business.',
  ],
  takeaway:
    'Production, raw material supply, and administration all depend on each other, so follow-up matters as much as the work itself.',
};

export const BEYOND_CLASS = [
  {
    title: 'Textile industry exposure',
    intro:
      'My family trades yarn and fibre in Panipat. I’ve picked up how the trade works by watching it and talking about it at home.',
    points: [
      'Yarn and fibre types, and where each is used.',
      'Raw material sourcing and what buyers require.',
      'How trading connects to weaving, tufting, finishing, and finished textile products.',
    ],
  },
  {
    title: 'Markets and mutual funds',
    intro: 'Out of personal interest, I follow Indian financial markets and mutual funds.',
    points: [
      'Assist in reviewing and tracking my family’s mutual fund holdings and asset allocation.',
      'Compare mutual fund schemes and research funds on an informal basis.',
    ],
  },
];

export const ESSAY_TOPICS: EssayTopic[] = [
  'All topics',
  'Textiles & Exports',
  'Markets & Finance',
  'Operations & Study',
];

export const ESSAYS: Essay[] = [
  {
    id: 'beyond-one-export-market',
    title: 'Don’t lean on one export market.',
    subtitle:
      'What Panipat’s home textile numbers—and the July 2026 India–UK duty cut—tell us about concentration risk.',
    date: 'November 2026',
    topic: 'Textiles & Exports',
    readTime: '4 min read',
    paragraphs: [
      'Panipat has over 2,000 registered textile units, mostly small and medium enterprises. For decades the cluster has turned yarn and fibre into bathmats, rugs, carpets, and home furnishings sold across the world. When a whole city knows how to weave, tuft, and finish, manufacturing capability is rarely the bottleneck.',
      'Demand concentration is. Around 60% of India’s home textile exports go to a single market: the United States. And roughly 30% of India’s home textile exports by value are carpets and rugs. When one buyer geography dominates order books, tariffs, freight spikes, or a retail slowdown in that single country ripple straight back to factory looms in Haryana.',
      'Since 15 July 2026, UK import duties on Indian textiles dropped to 0%—down from up to 12%. That changes unit economics on day one for exporters willing to learn UK specifications, packaging standards, and compliance early. Rather than treating Europe, the UK, and the Middle East as secondary overflow when US orders dip, any new manufacturing export operation should build for two or three markets from the start.',
    ],
  },
  {
    id: 'follow-up-matters-as-much',
    title: 'Follow-up matters as much as the work itself.',
    subtitle:
      'Lessons from 45 days inside textile operations at Jindal Textile Industries Ltd.',
    date: 'September 2026',
    topic: 'Operations & Study',
    readTime: '3 min read',
    paragraphs: [
      'Before spending 45 days as a Business Operations Intern at Jindal Textile Industries Ltd. in Panipat, it was easy to think of a factory in neat silos: procurement buys raw material, the floor manufactures it, and administration handles paperwork.',
      'In practice, none of those steps moves cleanly on its own. A missed update between yarn arrival, a production schedule adjustment, and an administrative sign-off stalls the next team downstream. Much of my day-to-day work involved helping with operational tasks and following up with team members on ongoing steps.',
      'That experience changed how I view management. Strategy sets the direction, and costing decides whether an order makes sense—but consistent follow-up is what keeps production schedules, raw material supply, and administration moving together.',
    ],
  },
  {
    id: 'letting-the-numbers-decide',
    title: 'Let the numbers decide, not the headlines.',
    subtitle:
      'How reviewing family mutual fund portfolios shapes the way I approach order costing and margins.',
    date: 'August 2026',
    topic: 'Markets & Finance',
    readTime: '3 min read',
    paragraphs: [
      'When you spend time tracking Indian financial markets and comparing mutual fund schemes, you quickly notice how noisy the headlines are. A fund’s marketing summary rarely tells you what is happening under the hood with expense ratios, downside capture, or actual asset allocation.',
      'Assisting with reviewing and tracking my family’s mutual fund holdings taught me a simple discipline: put the figures side by side in a spreadsheet before forming an opinion. Studying Financial Statements and Business Performance and Business Statistics at IIM Bangalore reinforced the same habit.',
      'That mindset carries straight into manufacturing and export trade. Before quoting a rug or carpet order, every input—raw yarn, dyeing, tufting, finishing, inland logistics, freight, and working-capital cycle—needs to be modeled accurately so you know what each product line really earns.',
    ],
  },
  {
    id: 'follow-the-whole-chain',
    title: 'Start from the buyer, trace back to the yarn.',
    subtitle:
      'Why growing up around Panipat’s yarn and fibre trade starts at one end of the chain—and ends at the other.',
    date: 'June 2026',
    topic: 'Textiles & Exports',
    readTime: '4 min read',
    paragraphs: [
      'Growing up around my family’s yarn and fibre trading business in Panipat gave me a ground-floor education in textile inputs: different yarn and fibre types, where each performs best, and how slight changes in raw material quality show up later during weaving, tufting, and finishing.',
      'A problem on a finished rug usually started one step earlier in the chain. Tracing a cost variance or quality delay back to raw material sourcing is second nature once you have seen yarn trade up close.',
      'At the same time, a product that is easy to manufacture on the factory floor does not get reordered unless it fits what the buyer actually asked for—material feel, dimensions, landed price, and delivery window. Connecting Panipat’s raw material depth directly to end-buyer specs is the bridge I am studying next.',
    ],
  },
];

export const EDUCATION = {
  university: {
    institution: 'Indian Institute of Management Bangalore',
    degree:
      'Bachelor of Business Administration in Digital Business and Entrepreneurship (BBA-DBE) · Online programme',
    dates: '2026–2029',
    courseworkLabel: 'Selected Coursework · Year I Foundations',
    coursework: [
      'Marketing Fundamentals',
      'Explorations in Entrepreneurship',
      'Financial Statements and Business Performance',
      'Foundations of Business Communication',
      'Business Statistics for Entrepreneurs',
      'Website Development',
    ],
  },
  school: {
    institution: 'Delhi Public School Panipat Refinery',
    dates: 'Class IV–XII',
    scores: 'CBSE · Class X: 93.6% · Class XII: 87%',
  },
  distinction: {
    kicker: 'Academic Distinction',
    title: 'SRCC National Economics Olympiad 2025',
    qualifier: 'Final Round Qualifier',
    certificate: 'Certificate of Merit · December 2025',
    rank: 'AIR 46',
    rankDetail: 'among 2,480 participants · Top 1.9% of the field',
  },
};

export const WHATS_AHEAD = {
  thesis:
    'I want to build a textile manufacturing and export business, starting with rugs, carpets, and home textiles.',
  focusAreas: ['Textile Manufacturing', 'Home Furnishings', 'International Trade'],
  marketHeading: 'The market I’m looking at',
  marketStats: [
    {
      figure: '2,000+',
      description: 'registered textile units in Panipat, mostly small and medium enterprises',
    },
    {
      figure: '~30%',
      description: 'of India’s home textile exports are carpets and rugs, by value',
    },
    {
      figure: '~60%',
      description: 'of India’s home textile exports go to one market, the US',
    },
    {
      figure: '0%',
      description: 'UK duty on Indian textiles since 15 July 2026, down from up to 12%',
    },
  ] as MarketStat[],
  marketSummary:
    'Panipat is a recognised Town of Export Excellence, and its units already sell rugs, carpets, and other home textiles to buyers in Europe, the US, and the Middle East. Demand is concentrated in one market, so I want to understand how finished home furnishings are sourced, costed, and sold across several, not just how they are made.',
  sources: [
    {
      label: 'CRISIL Ratings (US share)',
      url: 'https://coalitiongreenwich.crisil.com/content/crisilratings/en/home/our-analysis/reports/2025/08/indias-export-oriented-sectors-diamond-polishing-shrimp-home-textiles-and-carpets-at-the-forefront-to-bear-the-brunt-of-us-tariff.html',
    },
    {
      label: 'CRISIL via The Home Fashion (carpet share)',
      url: 'https://thehomefashion.in/?p=44026',
    },
    {
      label: 'Apparel Resources (Panipat units)',
      url: 'https://apparelresources.com/business-news/sustainability/textile-waste-panipat-answer',
    },
    {
      label: 'PIB (India–UK trade)',
      url: 'https://www.pib.gov.in/PressNoteDetails.aspx?ModuleId=3&NoteId=154945&reg=48&lang=2',
    },
    {
      label: 'FashionUnited (UK agreement)',
      url: 'https://fashionunited.uk/news/business/what-the-india-uk-trade-agreement-means-for-the-fashion-industry/2026071789277',
    },
  ],
  mindsetIntro:
    'I’m early in my career, so this is how I try to think rather than a record of results. Each principle comes from something I’ve seen up close or studied.',
  mindset: [
    {
      number: '01',
      title: 'Follow the whole chain',
      description:
        'Yarn, weaving or tufting, finishing, then the buyer. A problem usually starts a step before it shows up, so I try to trace a product back to its raw material before judging a cost or a delay.',
      origin: 'From: family yarn trade, operations internship',
    },
    {
      number: '02',
      title: 'Start from the buyer',
      description:
        'A product that is easy to make but doesn’t match what a buyer needs doesn’t get reordered. I like to begin with what buyers ask for—material, size, price, and delivery—and work back to the factory floor.',
      origin: 'From: buyer requirements, home furnishings focus',
    },
    {
      number: '03',
      title: 'Don’t lean on one market',
      description:
        'About 60% of India’s home textile exports go to the US. I’d rather build for two or three markets from the start, and the UK has been open to Indian textiles duty-free since July 2026.',
      origin: 'From: market concentration & tariff analysis',
    },
    {
      number: '04',
      title: 'Let the numbers decide',
      description:
        'I compare mutual fund schemes by looking at the figures rather than the headlines. I want to run a business the same way: cost each order properly before quoting it, and know what each product line really earns.',
      origin: 'From: mutual fund research, finance & statistics coursework',
    },
  ] as MindsetPrinciple[],
  learningNext: [
    'How an export order works, from documentation and shipping terms to getting paid.',
    'How to cost a rug or carpet, from raw material to freight.',
    'What buyers in the US and UK look for in home furnishings.',
    'Using Excel to model margins and working-capital needs.',
  ],
};

export const SKILLS: SkillGroup[] = [
  {
    title: 'Tools and communication',
    items: [
      'MS Excel',
      'Spreadsheets and basic record-keeping',
      'Written and verbal communication',
      'Website development fundamentals (coursework)',
    ],
    evidence:
      'Coursework: Business Statistics for Entrepreneurs, Foundations of Business Communication, Website Development.',
  },
  {
    title: 'Business and textile context',
    items: [
      'Yarn and fibre trade familiarity',
      'Basic supply chain understanding',
      'Task tracking and workflow follow-up',
    ],
    evidence:
      'Seen first-hand: family yarn and fibre trade; operations internship at Jindal Textile Industries Ltd.',
  },
  {
    title: 'Finance and analysis',
    items: [
      'Mutual fund research and comparison',
      'Personal investment tracking',
      'Financial market awareness',
    ],
    evidence:
      'Coursework: Financial Statements and Business Performance; ongoing personal mutual fund research.',
  },
];

export const CONTACT_TOPICS = [
  'Internship opportunity',
  'Sourcing & textile operations',
  'Exports & home furnishings trade',
  'Finance & mutual fund research',
  'Reply to my writing',
  'General conversation',
];

export const READING_CATEGORIES: ReadingCategory[] = [
  'All',
  'Books',
  'Articles & Reports',
];

export const READING_LIST: ReadingItem[] = [
  {
    id: 'the-goal-goldratt',
    title: 'The Goal: A Process of Ongoing Improvement',
    author: 'Eliyahu M. Goldratt & Jeff Cox',
    category: 'Books',
    mindsetPrinciple: 'Follow the whole chain',
    takeaway:
      'Showed me how factory throughput depends on bottlenecks across the entire production chain rather than local efficiency at one machine.',
  },
  {
    id: 'little-book-common-sense-investing',
    title: 'The Little Book of Common Sense Investing',
    author: 'John C. Bogle',
    category: 'Books',
    mindsetPrinciple: 'Let the numbers decide',
    takeaway:
      'Reinforced my habit of comparing mutual funds by expense ratios, asset allocation, and long-term data instead of market headlines.',
  },
  {
    id: 'crisil-home-textiles-report',
    title: 'India’s Export-Oriented Sectors: Home Textiles and Carpets',
    author: 'CRISIL Ratings',
    category: 'Articles & Reports',
    mindsetPrinciple: 'Don’t lean on one market',
    takeaway:
      'Documented that ~60% of India’s home textile exports go to the US, highlighting why a new manufacturing unit should build across two or three buyer markets early.',
    url: 'https://coalitiongreenwich.crisil.com/content/crisilratings/en/home/our-analysis/reports/2025/08/indias-export-oriented-sectors-diamond-polishing-shrimp-home-textiles-and-carpets-at-the-forefront-to-bear-the-brunt-of-us-tariff.html',
  },
  {
    id: 'psychology-of-money',
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    category: 'Books',
    mindsetPrinciple: 'Let the numbers decide',
    takeaway:
      'Clarified the difference between chasing short-term returns and building resilient personal portfolios and working-capital reserves that survive downturns.',
  },
  {
    id: 'india-uk-trade-brief',
    title: 'India–UK Trade Agreement & Zero-Duty Indian Textiles Brief',
    author: 'Press Information Bureau (PIB) & FashionUnited',
    category: 'Articles & Reports',
    mindsetPrinciple: 'Start from the buyer',
    takeaway:
      'Explained the July 2026 drop to 0% UK import duty on Indian textiles (down from up to 12%) and what it opens up for Panipat carpets and home furnishings.',
    url: 'https://www.pib.gov.in/PressNoteDetails.aspx?ModuleId=3&NoteId=154945&reg=48&lang=2',
  },
  {
    id: 'high-output-management',
    title: 'High Output Management',
    author: 'Andrew S. Grove',
    category: 'Books',
    mindsetPrinciple: 'Follow the whole chain',
    takeaway:
      'Put language around what I saw at Jindal Textile Industries Ltd.: limiting steps, leading indicators, and consistent team follow-up hold daily operations together.',
  },
];

