import magicCityImg from '../assets/images/case_magic_city_1793799527011.jpg';
import customSneakersImg from '../assets/images/case_custom_sneakers_1793799527834.jpg';
import energySolutionsImg from '../assets/images/case_energy_solutions_1793799528764.jpg';

export interface CaseStudy {
  id: string;
  title: string;
  category: string;
  location: string;
  image: string;
  alt: string;
  metric: string;
  metricLabel: string;
  summary: string;
  deliverables: string[];
  challenge: string;
  solution: string;
  results: { label: string; value: string }[];
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  badge?: string;
  features: string[];
  colSpan?: string;
  iconType: 'code' | 'cart' | 'terminal' | 'search' | 'bot' | 'target' | 'share' | 'chart';
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  platform?: string;
  rating: number;
  avatarColor: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  duration: string;
  description: string;
  deliverables: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const AGENCY_INFO = {
  name: "Error Sync",
  tagline: "Web Design, Development and Digital Growth Agency",
  headline: "Websites, software and marketing built to grow your business",
  subheadline:
    "Error Sync designs and develops websites, Shopify stores and custom software, then drives qualified traffic to them through SEO, AI-assisted search optimisation, Google Ads and Meta Ads. We work with businesses in the USA, UK, Australia and Canada, and every engagement starts with your goals, not a package.",
  contact: {
    email: "contact@errorsync.com",
    phones: [
      { display: "+880 1852 170810", raw: "+8801852170810", label: "BD WhatsApp / Call" },
      { display: "+1 (332) 281-2151", raw: "+13322812151", label: "US Direct Line" }
    ],
    hours: "Open 7 days a week",
    locations: [
      {
        country: "Bangladesh HQ",
        address: "3rd Floor, Error Sync HQ, Chawkbazar-4202, Chittagong, Bangladesh"
      },
      {
        country: "USA Office",
        address: "691 Irolo St, Los Angeles, CA 90005, USA"
      }
    ],
    socials: {
      facebook: "https://facebook.com",
      linkedin: "https://linkedin.com",
      youtube: "https://youtube.com",
      whatsapp: "https://wa.me/8801852170810"
    }
  },
  stats: [
    { value: 6, suffix: "+", label: "Years building & growing online brands" },
    { value: 5.0, suffix: "★", label: "Fiverr rating from 110+ reviews", isRating: true },
    { value: 13, suffix: "", label: "Specialists in our core team" },
    { value: 5, suffix: "+", label: "Continents & countries served" }
  ]
};

export const CLIENT_LOGOS = [
  { name: "EnergySolutions", sector: "Renewable Energy UK" },
  { name: "CUSTOM SNEAKERS", sector: "Swiss Luxury Footwear" },
  { name: "MUSE", sector: "Design Studio" },
  { name: "REAROMA", sector: "Fragrance & Lifestyle" },
  { name: "HAPPY PAUL", sector: "Wellness DTC" },
  { name: "MASTERARY CLASSES", sector: "EdTech Platform" },
  { name: "Ice Feiba", sector: "Apparel Retail" },
  { name: "SANDA BEAUTY", sector: "Organic Skincare" },
  { name: "Saads", sector: "Consumer Goods" },
  { name: "TERRESTRIAL BROADCAST INC.", sector: "Media & Telecom" }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "magic-city",
    title: "Magic City",
    category: "Shopify & Meta Ads",
    location: "Tunisia",
    image: magicCityImg,
    alt: "Magic City dark luxury e-commerce store mockup",
    metric: "60-70",
    metricLabel: "From 6 orders a day to 60–70 at peak",
    summary:
      "Engineered an ultra-fast custom Shopify storefront for an artisanal organic wellness brand and deployed precision Meta Ads funnel targeting high-AOV customers.",
    deliverables: ["Custom Shopify Theme", "Meta Catalog & Dynamic Ads", "Conversion Rate Optimization", "Automated Klaviyo Flows"],
    challenge:
      "Magic City was plateauing at under 10 orders per day due to high bounce rates on mobile and fragmented ad creative testing with no attribution clarity.",
    solution:
      "We rebuilt the store on custom Liquid code with sub-1s load times, refined checkout micro-copy, and implemented high-intent lifestyle video creatives for Instagram & Facebook with tiered retargeting.",
    results: [
      { label: "Daily Peak Volume", value: "70 Orders/day" },
      { label: "Conversion Rate", value: "+340%" },
      { label: "Return on Ad Spend (ROAS)", value: "4.8x" }
    ]
  },
  {
    id: "custom-sneakers",
    title: "Custom Sneakers",
    category: "Shopify & Meta Ads",
    location: "Switzerland",
    image: customSneakersImg,
    alt: "Custom Sneakers high-end streetwear store mockup",
    metric: "16-26",
    metricLabel: "8 to 12 orders a day, 16 to 26 at peak",
    summary:
      "Redesigned an exclusive Swiss custom footwear brand with interactive 3D product previews and localized European multi-currency purchasing.",
    deliverables: ["3D Product Configurator", "Multi-Currency Checkout", "TikTok & Meta Funnels", "Technical SEO"],
    challenge:
      "The client's previous site couldn't showcase hand-crafted custom sneaker details, resulting in customer hesitation and abandoned carts.",
    solution:
      "Designed an immersive dark aesthetic showcase with rapid zoom, custom personalization builder, and localized checkout in CHF & EUR.",
    results: [
      { label: "First Month Sales", value: "+40%" },
      { label: "Peak Daily Orders", value: "26 Orders" },
      { label: "Average Order Value", value: "+$85" }
    ]
  },
  {
    id: "energy-solutions",
    title: "Energy Solutions",
    category: "Website, SEO, Google Ads & ERP",
    location: "United Kingdom",
    image: energySolutionsImg,
    alt: "Energy Solutions enterprise B2B clean tech portal",
    metric: "2x",
    metricLabel: "Monthly leads doubled, no missed renewals",
    summary:
      "Full digital infrastructure overhaul: enterprise web portal, SEO, high-intent Google Ads, ERP sync, and automated client renewal management system.",
    deliverables: ["Enterprise Web App", "Google Search Ads", "B2B ERP Integration", "Automated Renewal Pipeline"],
    challenge:
      "High-value commercial utility renewals were slipping through manual spreadsheets while competitor bids were winning search real estate.",
    solution:
      "Built a custom client portal integrated with internal ERP workflows, paired with precise B2B commercial energy keyword campaigns and automated SMS/email renewal triggers.",
    results: [
      { label: "Inbound Pipeline", value: "200% Increase" },
      { label: "Contract Renewal Rate", value: "99.4%" },
      { label: "Cost Per Acquisition", value: "-46%" }
    ]
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: "web-dev",
    title: "Web Design and Development",
    shortDesc:
      "Fast, accessible websites designed to turn visitors into enquiries, built on WordPress, Shopify or custom code. Includes Shopify store design and development for e-commerce brands.",
    features: ["Sub-second page speeds", "Custom responsive UI", "Clean semantic code", "Conversion architecture"],
    iconType: "code",
    colSpan: "col-span-1 md:col-span-2 lg:col-span-2"
  },
  {
    id: "shopify-store",
    title: "Shopify Store Design and Development",
    shortDesc:
      "Shopify stores designed to sell: custom builds, theme development, migrations and checkout improvements, with sales tracking set up from day one.",
    features: ["Custom Liquid / 2.0 themes", "Checkout customization", "App integration & speed", "Multi-currency & localization"],
    iconType: "cart",
    colSpan: "col-span-1 md:col-span-1 lg:col-span-1"
  },
  {
    id: "custom-software",
    title: "Custom Software Solutions",
    shortDesc:
      "Web applications, business systems, client portals and integrations built around how your business actually works.",
    features: ["Bespoke SaaS & Web Apps", "Client & partner portals", "Internal ERP / CRM tooling", "Robust REST/GraphQL APIs"],
    iconType: "terminal",
    colSpan: "col-span-1 md:col-span-1 lg:col-span-1"
  },
  {
    id: "seo-aeo-geo",
    title: "SEO, AEO and GEO",
    shortDesc:
      "Be found on Google, in answer boxes and in AI assistants like ChatGPT and Gemini, with technical SEO, useful content and clear entity signals.",
    features: ["Entity-based Knowledge Graph", "Perplexity & Gemini optimization", "Technical Core Web Vitals", "Semantic schema markup"],
    iconType: "search",
    colSpan: "col-span-1 md:col-span-2 lg:col-span-2"
  },
  {
    id: "agentic-seo",
    title: "Agentic SEO",
    shortDesc:
      "AI agents handle SEO research, monitoring and analysis at scale. Our strategists set direction, review every output and decide what ships.",
    features: ["Automated competitor tracking", "Real-time query drift alerts", "Autonomous content auditing", "Senior human editorial review"],
    iconType: "bot",
    colSpan: "col-span-1 md:col-span-1 lg:col-span-1"
  },
  {
    id: "ppc-ads",
    title: "PPC Advertising",
    shortDesc:
      "Google Ads campaigns built around qualified leads and cost per acquisition, with conversion tracking set up properly from day one.",
    features: ["High-intent search campaigns", "Performance Max governance", "Negative keyword harvesting", "Strict offline conversion tracking"],
    iconType: "target",
    colSpan: "col-span-1 md:col-span-1 lg:col-span-1"
  },
  {
    id: "meta-ads",
    title: "Meta Ads",
    shortDesc:
      "Facebook and Instagram campaigns for leads, sales and remarketing, driven by structured creative and audience testing.",
    features: ["Dynamic Creative Testing (DCT)", "Full-funnel remarketing", "CBO scaling protocols", "Custom audience lookalikes"],
    iconType: "share",
    colSpan: "col-span-1 md:col-span-1 lg:col-span-1"
  },
  {
    id: "cro-growth",
    title: "Conversion Rate Optimization (CRO)",
    shortDesc:
      "Turn existing visitors into paying customers. Data-backed heatmap analysis, A/B test experiments, checkout friction reduction and UX audits.",
    features: ["Quantitative funnel audits", "A/B test deployment", "Checkout speed optimization", "Post-purchase upsell paths"],
    iconType: "chart",
    colSpan: "col-span-1 md:col-span-1 lg:col-span-1"
  }
];

