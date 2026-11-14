export interface Profile {
  name: string;
  firstName: string;
  lastName: string;
  initials: string;
  role: string;
  tagline: string;
  email: string;
  phone: string;
  phoneHref: string;
  location: string;
  degree: string;
  college: string;
  cgpa: string;
  github: string;
  linkedin: string;
  resumeSummary: string;
  extraBio: string;
  resumePath: string;
  portraitBust: string;
}

export interface NavItem {
  id: string;
  label: string;
}

export interface SkillItem {
  id: string;
  number: number;
  symbol: string;
  name: string;
  family: 'Languages' | 'Game Dev' | 'Web & AI' | 'Databases' | 'Tools & Frameworks';
  logoKey: string;
  isBrand: boolean;
  projectsUsed: string[];
}

export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  kicker: string;
  year: string;
  description: string;
  features: string[];
  tech: string[];
  githubUrl?: string;
  liveUrl?: string;
  primaryBtnText?: string;
  primaryBtnUrl?: string;
  secondaryBtnText?: string;
  secondaryBtnUrl?: string;
  badgeText: string;
}

export interface SubCertificate {
  id: string;
  name: string;
  details: string;
  pdfUrl: string;
}

export interface CertificateItem {
  id: string;
  index: string;
  title: string;
  issuer: string;
  period: string;
  details: string;
  pdfUrl?: string;
  subCertificates?: SubCertificate[];
}

export interface CertificationItem {
  id: string;
  index: string;
  title: string;
  issuer: string;
  period: string;
  details: string;
}

export interface TimelineItem {
  id: string;
  year: string;
  title: string;
  place: string;
  type: 'Education' | 'Experience';
  score?: string;
  details: string[];
}

export interface AchievementItem {
  id: string;
  index: string;
  label: string;
  caption: string;
  detail: string;
  statNumber: number;
  statSuffix: string;
  statDecimals?: number;
  logoKey: string;
  brandColor: string;
}

export const PROFILE: Profile = {
  name: "Abhay Chaudhary",
  firstName: "ABHAY",
  lastName: "CHAUDHARY",
  initials: "AC",
  role: "Full Stack Developer.",
  tagline: "Computer Science & Engineering (Graphics & Gaming)",
  email: "Abhay.122710@stu.upes.ac.in",
  phone: "+91 8476030000",
  phoneHref: "tel:+918476030000",
  location: "Dehradun / Noida, India",
  degree: "B.Tech CSE (Graphics & Gaming)",
  college: "UPES, Dehradun",
  cgpa: "7.63 / 10",
  github: "https://github.com/abhay122710",
  linkedin: "https://linkedin.com/in/abhay5100",
  resumeSummary: "Computer Science & Engineering undergraduate specializing in Graphics & Gaming with hands-on experience in AI-powered applications, and Unity game development. Experienced in building RAG-based systems, commerce platforms, and physics-driven games through academic projects and software development internships.",
  extraBio: "Focusing on low-latency RAG memory graph architectures, interactive physics engines in C#, and high-performance Web application stacks.",
  resumePath: "/resume.pdf",
  portraitBust: "/portrait-bust.webp",
};

