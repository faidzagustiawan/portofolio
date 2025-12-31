export const projects = [
  {
    id: '1',
    slug: 'pantausam', // URL Friendly name
    name: 'PantauSAM',
    tagline: 'Real-time Monitoring Dashboard',
    year: '2024',
    category: 'Development',
    role: 'Lead Frontend Developer',
    client: 'Tech Corp Indonesia',
    duration: '6 Months',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    color: 'from-blue-600 to-cyan-500', // Gradient untuk hover effect list page
    technologies: ['React', 'TypeScript', 'D3.js', 'WebSocket', 'Tailwind CSS'],
    
    // --- Detail Content ---
    overview: 'PantauSAM is a sophisticated real-time monitoring dashboard designed for enterprise-level system oversight. The platform enables operations teams to track system health, performance metrics, and alerts across distributed infrastructure in real-time.',
    challenge: 'The client needed a monitoring solution that could handle thousands of data points updating in real-time while maintaining smooth 60fps performance. The existing solution was sluggish and made it difficult for operators to quickly identify and respond to issues.',
    approach: 'I approached this project with a performance-first mindset. This meant carefully architecting the data flow, implementing virtualized rendering for large datasets, and using WebSocket connections for live updates. Every animation and transition was optimized for GPU acceleration.',
    solution: 'Built a custom charting solution using D3.js that could render thousands of data points without frame drops. Implemented a smart update system that batches incoming data and uses RAF for smooth visual updates.',
    outcome: 'The new dashboard reduced mean-time-to-detection by 40% and improved operator efficiency by 60%. The smooth animations and clear data visualization received praise from both the client and end-users.',
    liveUrl: 'https://example.com',
    
    // Navigasi ke project berikutnya (gunakan slug)
    nextProjectSlug: 'exhibitly' 
  },
  {
    id: '2',
    slug: 'exhibitly',
    name: 'Exhibitly',
    tagline: 'Digital Exhibition Platform',
    year: '2024',
    category: 'Design',
    role: 'Creative Developer',
    client: 'National Art Gallery',
    duration: '4 Months',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop',
    color: 'from-purple-600 to-pink-500',
    technologies: ['Next.js', 'Three.js', 'GSAP', 'Framer Motion', 'WebGL'],

    overview: 'Exhibitly transforms how museums and galleries present their collections online. The platform creates immersive digital exhibitions that capture the feeling of walking through a physical gallery using WebGL technologies.',
    challenge: 'Traditional online galleries feel flat and disconnected. The client wanted to recreate the sense of discovery and wonder that comes from experiencing art in person, while making collections accessible to a global audience.',
    approach: 'I focused on creating depth and movement. Using Three.js for 3D environments and GSAP for precise animation orchestration, I built a system where users could navigate through virtual spaces naturally.',
    solution: 'Developed a modular exhibition system where curators can arrange artworks in virtual 3D spaces. Implemented smooth camera transitions, parallax effects on artwork frames, and subtle ambient animations to create atmosphere.',
    outcome: 'The platform launched with three major exhibitions and saw 300% more engagement than the previous static gallery. Users spent an average of 8 minutes per visit, compared to 2 minutes on the old site.',
    liveUrl: 'https://example.com',
    
    nextProjectSlug: 'finote'
  },
  {
    id: '3',
    slug: 'finote',
    name: 'Finote',
    tagline: 'Financial Tracking App',
    year: '2023',
    category: 'Mobile',
    role: 'Mobile Developer',
    client: 'FinTech Startup',
    duration: '8 Months',
    image: 'https://images.unsplash.com/photo-1563986768494-4dee46a38531?q=80&w=2034&auto=format&fit=crop',
    color: 'from-emerald-600 to-green-500',
    technologies: ['Kotlin', 'Jetpack Compose', 'Supabase', 'Android SDK'],

    overview: 'Finote is a comprehensive financial analytics mobile application that helps users understand and optimize their spending patterns. The tool transforms complex financial data into actionable insights through intuitive visualizations.',
    challenge: 'Financial data is inherently complex and can be overwhelming. Users needed a way to understand their finances at a glance while still having access to detailed breakdowns when needed, all within a small mobile screen.',
    approach: 'I designed a layered information architecture that reveals complexity progressively. Starting with simple, digestible overviews, users can drill down into specifics. Used Jetpack Compose for fluid UI interactions.',
    solution: 'Built a component library of financial visualizations that adapt to data density. Implemented smooth animations for data transitions that help users track changes over time. Created a customizable dashboard system.',
    outcome: 'User engagement increased by 150% after the redesign. The average session time doubled, and customer support tickets related to "confusing data" dropped by 70%.',
    liveUrl: null, // Project internal / belum live
    
    nextProjectSlug: 'lumina-ui'
  },
  {
    id: '4',
    slug: 'lumina-ui',
    name: 'Lumina UI',
    tagline: 'Design System Library',
    year: '2023',
    category: 'Design',
    role: 'UI Engineer',
    client: 'Internal Tool',
    duration: '3 Months',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop',
    color: 'from-orange-600 to-amber-500',
    technologies: ['React', 'Storybook', 'Figma', 'Radix UI'],

    overview: 'Lumina UI is a comprehensive design system built for scalability and consistency across multiple products. It focuses on accessibility, dark mode support, and developer experience.',
    challenge: 'The development team was suffering from inconsistency and slow iteration speeds due to copy-pasting code. We needed a centralized source of truth for all UI components.',
    approach: 'Adopted an atomic design methodology. Started with core tokens (colors, typography, spacing) and built up to complex organisms. Prioritized rigorous documentation using Storybook.',
    solution: 'Created a token-based design system with 50+ components, comprehensive documentation, and interactive examples. Built custom scripts to sync Figma tokens directly to CSS variables.',
    outcome: 'Reduced design-to-development time by 60%. New developers can now ship features in days instead of weeks using the pre-built components.',
    liveUrl: 'https://example.com',
    
    nextProjectSlug: 'pantausam' // Loop back to start
  }
]

// Kategori untuk Filter di List Page
export const categories = ['All', 'Development', 'Design', 'Mobile']

// Tahun untuk Filter di List Page
export const year = ['All', '2025', '2024', '2023']

// Ukuran default untuk floating preview image (Desktop List)
export const PREVIEW_SIZE = 300