export const WHY_US_POINTS = [
  {
    number: "01",
    title: "Build and grow under one roof",
    description:
      "The team that builds your website, store or software also runs your search and ads, so tracking, speed and landing pages are never someone else's problem."
  },
  {
    number: "02",
    title: "AI where it helps, people where it matters",
    description:
      "We use AI agents to research and monitor faster. Strategy, creative judgement and quality control stay with experienced specialists."
  },
  {
    number: "03",
    title: "Transparent from the first call",
    description:
      "You get a written proposal with scope, deliverables and timelines before any work starts, and reporting that shows what changed and why."
  },
  {
    number: "04",
    title: "Focused on business outcomes",
    description:
      "We report on enquiries, sales and cost per lead, not vanity metrics."
  },
  {
    number: "05",
    title: "Direct access to senior specialists",
    description:
      "No account executive telephone games. You communicate directly with the engineers, designers, and media buyers doing the actual work."
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    quote:
      "Error Sync redesigned our eCommerce store and sales jumped by 40% in the first month. They understood our brand perfectly and brought our vision to life.",
    author: "Mr. Josef",
    role: "CEO & Founder",
    company: "Custom Sneakers",
    rating: 5,
    avatarColor: "from-purple-600 to-indigo-600"
  },
  {
    id: "2",
    quote:
      "The team at Error Sync built our website from scratch and delivered it ahead of schedule. Our organic traffic has grown 60% in 3 months. Absolutely outstanding work.",
    author: "Aziz Mlleli",
    role: "CEO",
    company: "Magic City",
    rating: 5,
    avatarColor: "from-pink-600 to-purple-600"
  },
  {
    id: "3",
    quote:
      "Jawad is extremely professional, organized, and a pleasure to work with. He has an amazing team and offers a complete range of additional services if you need extra support. He is highly responsive, attentive to his clients, and always willing to help throughout the process.",
    author: "manuelareyesart",
    role: "Creative Director",
    company: "United States · via Fiverr",
    platform: "Fiverr Top Client",
    rating: 5,
    avatarColor: "from-violet-600 to-fuchsia-600"
  },
  {
    id: "4",
    quote:
      "I always get exceptional service. I will definitely return for more services. Thank you.",
    author: "pojulayiwola",
    role: "Client",
    company: "United States · via Fiverr",
    platform: "Fiverr Repeat Client",
    rating: 5,
    avatarColor: "from-indigo-600 to-purple-700"
  },
  {
    id: "5",
    quote:
      "From SEO to social media, Error Sync handles everything for us. Our monthly leads have doubled since we partnered with them. Highly recommend to any business.",
    author: "Abdullah Shoaib",
    role: "CEO",
    company: "Energy Solutions",
    rating: 5,
    avatarColor: "from-purple-500 to-pink-500"
  }
];