export const NAV: NavItem[] = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "leadership", label: "Leadership" },
  { id: "experience", label: "Experience" },
  { id: "achievements", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

export const SKILL_GROUPS: SkillItem[] = [
  // Languages
  { id: "cpp", number: 1, symbol: "Cp", name: "C++", family: "Languages", logoKey: "cplusplus", isBrand: true, projectsUsed: ["MNEMOSYNE", "Core Algorithms"] },
  { id: "python", number: 2, symbol: "Py", name: "Python", family: "Languages", logoKey: "python", isBrand: true, projectsUsed: ["MNEMOSYNE", "Ollama RAG", "Data Pipelines"] },
  { id: "csharp", number: 3, symbol: "Cs", name: "C#", family: "Languages", logoKey: "csharp", isBrand: true, projectsUsed: ["Geometry Dash 2D", "Unity Systems"] },
  { id: "typescript", number: 4, symbol: "Ts", name: "TypeScript", family: "Languages", logoKey: "typescript", isBrand: true, projectsUsed: ["Vendor+ Commerce"] },
  { id: "javascript", number: 5, symbol: "Js", name: "JavaScript", family: "Languages", logoKey: "javascript", isBrand: true, projectsUsed: ["Vendor+ Commerce"] },
  
  // Game Dev
  { id: "unity", number: 6, symbol: "Un", name: "Unity 3D", family: "Game Dev", logoKey: "unity", isBrand: true, projectsUsed: ["Geometry Dash 2D"] },
  { id: "navmesh", number: 7, symbol: "Nm", name: "NavMesh", family: "Game Dev", logoKey: "concept-navmesh", isBrand: false, projectsUsed: ["Geometry Dash 2D"] },
  { id: "raycasting", number: 8, symbol: "Rc", name: "Raycasting", family: "Game Dev", logoKey: "concept-raycast", isBrand: false, projectsUsed: ["Geometry Dash 2D"] },
  { id: "physics", number: 9, symbol: "Ph", name: "Physics Mechanics", family: "Game Dev", logoKey: "concept-physics", isBrand: false, projectsUsed: ["Geometry Dash 2D"] },
  { id: "blender", number: 10, symbol: "Bl", name: "Blender", family: "Game Dev", logoKey: "blender", isBrand: true, projectsUsed: ["Asset Pipeline"] },

  // Web & AI
  { id: "react", number: 11, symbol: "Re", name: "React.js", family: "Web & AI", logoKey: "react", isBrand: true, projectsUsed: ["Vendor+ Commerce"] },
  { id: "vite", number: 12, symbol: "Vi", name: "Vite", family: "Web & AI", logoKey: "vite", isBrand: true, projectsUsed: ["Vendor+ Commerce"] },
  { id: "cognee", number: 13, symbol: "Cg", name: "Cognee", family: "Web & AI", logoKey: "concept-cognee", isBrand: false, projectsUsed: ["MNEMOSYNE"] },
  { id: "kg", number: 14, symbol: "Kg", name: "Knowledge Graphs", family: "Web & AI", logoKey: "concept-kg", isBrand: false, projectsUsed: ["MNEMOSYNE"] },
  { id: "ollama", number: 15, symbol: "Ol", name: "Ollama / Llama", family: "Web & AI", logoKey: "concept-ollama", isBrand: false, projectsUsed: ["MNEMOSYNE"] },
  { id: "ml", number: 16, symbol: "Ml", name: "Machine Learning", family: "Web & AI", logoKey: "concept-ml", isBrand: false, projectsUsed: ["Vendor+ Commerce"] },

  // Databases
  { id: "supabase", number: 17, symbol: "Sb", name: "Supabase", family: "Databases", logoKey: "supabase", isBrand: true, projectsUsed: ["Vendor+ Commerce"] },
  { id: "vectordb", number: 18, symbol: "Vd", name: "VectorDB / Chroma", family: "Databases", logoKey: "concept-vectordb", isBrand: false, projectsUsed: ["MNEMOSYNE"] },
  { id: "mysql", number: 19, symbol: "My", name: "MySQL", family: "Databases", logoKey: "mysql", isBrand: true, projectsUsed: ["Relational Systems"] },
  { id: "firebase", number: 20, symbol: "Fb", name: "Firebase", family: "Databases", logoKey: "firebase", isBrand: true, projectsUsed: ["Realtime Apps"] },

  // Tools & Frameworks
  { id: "git", number: 21, symbol: "Gt", name: "Git & Git Hooks", family: "Tools & Frameworks", logoKey: "git", isBrand: true, projectsUsed: ["MNEMOSYNE", "CI/CD Workflows"] },
  { id: "figma", number: 22, symbol: "Fg", name: "Figma", family: "Tools & Frameworks", logoKey: "figma", isBrand: true, projectsUsed: ["IEEE Designs", "Vendor+ UI"] },
  { id: "vscode", number: 23, symbol: "Vc", name: "VS Code", family: "Tools & Frameworks", logoKey: "vscode", isBrand: true, projectsUsed: ["Primary IDE"] },
  { id: "twilio", number: 24, symbol: "Tw", name: "Twilio API", family: "Tools & Frameworks", logoKey: "concept-twilio", isBrand: false, projectsUsed: ["Vendor+ Commerce"] },
  { id: "canva", number: 25, symbol: "Ca", name: "Canva", family: "Tools & Frameworks", logoKey: "canva", isBrand: true, projectsUsed: ["Creative Design Portfolio", "Brand Assets"] },
  { id: "adobeexpress", number: 26, symbol: "Ex", name: "Adobe Express", family: "Tools & Frameworks", logoKey: "adobeexpress", isBrand: true, projectsUsed: ["Creative Design Portfolio", "Social Graphics"] },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "mnemosyne",
    index: "01",
    title: "MNEMOSYNE LIVE",
    kicker: "AI & RAG Memory System",
    year: "2025",
    description: "An AI-powered RAG debugging memory system using Python, ChromaDB, and Knowledge Graphs to retrieve historical error contexts and automated patches.",
    features: [
      "Knowledge graph indexing of codebase execution logs & traces",
      "Local Ollama Llama reasoning with ChromaDB semantic search",
      "Git Hooks integration for automated error memory captures"
    ],
    tech: ["Python", "Git Hooks", "Cognee", "Knowledge Graph", "Ollama"],
    githubUrl: "https://github.com/Abhay122710/mnemosyne",
    liveUrl: "https://mnemosyne-rose.vercel.app/",
    badgeText: "LIVE 2025"
  },
  {
    id: "geometry-dash",
    index: "02",
    title: "Geometry Dash 2D Platformer",
    kicker: "Unity Physics Game Engine",
    year: "2024",
    description: "A physics-driven 2D rhythm platformer in Unity C# featuring multiple movement modes, gravity inversion, and custom raycast collisions.",
    features: [
      "C# state machine powering 5 unique movement mechanics",
      "Raycast high-precision collision & dynamic gravity switches",
      "NavMesh level streaming maintaining smooth 60 FPS performance"
    ],
    tech: ["Unity 3D", "C#", "NavMesh", "Raycasting", "Physics"],
    githubUrl: "https://github.com/Abhay122710/Geometry-Dash-Style-2D-Game",
    liveUrl: "https://abhay122710.itch.io/geometry-dash-game",
    badgeText: "LIVE 2024"
  },
  {
    id: "vendor-plus",
    index: "03",
    title: "Vendor+ Hyperlocal Commerce",
    kicker: "Full-Stack Web & ML Platform",
    year: "2026",
    description: "A hyperlocal commerce platform with real-time inventory management, ML-based demand forecasting, and Twilio automated communications.",
    features: [
      "Supabase Auth & PostgreSQL with Realtime order tracking",
      "ML-driven inventory demand forecasting for local stores",
      "Twilio automated order notifications & masked phone calls"
    ],
    tech: ["React.js", "TypeScript", "Vite", "Supabase", "Twilio"],
    githubUrl: "https://github.com/Abhay122710/vendorplus",
    liveUrl: "https://vendorplus-lac.vercel.app/",
    badgeText: "LIVE 2026"
  },
  {
    id: "my-designs",
    index: "04",
    title: "Creative Design Portfolio",
    kicker: "Graphic Design · Advertising · Branding",
    year: "2026",
    description: "A curated collection of visual storytelling, cinematic poster designs, commercial advertising, apparel graphics, and brand identity systems.",
    features: [
      "Cinematic poster design & high-impact visual storytelling",
      "Brand identities, commercial ads & custom apparel graphics",
      "Typography systems, art direction & editorial magazine layouts"
    ],
    tech: ["Canva", "Adobe Express", "Figma", "Typography", "Art Direction"],
    primaryBtnText: "Read Magazine ↗",
    primaryBtnUrl: "/magazine",
    secondaryBtnText: "Explore Designs ↗",
    secondaryBtnUrl: "/magazine",
    liveUrl: "/magazine",
    badgeText: "MAGAZINE 2026"
  }
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: "ieee-design-head",
    index: "01",
    title: "Design Head — IEEE Student Branch",
    issuer: "IEEE UPES Chapter",
    period: "Leadership Role",
    details: "Led the design team, managing visual communication and creative design requirements for technical IEEE events and national workshops."
  },
  {
    id: "sae-core-member",
    index: "02",
    title: "Core Member — SAE India",
    issuer: "Society of Automotive Engineers (SAE)",
    period: "Committee Role",
    details: "Contributed to organizing technical events, engineering competitions, and managing student club activities."
  }
];

