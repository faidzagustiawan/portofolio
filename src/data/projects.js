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

    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',

    // ⬇️ BARU
    video: 'https://res.cloudinary.com/dwudbtejo/video/upload/v1767021278/pantausam_dptnya.mp4',

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
      {
        name: 'Muhammad Faidz Agustiawan',
        role: 'Fullstack Developer',
        avatar: 'https://res.cloudinary.com/dwudbtejo/image/upload/v1767279657/foto_215px_X_215px_ts9l6o.png'
      },
      {
        name: 'Fikri Irfan Hidayah',
        role: 'UI Designer',
        avatar: 'https://res.cloudinary.com/dwudbtejo/image/upload/v1767281542/User_Persona_Planning_Whiteboard_73_qyrvou.png'
      },
      {
        name: 'Dama Saputra Ganatha',
        role: 'Project Manager',
        avatar: 'https://res.cloudinary.com/dwudbtejo/image/upload/v1767280648/dama_wuf3r6.jpg'
      },
      {
        name: 'Radit',
        role: 'Document Manager',
        avatar: 'https://res.cloudinary.com/dwudbtejo/image/upload/v1767264626/Untitled_design_1_kmd5s1.svg'
      }
    ],

    overview:
      'PantauSAM is a web-based civic platform that allows the public to report infrastructure conditions such as damaged, under-repair, or completed facilities.',

    challenge:
      'Ensuring data validity while keeping public reporting accessible.',

    approach:
      'Verification-first workflow with admin validation.',

    solution:
      'Role-based system with interactive map and verification dashboard.',

    outcome:
      'Demonstrates fullstack development and civic-tech problem solving.',

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

    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop',

    // ⬇️ BARU
    video: 'https://res.cloudinary.com/dwudbtejo/video/upload/v1767021287/re-enviro_bj08kj.mp4',

    color: 'from-emerald-600 to-teal-500',

    technologies: [
      'React',
      'JavaScript',
      'Tailwind CSS',
      'Framer Motion',
      'Supabase'
    ],

    team: [
      {
        name: 'Muhammad Faidz Agustiawan',
        role: 'Frontend Developer',
        avatar: 'https://res.cloudinary.com/dwudbtejo/image/upload/v1767264626/Untitled_design_1_kmd5s1.svg'
      },
      {
        name: 'Gerard',
        role: 'Product Manager',
        avatar: 'https://res.cloudinary.com/dwudbtejo/image/upload/v1767264626/Untitled_design_1_kmd5s1.svg'
      },
      {
        name: 'Katherine',
        role: 'Backend Developer',
        avatar: 'https://res.cloudinary.com/dwudbtejo/image/upload/v1767264626/Untitled_design_1_kmd5s1.svg'
      },
      {
        name: 'Tia',
        role: 'Ui/UX Designer',
        avatar: 'https://res.cloudinary.com/dwudbtejo/image/upload/v1767264626/Untitled_design_1_kmd5s1.svg'
      },
    ],

    overview: 'Environmental awareness platform with interactive UI.',
    challenge: 'Low engagement in static educational platforms.',
    approach: 'Motion-driven UI.',
    solution: 'React app with Framer Motion.',
    outcome: 'Improved frontend architecture skills.',

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

    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800',

    video: 'https://drive.google.com/file/d/1GeN0TQf1ulu-tq1uLB4O77SyXvYal4FH/view',

    color: 'from-indigo-600 to-purple-500',

    technologies: [
      'Kotlin',
      'Jetpack Compose',
      'Android SDK',
      'Supabase'
    ],

    team: [
      {
        name: 'Muhammad Faidz Agustiawan',
        role: 'Android Developer',
        avatar: 'https://res.cloudinary.com/dwudbtejo/image/upload/v1767279657/foto_215px_X_215px_ts9l6o.png'
      },
      {
        name: 'Yehezkiel',
        role: 'Android Developer',
        avatar: 'https://res.cloudinary.com/dwudbtejo/image/upload/v1767264626/Untitled_design_1_kmd5s1.svg'
      },
      {
        name: 'Erza',
        role: 'Android Developer',
        avatar: 'https://res.cloudinary.com/dwudbtejo/image/upload/v1767264626/Untitled_design_1_kmd5s1.svg'
      }
    ],

    overview: 'Expense tracking app with charts and statistics.',
    challenge: 'Clear data visualization on small screens.',
    approach: 'Progressive disclosure.',
    solution: 'Compose-based analytics UI.',
    outcome: 'Strong Android & data visualization foundation.',

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

    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=2070&auto=format&fit=crop',

    video: 'https://res.cloudinary.com/dwudbtejo/video/upload/v1767021285/engineer_lwefc0.mp4',

    color: 'from-amber-600 to-orange-500',

    technologies: [
      'HTML5',
      'Tailwind CSS',
      'JavaScript'
    ],

    team: [
      {
        name: 'Muhammad Faidz Agustiawan',
        role: 'Frontend Developer',
        avatar: 'https://res.cloudinary.com/dwudbtejo/image/upload/v1767279657/foto_215px_X_215px_ts9l6o.png'
      }
    ],

    overview:
      'Engineer Coffee is a modern coffee shop website designed to showcase brand identity, menu offerings, and atmosphere through interactive visuals and smooth animations.',

    challenge:
      'Creating a visually engaging website that reflects the brand personality while remaining lightweight and fast.',

    approach:
      'Focused on layout composition, motion design, and clear visual hierarchy to guide users naturally through the content.',

    solution:
      'Built a responsive React-based website enhanced with Tailwind CSS for consistent styling.',

    outcome:
      'The project highlights frontend craftsmanship, animation-driven UI, and branding-focused web development.',

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

    image: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?q=80&w=2070&auto=format&fit=crop',

    video: 'https://res.cloudinary.com/dwudbtejo/video/upload/v1767021280/exhibitily_pdpwvh.mp4',

    color: 'from-purple-600 to-pink-500',

    technologies: [
      'React',
      'React Three Fiber',
      'Framer Motion'
    ],

    team: [
      {
        name: 'Muhammad Faidz Agustiawan',
        role: 'Creative Frontend Developer',
        avatar: 'https://res.cloudinary.com/dwudbtejo/image/upload/v1767279657/foto_215px_X_215px_ts9l6o.png'
      }
    ],

    overview:
      'Exhibitly is an experimental web-based digital exhibition that explores immersive storytelling through 3D space, motion, and interaction.',

    challenge:
      'Creating a experience on the web while maintaining performance and accessibility across devices.',

    approach:
      'Focused on balancing visual richness with performance by carefully managing scene complexity, camera movement, and animation timing.',

    solution:
      'Built an interactive 3D environment using React Three Fiber, enhanced with GSAP and Framer Motion for seamless transitions and narrative flow.',

    outcome:
      'Exhibitly showcases advanced frontend capabilities in 3D interaction, animation, and experiential web design.',

    liveUrl: 'https://exhibitly-nu.vercel.app/',
    githubUrl: 'https://github.com/faidzagustiawan/Exhibitly',
    nextProjectSlug: 'pantausam'
  }


]

// Kategori untuk Filter di List Page
export const categories = ['All', 'Web Application', 'Landing Page', 'Mobile', 'AI/ML',]

// Tahun untuk Filter di List Page
export const year = ['All', '2025', '2024', '2023']

// Ukuran default untuk floating preview image (Desktop List)
export const PREVIEW_SIZE = 400

