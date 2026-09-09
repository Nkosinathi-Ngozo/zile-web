export type ExperienceItem = {
  period: string;
  role: string;
  org: string;
  detail: string;
};

export type GalleryItem = {
  image: string;
  caption?: string;
  featured?: boolean;
};

export type PosterItem = {
  image: string;
  title?: string;
  date?: string;
  caption?: string;
};

export type PricingTier = {
  name: string;
  price: string;
  period?: string;
  features: string[];
  highlighted?: boolean;
};

export type SkillItem = {
  label: string;
  years: string;
};

export type SiteContent = {
  brand: string;
  navPortfolio: string;
  navPosters: string;
  navPricing: string;
  navAbout: string;
  navAdmin: string;
  heroLineOne: string;
  heroLineTwo: string;
  heroTagline: string;
  manifestoHeading: string;
  manifestoAccent: string;
  manifestoBody: string;
  workHeading: string;
  portfolioHeading: string;
  gallery: GalleryItem[];
  postersHeading: string;
  posters: PosterItem[];
  pricingHeading: string;
  pricingSubheading?: string;
  pricingTiers: PricingTier[];
  experience: ExperienceItem[];
  skillsCoreLabel: string;
  skillsSoftLabel: string;
  skillsCore: SkillItem[];
  skillsSoft: SkillItem[];
  educationHeading: string;
  education: { school: string; degree: string; years: string }[];
  contactHeading: string;
  email: string;
  instagram: string;
  linkedin: string;
  // Theme
  colorBackground: string;
  colorForeground: string;
  colorAccent: string;
  fontDisplay: string;
  fontBody: string;
  fontMono: string;
};

export const defaultContent: SiteContent = {
  brand: "Studio / Archive",
  navPortfolio: "Portfolio",
  navPosters: "Posters",
  navPricing: "Pricing",
  navAbout: "About",
  navAdmin: "Admin",
  heroLineOne: "Super",
  heroLineTwo: "Creative",
  heroTagline:
    "Super-creative in the media world of fashion. Visual merchandising. Brand storytelling. Editorial direction. Makeup artistry.",
  manifestoHeading: "Translating editorial into",
  manifestoAccent: "brand",
  manifestoBody:
    "I connect the world through powerful, brand-focused storytelling — translating editorial aesthetics and global cultural fluency into cohesive brand strategies. High-level taste from fashion media, forward-thinking technical fluency.",
  workHeading: "Featured Work",
  portfolioHeading: "Makeup Portfolio",
  gallery: [
    {
      image: "",
      caption: "Bridal — Soft Glam",
      featured: true,
    },
    {
      image: "",
      caption: "Editorial — SA Fashion Week",
      featured: true,
    },
    {
      image: "",
      caption: "Backstage — Grooming",
      featured: false,
    },
    {
      image: "",
      caption: "Editorial — Colour Story",
      featured: false,
    },
    {
      image: "",
      caption: "Everyday Glam",
      featured: false,
    },
  ],
  postersHeading: "Posters",
  posters: [
    {
      image: "",
      title: "Nostalgix Pop-Up Launch",
      date: "2025",
      caption: "Window display & event promo poster.",
    },
    {
      image: "",
      title: "SA Fashion Week — Backstage Pass",
      date: "2024",
      caption: "Backstage makeup & grooming credential design.",
    },
  ],
  pricingHeading: "Pricing",
  pricingSubheading: "Packages for every occasion — bridal, editorial and everyday glam.",
  pricingTiers: [
    {
      name: "Bronze",
      price: "R650",
      period: "per session",
      features: [
        "Full face makeup application",
        "Skin prep & priming",
        "False lashes included",
        "Touch-up kit on the day",
      ],
      highlighted: false,
    },
    {
      name: "Silver",
      price: "R1200",
      period: "per session",
      features: [
        "Everything in Bronze",
        "Pre-event consultation & trial",
        "Airbrush foundation",
        "On-location service",
        "1 hour touch-up availability",
      ],
      highlighted: true,
    },
    {
      name: "Gold",
      price: "R2200",
      period: "per event",
      features: [
        "Everything in Silver",
        "Bridal party (up to 3 people)",
        "Full-day on-site artist",
        "Premium/luxury product line",
        "Complimentary touch-up visit",
      ],
      highlighted: false,
    },
  ],
  experience: [
    {
      period: "2026 — PRES",
      role: "Fashion Consultant & Freelance",
      org: "Independent",
      detail:
        "Brand storytelling, editorial-inspired styling, photoshoot direction, and professional makeup across fashion media.",
    },
    {
      period: "2025",
      role: "Visual Merchandiser & Window Stylist",
      org: "Nostalgix Pop-Up",
      detail:
        "Visual merchandising strategy, mannequin styling, moodboard prototyping and final implementation.",
    },
    {
      period: "2024",
      role: "Makeup Assistant",
      org: "South African Fashion Week",
      detail:
        "Female makeup application and male grooming. Backstage prep, touch-ups and body glow through both Spring and Autumn collections.",
    },
  ],
  skillsCoreLabel: "Creative Stack",
  skillsSoftLabel: "Technical Stack",
  skillsCore: [
    { label: "Window Display & VM", years: "3 yrs" },
    { label: "Omnichannel Brand Activation", years: "3 yrs" },
    { label: "Editorial Styling", years: "3 yrs" },
    { label: "Fashion Photography", years: "3 yrs" },
    { label: "Trend Analysis", years: "3 yrs" },
    { label: "Professional Makeup", years: "4 yrs" },
  ],
  skillsSoft: [
    { label: "CDP Consumer Insights", years: "3 yrs" },
    { label: "Digital Marketing", years: "3 yrs" },
    { label: "Adobe PS / LR / AI", years: "4 yrs" },
    { label: "Canva & AI Tools", years: "3 yrs" },
    { label: "MS Office Suite", years: "5+ yrs" },
  ],
  educationHeading: "Education",
  education: [
    {
      school: "Stadio School of Fashion (formerly LISOF)",
      degree: "BA Degree in Fashion Media — NQF7",
      years: "2021 — 2025",
    },
    {
      school: "Crawford College, Sandton",
      degree: "Bachelor's Degree, Matric",
      years: "2016 — 2020",
    },
  ],
  contactHeading: "Connect",
  email: "hello@yourstudio.com",
  instagram: "https://instagram.com/",
  linkedin: "https://linkedin.com/",
  colorBackground: "#f7f5f0",
  colorForeground: "#0a0a0a",
  colorAccent: "#ff2d16",
  fontDisplay: "Anton",
  fontBody: "Inter",
  fontMono: "JetBrains Mono",
};

const STORAGE_KEY = "site-content";

/** Reads the locally-saved draft (if any), merged over the defaults. UI-only — nothing is sent to a server. */
export function loadSiteContent(): SiteContent {
  if (typeof window === "undefined") return defaultContent;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultContent;
    const stored = JSON.parse(raw) as Partial<SiteContent>;
    return { ...defaultContent, ...stored };
  } catch {
    return defaultContent;
  }
}

/** Persists a draft to localStorage only — this is a UI-only editor with no backend. */
export function saveSiteContent(content: SiteContent) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
}