export const TIMELINE: TimelineItem[] = [
  {
    id: "tribal-fusion-2026",
    year: "Jun 2026 – Jul 2026",
    title: "Software Development Intern",
    place: "Tribal Fusion R&D LLP, Noida",
    type: "Experience",
    details: [
      "Contributed to software application development and unit testing, implementing and debugging application components.",
      "Worked on improving existing technical workflows and resolving software issues through iterative testing and debugging."
    ]
  },
  {
    id: "dbr-2025",
    year: "Jun 2025 – Jul 2025",
    title: "Marketing Intern",
    place: "DBR Pvt. Ltd, Noida",
    type: "Experience",
    details: [
      "Assisted in planning and executing digital marketing campaigns, social media management, and content creation.",
      "Conducted market research and analyzed campaign performance metrics to optimize brand visibility."
    ]
  },
  {
    id: "btech-upes",
    year: "2022 – 2026",
    title: "B.Tech, Computer Science & Engineering (Graphics & Gaming)",
    place: "UPES, Dehradun",
    type: "Education",
    score: "CGPA: 7.63 / 10",
    details: [
      "Specializing in Graphics Programming, Game Engine Development, C++, Unity 3D, and AI.",
      "Appointed Design Head of IEEE Student Branch and Core Committee Member of SAE."
    ]
  },
  {
    id: "class-12",
    year: "2022",
    title: "Class XII (CBSE)",
    place: "Shivalik Gurukul, Ambala",
    type: "Education",
    score: "78%",
    details: [
      "Completed Senior Secondary education with focus on Physics, Chemistry, and Mathematics."
    ]
  },
  {
    id: "class-10",
    year: "2020",
    title: "Class X (CBSE)",
    place: "SBPS, Shamli",
    type: "Education",
    score: "75%",
    details: [
      "Completed Secondary School Certificate under Central Board of Secondary Education."
    ]
  }
];

