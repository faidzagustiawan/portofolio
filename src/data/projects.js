// URL R2 Base. Pastikan menambahkan .env di root proyek (contoh di .env.example)
// Vite menggunakan import.meta.env, jika tidak ada fallback ke string kosong agar tidak error saat build/dev tanpa env
const R2_BASE_URL = import.meta.env.VITE_R2_PUBLIC_URL || '';

export const teamMembers = {
  faidz: {
    name: 'Muhammad Faidz Agustiawan',
    avatar: `${R2_BASE_URL}/avatars/faidz-avatar.png`
  },
  fikri: {
    name: 'Fikri Irfan Hidayah',
    avatar: `${R2_BASE_URL}/avatars/fikri-avatar.png`
  },
  dama: {
    name: 'Dama Saputra Ganatha',
    avatar: `${R2_BASE_URL}/avatars/dama-avatar.png`
  },
  radit: {
    name: 'Radit',
    avatar: `${R2_BASE_URL}/avatars/radit-avatar.png`
  },
  gerard: {
    name: 'Gerard',
    avatar: `${R2_BASE_URL}/avatars/gerard-avatar.png`
  },
  katherine: {
    name: 'Katherine',
    avatar: `${R2_BASE_URL}/avatars/katherine-avatar.png`
  },
  tia: {
    name: 'Tia',
    avatar: `${R2_BASE_URL}/avatars/tia-avatar.png`
  },
  yehezkiel: {
    name: 'Yehezkiel',
    avatar: `${R2_BASE_URL}/avatars/yehezkiel-avatar.png`
  },
  erza: {
    name: 'Erza',
    avatar: `${R2_BASE_URL}/avatars/erza-avatar.png`
  }
};