export const HOW_WE_WORK: ProcessStep[] = [
  {
    number: "01",
    title: "Discovery",
    duration: "Days 1–3",
    description:
      "We learn your business, goals and current setup in a short call, and review your website, ads and data.",
    deliverables: ["Initial technical audit", "Commercial goal mapping", "Competitor & tech stack review"]
  },
  {
    number: "02",
    title: "Strategy & Proposal",
    duration: "Days 4–7",
    description:
      "You get a clear plan with scope, timeline and a tailored quote. No fixed packages, no surprises.",
    deliverables: ["Custom roadmap & architecture", "Itemized milestones & deadlines", "Guaranteed scope definition"]
  },
  {
    number: "03",
    title: "Build & Launch",
    duration: "Weeks 2–5",
    description:
      "Our team designs, develops and sets up tracking, with regular updates and your approval at each stage.",
    deliverables: ["Figma prototypes & interactive builds", "Full analytics & pixel wiring", "Staged QA & launch sign-off"]
  },
  {
    number: "04",
    title: "Measure & Optimise",
    duration: "Ongoing",
    description:
      "We track leads, sales and rankings, report in plain language, and keep improving what works.",
    deliverables: ["Weekly transparent attribution reports", "Continuous A/B testing & CRO", "Iterative scaling sprints"]
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: "q1",
    category: "General",
    question: "What does Error Sync do?",
    answer:
      "Error Sync is a digital agency that designs and develops websites, Shopify stores and custom software, and grows them through SEO, AEO and GEO, Google Ads and Meta Ads. Our main team is in Chittagong, Bangladesh, with a team in Los Angeles, and we work with businesses in the USA, UK, Australia and Canada."
  },
  {
    id: "q2",
    category: "Pricing",
    question: "How much do your services cost?",
    answer:
      "Every project is tailored to your exact commercial objectives and technical requirements. Custom Shopify stores and high-converting marketing sites generally range between $2,500 and $12,000 depending on complexity. Bespoke software and SaaS applications range from $6,000+. Ongoing monthly growth retainers (SEO, PPC, and Meta Ads management) start from $1,200/month. We provide a transparent, itemized fixed-price proposal before kickoff."
  },
  {
    id: "q3",
    category: "Timeline",
    question: "How long does a website project take?",
    answer:
      "A standard bespoke e-commerce store or corporate website typically takes 3 to 6 weeks from initial discovery and design wireframes to final QA, tracking setup, and live deployment. Complex web platforms or custom software with third-party ERP integrations take between 6 to 12 weeks with staged weekly demo sprints."
  },
  {
    id: "q4",
    category: "Global",
    question: "Do you work with businesses outside Bangladesh?",
    answer:
      "Yes. Over 85% of our active clients are based in the United States, United Kingdom, Canada, Australia, Switzerland, and the European Union. We operate with dedicated overlap across Eastern Standard Time (EST), Pacific Time (PST), and GMT, utilizing private client Slack channels and structured weekly video syncs."
  },
  {
    id: "q5",
    category: "Transition",
    question: "Can you take over an existing website, store or ad account?",
    answer:
      "Yes, we frequently take over struggling or outdated sites and underperforming ad accounts. We conduct an upfront audit of code health, page load speeds, conversion funnel drop-offs, and ad attribution tracking before rebuilding or scaling your campaigns."
  },
  {
    id: "q6",
    category: "Performance",
    question: "Do you guarantee rankings or ad results?",
    answer:
      "We believe in honest, transparent business. We never make gimmicky guarantees like 'Rank #1 on Google in 48 hours' because search algorithms and advertising auctions are dynamic. What we do guarantee is flawless technical execution, sub-second performance, bulletproof conversion tracking, milestone deadlines, and obsessive weekly optimization based on measurable revenue metrics."
  }
];