export const CERTIFICATES: CertificateItem[] = [
  {
    id: "pwc-launchpad",
    index: "01",
    title: "Pwc: Advisory Launchpad Program",
    issuer: "PricewaterhouseCoopers (PwC)",
    period: "Advisory Launchpad Program",
    details: "Executive consulting and business advisory simulation covering strategic problem-solving, client deliverables, and commercial advisory methodologies.",
    pdfUrl: "/certificates/PwC Certificate of Participation.pdf"
  },
  {
    id: "google",
    index: "02",
    title: "Google",
    issuer: "Google Career Certificates",
    period: "2 Professional Specializations",
    details: "Industry credentials spanning Artificial Intelligence and User Experience (UX) Design. Click to reveal both certificates.",
    subCertificates: [
      {
        id: "google-ai",
        name: "Google AI",
        details: "7 Courses • AI Fundamentals, Prompting, Brainstorming & Planning, Research & Insights, Writing & Communicating, Content Creation, Data Analysis, and App Building.",
        pdfUrl: "/certificates/Google AI.pdf"
      },
      {
        id: "google-ux-design",
        name: "Google UX Design",
        details: "7 Courses • Foundations of User Experience (UX) Design, Empathize/Define/Ideate, Wireframing & Low-Fidelity Prototypes, UX Research & Usability Testing, and High-Fidelity Prototypes.",
        pdfUrl: "/certificates/Google UX Design.pdf"
      }
    ]
  },
  {
    id: "ibm",
    index: "03",
    title: "IBM",
    issuer: "IBM Skills Network",
    period: "4 Courses Specialization",
    details: "Artificial Intelligence & Generative AI curriculum: Introduction to Artificial Intelligence (AI), Generative AI Applications, Prompt Engineering Basics, and AI-Powered Chatbot Engineering.",
    pdfUrl: "/certificates/IBM.pdf"
  },
  {
    id: "scrimba",
    index: "04",
    title: "Scrimba",
    issuer: "Scrimba",
    period: "5 Courses Specialization",
    details: "Modern Software Engineering with AI: Vibe Coding with Cursor AI, GitHub Copilot, Claude Code, Model Context Protocol (MCP), and modern AI coding workflows.",
    pdfUrl: "/certificates/Scrimba.pdf"
  }
];

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    id: "tribal-fusion-select",
    index: "01 / 03",
    label: "Software Development Intern",
    caption: "Tribal Fusion R&D LLP, Noida",
    detail: "Application development & automated testing",
    statNumber: 2026,
    statSuffix: "",
    logoKey: "vscode",
    brandColor: "#007ACC"
  },
  {
    id: "ieee-lead",
    index: "02 / 03",
    label: "IEEE Design Head",
    caption: "Led creative & visual strategy team",
    detail: "Managed visual identity for national technical events",
    statNumber: 1,
    statSuffix: "st",
    logoKey: "ieee",
    brandColor: "#006699"
  },
  {
    id: "sae-core",
    index: "03 / 03",
    label: "SAE Core Committee",
    caption: "Automotive engineering student leadership",
    detail: "Organized technical competitions & workshops",
    statNumber: 100,
    statSuffix: "%",
    logoKey: "cplusplus",
    brandColor: "#00599C"
  }
];

