export const projects = [
  {
    id: '1',
    slug: 'pantausam',
    name: 'PantauSAM',
    tagline: 'Community-Based Infrastructure Monitoring Platform',
    year: '2024',
    category: 'Development',
    role: 'Fullstack Web Developer',
    client: 'Academic Project',
    duration: '±5 Months',
    image: 'https://res.cloudinary.com/dwudbtejo/video/upload/v1767021278/pantausam_dptnya.mp4',
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

    // Team Members
    team: [
      {
        name: 'Muhammad Faidz Agustiawan',
        role: 'Fullstack Developer',
        avatar: 'https://res.cloudinary.com/dwudbtejo/image/upload/v1767279657/foto_215px_X_215px_ts9l6o.png'
      },
      {
        name: 'Fikri Irfan Hidayah',
        role: 'UI Designer',
        avatar: 'https://res.cloudinary.com/dwudbtejo/image/upload/v1767279803/Happy_rcjmu5.png'
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
      },
    ],

    overview:
      'PantauSAM is a web-based civic platform that allows the public to report infrastructure conditions such as damaged, under-repair, or completed facilities. Reports are verified by administrators before being displayed on an interactive map.',

    challenge:
      'The main challenge was ensuring data validity while keeping the reporting process accessible to the public. The system needed to prevent misinformation without discouraging community participation.',

    approach:
      'Implemented a verification-first workflow where all user submissions are stored as pending data. The interface prioritizes clarity and usability, especially for non-technical users.',

    solution:
      'Developed a role-based system (user & admin), interactive map visualization using Leaflet and OpenStreetMap API, infrastructure status indicators, and a structured admin verification dashboard.',

    outcome:
      'PantauSAM became a strong academic and portfolio project that demonstrates fullstack development, geospatial visualization, and civic-tech problem solving.',

    liveUrl: null,
    nextProjectSlug: 're-enviro'
  },

  {
    id: '2',
    slug: 're-enviro',
    name: 'Re-Enviro',
    tagline: 'Environmental Awareness Web Platform',
    year: '2024',
    category: 'Development',
    role: 'Frontend Developer',
    client: 'Academic Team Project',
    duration: '±3 Months',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop',
    color: 'from-emerald-600 to-teal-500',
    technologies: [
      'React',
      'JavaScript',
      'Tailwind CSS',
      'Framer Motion'
    ],

    team: [
      {
        name: 'Muhammad Faidz Agustiawan',
        role: 'Frontend Developer',
        avatar: 'https://i.pravatar.cc/150?img=13'
      },
      {
        name: 'Tim Re-Enviro',
        role: 'Content & Research',
        avatar: 'https://i.pravatar.cc/150?img=14'
      }
    ],

    overview:
      'Re-Enviro is a web platform designed to raise environmental awareness through interactive content and modern UI experiences.',

    challenge:
      'Environmental information is often delivered in static and overwhelming formats, reducing user engagement.',

    approach:
      'Focused on visual hierarchy, motion, and spacing to guide user attention while keeping the content easy to digest.',

    solution:
      'Built a responsive React interface enhanced with Framer Motion animations to create a smooth and engaging educational experience.',

    outcome:
      'The project strengthened frontend architecture skills and the use of motion design to support content-driven platforms.',

    liveUrl: null,
    nextProjectSlug: 'finote'
  },

  {
    id: '3',
    slug: 'finote',
    name: 'Finote',
    tagline: 'Personal Finance & Expense Analytics App',
    year: '2023',
    category: 'Mobile',
    role: 'Android Developer',
    client: 'Personal / Learning Project',
    duration: '±4 Months',
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800',
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
        avatar: 'https://i.pravatar.cc/150?img=15'
      }
    ],

    overview:
      'Finote is a personal finance tracking application that helps users monitor expenses and analyze spending patterns through charts and statistics.',

    challenge:
      'Presenting financial data in a way that remains clear and readable on limited mobile screen space.',

    approach:
      'Applied progressive disclosure by showing high-level summaries first, with detailed breakdowns accessible through interaction.',

    solution:
      'Implemented expense charts and statistics using modern Android UI patterns with Jetpack Compose and backend integration via Supabase.',

    outcome:
      'Finote laid a strong foundation in Android development, data visualization, and mobile UI/UX best practices.',

    liveUrl: null,
    nextProjectSlug: 'pantausam'
  }
]

// Kategori untuk Filter di List Page
export const categories = ['All', 'Development', 'Mobile']

// Tahun untuk Filter di List Page
export const year = ['All', '2024', '2023']

// Ukuran default untuk floating preview image (Desktop List)
export const PREVIEW_SIZE = 400