export const projects = [
  {
    id: '1',
    slug: 'pantausam',
    name: 'PantauSAM',
    featured: true,
    tagline: 'Community-Based Infrastructure Monitoring Platform',
    year: '2024',
    category: 'Web Application',
    role: 'Fullstack Web Developer',
    client: 'Academic Project',
    duration: '±5 Months',

    // ⬇️ R2 Cloudflare URL Dynamic
    image: `${R2_BASE_URL}/projects/pantausam-image.jpg`,
    video: `${R2_BASE_URL}/projects/pantausam-video.mp4`,
    visualDetails: [
      `${R2_BASE_URL}/projects/pantausam-detail-1.jpg`,
      `${R2_BASE_URL}/projects/pantausam-detail-2.jpg`
    ],

    color: 'from-blue-600 to-cyan-500',

    technologies: [
      'Laravel 11',
      'Blade',
      'JavaScript',
      'MySQL',
      'Leaflet.js',
      'OpenStreetMap API',
      'Tailwind CSS',
      'Laravel Breeze'
    ],

    team: [
      { ...teamMembers.faidz, role: 'Fullstack Developer' },
      { ...teamMembers.fikri, role: 'UI Designer' },
      { ...teamMembers.dama, role: 'Project Manager' },
      { ...teamMembers.radit, role: 'Document Manager' }
    ],

    overview:
      'PantauSAM is a web-based civic-tech platform that facilitates public infrastructure reporting. It enables citizens to report damaged roads, broken facilities, or repairs in real-time with interactive mapping integration.',

    challenge:
      'The main challenge was designing a reporting workflow that is highly accessible for the general public, while remaining structured and validated so admins can process issues accurately without spam.',

    approach:
      'I implemented a two-step verification flow and centered the reporting interface around an interactive map, allowing users to simply "pin" locations rather than typing long, error-prone addresses.',

    solution:
      'Developed a role-based system using Laravel. The frontend utilizes Tailwind CSS and Leaflet.js for dynamic mapping, while Laravel Breeze handles secure admin authentication sessions.',

    contribution:
      'As a Fullstack Developer, I was fully responsible for designing the database schema, building RESTful endpoints in Laravel, and integrating Leaflet.js with OpenStreetMap for coordinate-based reporting features.',

    outcome:
      'This project successfully demonstrates my capability to build functional, secure fullstack applications that solve real-world bureaucratic reporting issues at the community level.',

    liveUrl: null,
    githubUrl: 'https://github.com/username/pantausam',
    nextProjectSlug: 're-enviro'
  },

  {
    id: '2',
    slug: 're-enviro',
    name: 'Re-Enviro',
    featured: true,
    tagline: 'Environmental Awareness Web Platform',
    year: '2025',
    category: 'Web Application',
    role: 'Frontend Developer',
    client: 'ASCEND Team Project',
    duration: '1 Months',

    // ⬇️ R2 Cloudflare URL Dynamic
    image: `${R2_BASE_URL}/projects/re-enviro-image.jpg`,
    video: `${R2_BASE_URL}/projects/re-enviro-video.mp4`,
    visualDetails: [
      `${R2_BASE_URL}/projects/re-enviro-detail-1.jpg`,
      `${R2_BASE_URL}/projects/re-enviro-detail-2.jpg`
    ],

    color: 'from-emerald-600 to-teal-500',

    technologies: [
      'React',
      'JavaScript',
      'Tailwind CSS',
      'Framer Motion',
      'Supabase'
    ],

    team: [
      { ...teamMembers.faidz, role: 'Frontend Developer' },
      { ...teamMembers.gerard, role: 'Product Manager' },
      { ...teamMembers.katherine, role: 'Backend Developer' },
      { ...teamMembers.tia, role: 'UI/UX Designer' }
    ],

    overview: 
      'Re-Enviro is an educational web platform aimed at increasing public awareness of environmental issues through visually engaging information delivery.',
    
    challenge: 
      'Environmental education platforms often feel rigid and boring, making it difficult to retain young users\' engagement while they consume the material.',
    
    approach: 
      'I adopted a "motion-driven UI" approach where every transition and informational element is subtly animated to create a modern and interactive reading experience.',
    
    solution: 
      'Built a Single Page Application (SPA) using React. Implemented Framer Motion to orchestrate complex cross-page animations, alongside Supabase integration for lightweight content management.',
    
    contribution:
      'I initiated the Frontend architecture, designed the React component hierarchy, and specifically programmed all micro-interactions and transition animations to run smoothly without frame drops.',
      
    outcome: 
      'Improved my React architecture skills and deepened my understanding of state-driven animation, resulting in a visually impressive and highly responsive platform.',

    liveUrl: null,
    githubUrl: 'https://github.com/faidzagustiawan/Renviro-13',
    nextProjectSlug: 'finote'
  },

  {
    id: '3',
    slug: 'finote',
    name: 'Finote',
    featured: false,
    tagline: 'Personal Finance & Expense Analytics App',
    year: '2025',
    category: 'Mobile',
    role: 'Android Developer',
    client: 'Personal Project',
    duration: '±3 Months',

    // ⬇️ R2 Cloudflare URL Dynamic
    image: `${R2_BASE_URL}/projects/finote-image.jpg`,
    video: `${R2_BASE_URL}/projects/finote-video.mp4`,
    visualDetails: [
      `${R2_BASE_URL}/projects/finote-detail-1.jpg`,
      `${R2_BASE_URL}/projects/finote-detail-2.jpg`
    ],

    color: 'from-indigo-600 to-purple-500',

    technologies: [
      'Kotlin',
      'Jetpack Compose',
      'Android SDK',
      'Supabase'
    ],

    team: [
      { ...teamMembers.faidz, role: 'Android Developer' },
      { ...teamMembers.yehezkiel, role: 'Android Developer' },
      { ...teamMembers.erza, role: 'Android Developer' }
    ],

    overview: 
      'Finote is a mobile expense tracking application that visualizes personal financial data into comprehensive charts and statistics.',
    
    challenge: 
      'Presenting dense and complex financial statistical data clearly and legibly on a very limited mobile screen size.',
    
    approach: 
      'Used the principle of progressive disclosure, where users initially see only summary information and can drill down to view specific details of their financial metrics.',
    
    solution: 
      'Designed a modern analytics interface entirely using Jetpack Compose. The system fetches and processes data in real-time using Kotlin and a Supabase backend.',
    
    contribution:
      'I focused on UI/UX implementation using Jetpack Compose, specifically building the data visualization components (custom charts) and cross-screen navigation.',
      
    outcome: 
      'Solidified my foundation in modern Android development (Declarative UI) and enhanced my ability to transform raw data into interactive visualizations.',

    liveUrl: null,
    githubUrl: 'https://github.com/faidzagustiawan/Finote',
    nextProjectSlug: 'engineer-coffee'
  },
  {
    id: '4',
    slug: 'engineer-coffee',
    name: 'Engineer Coffee',
    featured: true,
    tagline: 'Modern Coffee Shop Website with Interactive Experience',
    year: '2025',
    category: 'Landing Page',
    role: 'Frontend Developer',
    client: 'Independent Coffee Brand',
    duration: '1 Weeks',

    // ⬇️ R2 Cloudflare URL Dynamic
    image: `${R2_BASE_URL}/projects/engineer-coffee-image.jpg`,
    video: `${R2_BASE_URL}/projects/engineer-coffee-video.mp4`,
    visualDetails: [
      `${R2_BASE_URL}/projects/engineer-coffee-detail-1.jpg`,
      `${R2_BASE_URL}/projects/engineer-coffee-detail-2.jpg`
    ],

    color: 'from-amber-600 to-orange-500',

    technologies: [
      'HTML5',
      'Tailwind CSS',
      'JavaScript'
    ],

    team: [
      { ...teamMembers.faidz, role: 'Frontend Developer' }
    ],

    overview:
      'Engineer Coffee is a modern landing page designed specifically to showcase the brand identity, menu, and atmosphere of an indie coffee shop.',

    challenge:
      'Many coffee shop websites look incredibly generic. The challenge was to create an interface that is elegant and interactive, yet lightweight and fast without relying on bloated libraries.',

    approach:
      'Focused on layout composition, the use of bold typography, and a clear visual hierarchy to naturally guide the user\'s eyes from the hero section down to the menu.',

    solution:
      'Built a performance-optimized static website using HTML5, Tailwind CSS, and Vanilla JavaScript. The styling system is strictly consistent for easy future scalability.',

    contribution:
      'This project is a solo endeavor. I handled everything from converting the UI design into code, optimizing image assets, to final deployment.',

    outcome:
      'This project proves my fundamental frontend craftsmanship, ensuring the website is not only beautiful but also accessible instantly (blazing fast).',

    liveUrl: 'https://engineer-coffee.vercel.app/',
    githubUrl: 'https://github.com/faidzagustiawan/Engineer-Coffee',
    nextProjectSlug: 'exhibitly'
  },
  {
    id: '5',
    slug: 'exhibitly',
    name: 'Exhibitly',
    featured: false,
    tagline: 'Art Digital Exhibition',
    year: '2025',
    category: 'Web Application',
    role: 'Creative Frontend Developer',
    client: 'Personal Experimental Project',
    duration: '2 Weeks',

    // ⬇️ R2 Cloudflare URL Dynamic
    image: `${R2_BASE_URL}/projects/exhibitly-image.jpg`,
    video: `${R2_BASE_URL}/projects/exhibitly-video.mp4`,
    visualDetails: [
      `${R2_BASE_URL}/projects/exhibitly-detail-1.jpg`,
      `${R2_BASE_URL}/projects/exhibitly-detail-2.jpg`
    ],

    color: 'from-purple-600 to-pink-500',

    technologies: [
      'React',
      'React Three Fiber',
      'Framer Motion'
    ],

    team: [
      { ...teamMembers.faidz, role: 'Creative Frontend Developer' }
    ],

    overview:
      'Exhibitly is an experimental web-based digital art exhibition that explores immersive storytelling through 3D space, motion, and interaction.',

    challenge:
      'Rendering 3D environments in a web browser is often highly taxing and causes frame drops, especially on lower-end devices or smartphones.',

    approach:
      'Maintained a delicate balance between visual richness and performance. I carefully managed scene complexity, limited polygon counts, and tuned camera movement timing to feel natural.',

    solution:
      'Built an interactive 3D environment using React Three Fiber (R3F). The interface is layered with Framer Motion to synchronize text and narration with movement in the 3D world.',

    contribution:
      'As a solo developer, I orchestrated the 3D scene, programmed raycasting logic for object interaction, and optimized 3D assets to pass web performance standards.',

    outcome:
      'Exhibitly showcases my advanced frontend capabilities in managing WebGL, 3D interactions, and complex animations to create experimental web designs.',

    liveUrl: 'https://exhibitly-nu.vercel.app/',
    githubUrl: 'https://github.com/faidzagustiawan/Exhibitly',
    nextProjectSlug: 'spk-property-backend'
  },
  {
    id: '6',
    slug: 'spk-property-backend',
    name: 'SPK Property Backend',
    featured: true,
    tagline: 'Decision Support System API with ML Integration',
    year: '2024',
    category: 'AI/ML',
    role: 'Backend Developer',
    client: 'Academic / Independent',
    duration: '±2 Months',

    image: `${R2_BASE_URL}/projects/spk-image.jpg`,
    video: `${R2_BASE_URL}/projects/spk-video.mp4`,
    visualDetails: [
      `${R2_BASE_URL}/projects/spk-detail-1.jpg`,
      `${R2_BASE_URL}/projects/spk-detail-2.jpg`
    ],

    color: 'from-slate-700 to-zinc-500',

    technologies: [
      'Node.js',
      'Express',
      'PostgreSQL',
      'Docker',
      'Swagger UI',
      'JWT'
    ],

    team: [
      { ...teamMembers.faidz, role: 'Backend Developer' }
    ],

    overview:
      'A REST API for a property selection Decision Support System (DSS). It combines Analytic Hierarchy Process (AHP) weighting with four ranking algorithms (SAW, SMART, WP, TOPSIS).',

    challenge:
      'Implementing complex mathematical decision-making algorithms cleanly within a RESTful architecture, ensuring the calculations are both accurate and performant.',

    approach:
      'Built a robust service layer to handle the AHP matrix calculations independently, and containerized the entire application with Docker for seamless deployment.',

    solution:
      'Developed using Node.js and Express with a PostgreSQL database. Included a specialized Machine Learning Dataset Generator endpoint to pivot relational data into tabular format for Scikit-learn consumption.',

    contribution:
      'Sole developer. Designed the database schema, implemented JWT authentication, wrote the ranking algorithms, and documented the API using OpenAPI/Swagger.',

    outcome:
      'Successfully delivered a highly complex algorithmic backend that seamlessly bridges decision-support mathematics with modern web API standards and machine learning readiness.',

    liveUrl: null,
    githubUrl: 'https://github.com/faidzagustiawan/spk-property-backend',
    nextProjectSlug: 'kalkulator-sdmk'
  },
  {
    id: '7',
    slug: 'kalkulator-sdmk',
    name: 'Kalkulator SDMK',
    featured: false,
    tagline: 'Health Worker Requirement Calculator',
    year: '2024',
    category: 'Web Application',
    role: 'Frontend Developer',
    client: 'Healthcare Sector',
    duration: '±1 Month',

    image: `${R2_BASE_URL}/projects/sdmk-image.jpg`,
    video: `${R2_BASE_URL}/projects/sdmk-video.mp4`,
    visualDetails: [
      `${R2_BASE_URL}/projects/sdmk-detail-1.jpg`,
      `${R2_BASE_URL}/projects/sdmk-detail-2.jpg`
    ],

    color: 'from-emerald-600 to-cyan-600',

    technologies: [
      'Next.js',
      'React',
      'Tailwind CSS',
      'Google Apps Script'
    ],

    team: [
      { ...teamMembers.faidz, role: 'Frontend Developer' }
    ],

    overview:
      'A modern Next.js frontend application for calculating the standard requirements of healthcare human resources (SDMK).',

    challenge:
      'The client needed a modern, responsive web application but relied on an existing Google Apps Script (Google Sheets) backend for data storage and logic.',

    approach:
      'Designed a clean, multi-step calculation form interface in Next.js that safely interacts with the existing Apps Script endpoints without requiring backend modifications.',

    solution:
      'Implemented an App Router Next.js architecture with custom UI components, toast notifications, and strict authentication guards, utilizing localStorage for session management.',

    contribution:
      'Developed the entire frontend architecture, translating legacy HTML/CSS into reusable React components while preserving 100% of the original calculation engine logic.',

    outcome:
      'Modernized a critical healthcare calculation tool, drastically improving the UX and maintainability while keeping infrastructure costs effectively at zero.',

    liveUrl: null,
    githubUrl: 'https://github.com/faidzagustiawan/SDMK',
    nextProjectSlug: 'travel-backend'
  },
  {
    id: '8',
    slug: 'travel-backend',
    name: 'Travel Backend API',
    featured: false,
    tagline: 'RESTful API for Travel & Tourism Platform',
    year: '2024',
    category: 'Web Application',
    role: 'Backend Developer',
    client: 'Independent Project',
    duration: '±1 Month',

    image: `${R2_BASE_URL}/projects/travel-image.jpg`,
    video: `${R2_BASE_URL}/projects/travel-video.mp4`,
    visualDetails: [
      `${R2_BASE_URL}/projects/travel-detail-1.jpg`,
      `${R2_BASE_URL}/projects/travel-detail-2.jpg`
    ],

    color: 'from-rose-600 to-orange-500',

    technologies: [
      'Laravel',
      'PHP',
      'MySQL',
      'REST API'
    ],

    team: [
      { ...teamMembers.faidz, role: 'Backend Developer' }
    ],

    overview:
      'A comprehensive backend API built with Laravel to support a travel and tourism booking platform.',

    challenge:
      'Structuring a scalable relational database to handle complex travel itineraries, user bookings, and transaction states.',

    approach:
      'Utilized Laravel Eloquent ORM to establish strict relationships between users, destinations, and booking records, exposing them via clean RESTful endpoints.',

    solution:
      'Built with the Laravel framework, featuring secure authentication, data validation, and optimized database queries to ensure fast response times for the frontend client.',

    contribution:
      'Handled the entire backend development lifecycle from database design to API routing and controller logic.',

    outcome:
      'Solidified my expertise in PHP and Laravel ecosystem, delivering a robust API ready for integration with modern mobile or web frontends.',

    liveUrl: null,
    githubUrl: 'https://github.com/faidzagustiawan/travel_backend_laravel',
    nextProjectSlug: 'pantausam'
  }
]

// Kategori untuk Filter di List Page
export const categories = ['All', 'Web Application', 'Landing Page', 'Mobile', 'AI/ML',]

// Tahun untuk Filter di List Page
export const year = ['All', '2026', '2025', '2024']

// Ukuran default untuk floating preview image (Desktop List)
export const PREVIEW_SIZE = 400

