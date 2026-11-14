export interface MagazinePageData {
  id: number;
  pageNumber: number;
  type: 'cover' | 'intro' | 'toc' | 'artwork' | 'analysis' | 'apparel' | 'commercial' | 'back-cover';
  title?: string;
  subtitle?: string;
  issueText?: string;
  category?: string;
  image?: string;
  secondaryImage?: string;
  analysisText?: string[];
  keyElements?: string[];
  colorPalette?: string[];
  quote?: string;
}

export const PORTFOLIO_MAIN_URL = "/#work";

export const MAGAZINE_PAGES: MagazinePageData[] = [
  {
    id: 1,
    pageNumber: 1,
    type: 'cover',
    title: 'THE CREATIVE EDITION',
    subtitle: 'Visual Stories. Creative Thinking. Art Direction.',
    issueText: 'ISSUE 01 / 2026 • SPECIAL PUBLICATION',
    image: '/images/Gun Barrel Legacy.png',
  },
  {
    id: 2,
    pageNumber: 2,
    type: 'intro',
    title: "Curator's Perspective",
    subtitle: 'A Collection of Visual Expression & Commercial Art',
    analysisText: [
      'Welcome to THE CREATIVE EDITION — a dedicated digital publication showcasing a curated selection of visual art direction, cinematic poster design, commercial advertising campaigns, and graphic apparel concepts.',
      'Every project featured in this edition represents an exploration into hierarchy, contrast, color theory, and emotion. Design is not merely aesthetic ornamentation; it is structured visual communication that commands attention.',
    ],
    quote: '"Design is the silent ambassador of your brand."',
  },
  {
    id: 3,
    pageNumber: 3,
    type: 'toc',
    title: 'Contents & Structure',
    subtitle: 'EXPLORE THE COLLECTION',
  },
  {
    id: 4,
    pageNumber: 4,
    type: 'artwork',
    title: '007: Gun Barrel Legacy',
    category: 'Cinematic Poster Art',
    image: '/images/Gun Barrel Legacy.png',
  },
  {
    id: 5,
    pageNumber: 5,
    type: 'analysis',
    title: '007: Gun Barrel Legacy',
    category: 'Cinematic Art Direction & Analysis',
    analysisText: [
      'The iconic gun barrel motif is rendered with dramatic high-contrast silhouette techniques. Concentric spiral geometry creates immediate visual focus, channeling tension into the central figure.',
      'Crimson accent highlights contrast against deep monochromatic shadows, evoking the classic spy thriller aesthetic while maintaining a sleek, modern poster composition.',
      'Custom typography balances vintage cinematic poster traditions with clean modern layout framing.'
    ],
    keyElements: [
      'High-contrast silhouette lighting',
      'Concentric vector spiral geometry',
      'Crimson & Noir color grading',
      'Editorial poster grid system'
    ],
    colorPalette: ['#0A0A0C', '#8B0000', '#D4AF37', '#E5E5E5']
  },
  {
    id: 6,
    pageNumber: 6,
    type: 'artwork',
    title: 'Swiss Army Knife: Versatile, All-in-One',
    category: 'Commercial Product Advertising',
    image: '/images/Swiss Army Knife_ Versatile, All-in-One.png',
  },
  {
    id: 7,
    pageNumber: 7,
    type: 'analysis',
    title: 'Swiss Army Knife Advertising',
    category: 'Product Advertising & Hierarchy Analysis',
    analysisText: [
      'Designed around the core concept of multi-functional utility and timeless Swiss precision. Studio lighting accents the metallic sheen of open blades and tools.',
      'The headline "Versatile, All-in-One" utilizes clean sans-serif typography with generous line spacing, framing the product as both a precision instrument and an everyday essential.',
      'Negative space is strategically prioritized to give every tool attachment distinct visual presence without cluttering the commercial canvas.'
    ],
    keyElements: [
      'Studio specular lighting highlight',
      'Minimalist Swiss graphic design grid',
      'High-precision product positioning',
      'Focus on multi-tool craftsmanship'
    ],
    colorPalette: ['#121214', '#C41E3A', '#94A3B8', '#F8FAFC']
  },
  {
    id: 8,
    pageNumber: 8,
    type: 'apparel',
    title: 'Streetwear & Graphic Tees',
    subtitle: 'Culture, Contrast & Print Mockups',
    image: '/images/Seedhe Maut Streetwear T-Shirt Mockup.png',
    secondaryImage: '/images/Distressed HAWA Namaste Streetwear Tee.png',
    analysisText: [
      'Fusing hip-hop culture and traditional Indian iconography into streetwear fashion. Featuring distressed print textures, bold typography, and heavy cotton fabric mockups.'
    ],
    keyElements: ['Distressed screenprint effects', 'Oversized silhouette drop-shoulder fit', 'Cultural motif integration']
  },
  {
    id: 9,
    pageNumber: 9,
    type: 'apparel',
    title: 'Hoodies & Pop-Art Apparel',
    subtitle: 'Visual Aesthetics & Garment Styling',
    image: '/images/Lust Pop-Art T-Shirt Mockup Duo.png',
    secondaryImage: '/images/Plain and Printed Black Hoodies.png',
    analysisText: [
      'Pop-art dual-color graphics paired with heavyweight fleece hoodies. Exploring bold color block prints and tactile garment presentation.'
    ],
    keyElements: ['Dual-tone Pop Art illustrations', 'Heavyweight fleece textile rendering', 'Commercial apparel presentation']
  },
  {
    id: 10,
    pageNumber: 10,
    type: 'commercial',
    title: 'Performance Footwear Ads',
    subtitle: 'Nike & ASICS Campaign Explorations',
    image: '/images/Nike Alphafly_ No Human Is Limited.png',
    secondaryImage: '/images/ASICS Metaspeed Sky Tokyo Ad.png',
    analysisText: [
      'High-velocity commercial poster design emphasizing marathon speed, carbon fiber propulsion, and dynamic typography composition.'
    ],
    keyElements: ['Kinetic motion blur effects', 'Marathon performance branding', 'Neon & Tokyo night aesthetic']
  },
  {
    id: 11,
    pageNumber: 11,
    type: 'commercial',
    title: 'Futuristic Footwear Campaign',
    subtitle: 'PUMA Fast-RB Nitro Commercial Poster',
    image: '/images/PUMA Fast-RB Nitro Running Shoe Ad.png',
    analysisText: [
      'Highlighting radical sole geometry and detached nitro foam pods through explosive studio art direction and high-energy product framing.'
    ],
    keyElements: ['Exploded sole architecture', 'Nitro foam spec typography', 'High-contrast studio lighting']
  },
  {
    id: 12,
    pageNumber: 12,
    type: 'back-cover',
    title: 'THE CREATIVE EDITION',
    subtitle: 'Visual Stories & Art Direction',
    quote: 'Thank you for reading. Creative thinking shapes how we perceive the world.',
    analysisText: [
      'Publication Designed & Curated by Abhay Chaudhary.',
      'Computer Science & Graphic Design Specialist.'
    ]
  }
];
