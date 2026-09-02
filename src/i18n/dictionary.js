/**
 * Every string the interface renders, in both locales.
 *
 * Project copy is not here — that lives in PocketBase, with Indonesian in the
 * `_id` fields. This file covers only the shell the CMS content sits inside.
 *
 * Keep the two objects the same shape; a missing Indonesian key renders
 * undefined rather than falling back, and that is deliberate — a silent
 * fallback hides the gap until a visitor finds it.
 */

export const dictionary = {
  en: {
    nav: {
      home: 'Home',
      work: 'Work',
      contact: 'Contact',
      primary: 'Primary',
      homeAria: 'Faidz Agustiawan — home',
      logo: 'Code by Faidz Agustiawan',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      skip: 'Skip to content',
    },

    language: {
      label: 'Language',
      switchTo: 'Baca dalam Bahasa Indonesia',
      short: 'EN',
      other: 'ID',
    },

    home: {
      seoTitle: 'Home',
      h1: 'Faidz Agustiawan — full-stack developer in Malang, Indonesia',
      role: ['Full-Stack', 'Developer'],
      portraitAlt: 'Faidz Agustiawan, arms folded, wearing a navy blazer',
      located: 'Located in Indonesia',
      introEyebrow: 'Introduction',
      introTitle: 'Interaction',
      introTitleAccent: 'Motion & Performance',
      introBody: [
        "I'm Faidz Agustiawan, a full-stack developer based in Malang, Indonesia, currently finishing an Information Systems degree. My work is mostly JavaScript, taking web applications from a blank file to a live deployment.",
        'I handle the whole lifecycle — designing the database, writing the server logic, and managing the deployment for real users. Owning a product end to end is the part I enjoy: it means the backend can actually support the features I want to build.',
        'Even deep in server logic, I never treat the frontend as an afterthought. I work primarily with React and still spend hours tweaking spring physics and micro-interactions. Complex system or simple landing page, I build software that is fast, reliable, and enjoyable to use.',
      ],
      introName: 'Faidz Agustiawan',
      stackAria: 'Tools and technologies',
      showcaseTitle: 'Selected Work',
      showcaseCta: 'Discover my work',
      ctaHeading: "Let's build something meaningful.",
      ctaButton: 'Contact Me',
    },

    work: {
      seoTitle: 'Selected Work',
      seoDescription:
        'Web and mobile projects by Faidz Agustiawan — full-stack builds, frontend experiments, and the reasoning behind each one.',
      eyebrow: 'Selected Projects',
      heading: 'Work',
      intro:
        'Web and mobile products I have shipped end to end — the database and server logic behind them, and the motion and interaction on top.',
      searchLabel: 'Search projects',
      searchPlaceholder: 'Search by name, tagline, or technology…',
      clearSearch: 'Clear search',
      filterType: 'Project type',
      filterYear: 'Year',
      all: 'All',
      showing: (count) => `Showing ${count} project${count === 1 ? '' : 's'}`,
      clearFilters: 'Clear all filters',
      loading: 'Loading projects…',
      feedError: 'The project feed did not load.',
      retry: 'Try again',
      emptyFiltered: 'No projects match those filters yet.',
      emptyAll: 'No projects published yet.',
      projectsAria: 'Projects',
      stats: { projects: 'Projects', project: 'Project', technologies: 'Technologies', years: 'Years building' },
    },

    detail: {
      loading: 'Loading project…',
      notFoundTitle: 'Project not found',
      notFoundBody: 'That project does not exist, or it has been unpublished.',
      notFoundFeedError: 'The project feed did not load, so this page cannot be shown right now.',
      back: 'Back to work',
      role: 'Role',
      year: 'Year',
      client: 'Client',
      duration: 'Duration',
      technologiesUsed: 'Technologies used',
      sections: {
        overview: ['Overview', 'Project context'],
        challenge: ['Challenge', 'The problem'],
        approach: ['Approach', 'My process'],
        solution: ['Solution', 'The build'],
        contribution: ['My contribution', 'What I did'],
        team: ['Team', 'The people behind it'],
        outcome: ['Outcome', 'The result'],
      },
      visualEyebrow: 'Visual details',
      visualHeading: 'Project highlights',
      detailAlt: (name, i) => `${name} — detail ${i}`,
      previewAlt: (name) => `${name} — project preview`,
      noPreviewAlt: (name) => `${name} — no preview image yet`,
      viewLive: 'View live project',
      viewSource: 'View source',
      nextProject: 'Next project',
      modal: {
        title: 'No public deployment',
        body: (name) =>
          `${name} is not hosted at a public URL right now. I can walk you through it directly, or share access on request.`,
        cta: 'Ask me about it',
        dismiss: 'Keep browsing',
        close: 'Close dialog',
      },
    },

    contact: {
      seoTitle: 'Contact',
      seoDescription:
        'Get in touch with Faidz Agustiawan about freelance work, collaborations, or a role.',
      heading: ["Let's build", 'something together'],
      blurb: ['Interested in working together? Use the form or email me directly.', "I'm currently", 'available', 'for freelance work.'],
      availableWord: 'available',
      location: 'Malang, ID',
      localSuffix: 'local',
      connect: 'Connect',
      email: 'Email',
      downloadResume: 'Download resume',
      form: {
        name: 'Your name',
        namePlaceholder: 'Jane Doe',
        email: 'Your email',
        emailPlaceholder: 'jane@example.com',
        subject: 'Project or subject',
        subjectPlaceholder: 'Website redesign, collaboration, a role',
        message: 'Message',
        messagePlaceholder: 'Tell me about your project…',
        submit: 'Send message',
        sending: 'Sending…',
        honeypot: 'Leave this field empty',
        successTitle: 'Message sent',
        successBody: "Thanks for reaching out. I'll get back to you soon.",
        again: 'Send another message',
        notConfigured: 'The contact form is not configured. Please email me directly.',
        failed: 'Something went wrong sending that. Please email me directly.',
      },
    },

    notFound: {
      seoTitle: 'Page not found',
      seoDescription: 'That page does not exist.',
      heading: 'Page not found',
      body: "The page you're looking for doesn't exist — or it was never meant to be found.",
      home: 'Go home',
      work: 'See the work',
    },

    footer: {
      credit: (year) => `© ${year} Faidz Agustiawan. Built with React and Tailwind CSS.`,
      socialAria: 'Social links',
    },

    cv: {
      download: 'Download resume',
      downloadFull: 'Download resume (PDF)',
      hide: 'Hide the resume shortcut',
    },

    common: {
      loadingPage: 'Loading page',
    },

    categories: {
      'Web Application': 'Web Application',
      Mobile: 'Mobile',
      'Landing Page': 'Landing Page',
      'AI/ML': 'AI/ML',
    },
  },

  id: {
    nav: {
      home: 'Beranda',
      work: 'Karya',
      contact: 'Kontak',
      primary: 'Utama',
      homeAria: 'Faidz Agustiawan — beranda',
      logo: 'Code by Faidz Agustiawan',
      openMenu: 'Buka menu',
      closeMenu: 'Tutup menu',
      skip: 'Lompat ke konten',
    },

    language: {
      label: 'Bahasa',
      switchTo: 'Read in English',
      short: 'ID',
      other: 'EN',
    },

    home: {
      seoTitle: 'Beranda',
      h1: 'Faidz Agustiawan — full-stack developer di Malang, Indonesia',
      role: ['Full-Stack', 'Developer'],
      portraitAlt: 'Faidz Agustiawan, bersedekap, mengenakan jas biru dongker',
      located: 'Berbasis di Indonesia',
      introEyebrow: 'Perkenalan',
      introTitle: 'Interaksi',
      introTitleAccent: 'Gerak & Performa',
      introBody: [
        'Saya Faidz Agustiawan, full-stack developer yang berbasis di Malang dan sedang menyelesaikan studi Sistem Informasi. Pekerjaan saya sebagian besar JavaScript, membawa aplikasi web dari berkas kosong sampai tayang.',
        'Saya menangani seluruh siklusnya — merancang basis data, menulis logika server, dan mengurus deployment untuk pengguna sungguhan. Memegang produk dari hulu ke hilir adalah bagian yang saya nikmati: artinya backend-nya benar-benar sanggup menopang fitur yang ingin saya bangun.',
        'Sedalam apa pun masuk ke logika server, frontend tidak pernah saya anggap belakangan. Saya bekerja terutama dengan React dan masih betah berjam-jam menyetel spring physics dan interaksi kecil. Sistem rumit atau landing page sederhana, saya membangun perangkat lunak yang cepat, andal, dan enak dipakai.',
      ],
      introName: 'Faidz Agustiawan',
      stackAria: 'Perkakas dan teknologi',
      showcaseTitle: 'Karya Pilihan',
      showcaseCta: 'Lihat karya saya',
      ctaHeading: 'Mari bangun sesuatu yang berarti.',
      ctaButton: 'Hubungi Saya',
    },

    work: {
      seoTitle: 'Karya Pilihan',
      seoDescription:
        'Proyek web dan mobile oleh Faidz Agustiawan — bangunan full-stack, eksperimen frontend, dan alasan di balik tiap keputusannya.',
      eyebrow: 'Proyek Pilihan',
      heading: 'Karya',
      intro:
        'Produk web dan mobile yang saya kerjakan dari hulu ke hilir — basis data dan logika server di belakangnya, gerak dan interaksi di atasnya.',
      searchLabel: 'Cari proyek',
      searchPlaceholder: 'Cari berdasarkan nama, tagline, atau teknologi…',
      clearSearch: 'Bersihkan pencarian',
      filterType: 'Jenis proyek',
      filterYear: 'Tahun',
      all: 'Semua',
      showing: (count) => `Menampilkan ${count} proyek`,
      clearFilters: 'Bersihkan semua filter',
      loading: 'Memuat proyek…',
      feedError: 'Daftar proyek gagal dimuat.',
      retry: 'Coba lagi',
      emptyFiltered: 'Belum ada proyek yang cocok dengan filter itu.',
      emptyAll: 'Belum ada proyek yang ditayangkan.',
      projectsAria: 'Proyek',
      stats: { projects: 'Proyek', project: 'Proyek', technologies: 'Teknologi', years: 'Tahun berkarya' },
    },

    detail: {
      loading: 'Memuat proyek…',
      notFoundTitle: 'Proyek tidak ditemukan',
      notFoundBody: 'Proyek itu tidak ada, atau sudah tidak ditayangkan.',
      notFoundFeedError: 'Daftar proyek gagal dimuat, jadi halaman ini belum bisa ditampilkan.',
      back: 'Kembali ke karya',
      role: 'Peran',
      year: 'Tahun',
      client: 'Klien',
      duration: 'Durasi',
      technologiesUsed: 'Teknologi yang dipakai',
      sections: {
        overview: ['Ringkasan', 'Konteks proyek'],
        challenge: ['Tantangan', 'Masalahnya'],
        approach: ['Pendekatan', 'Cara saya'],
        solution: ['Solusi', 'Yang dibangun'],
        contribution: ['Kontribusi saya', 'Yang saya kerjakan'],
        team: ['Tim', 'Orang di baliknya'],
        outcome: ['Hasil', 'Yang terjadi'],
      },
      visualEyebrow: 'Detail visual',
      visualHeading: 'Sorotan proyek',
      detailAlt: (name, i) => `${name} — detail ${i}`,
      previewAlt: (name) => `${name} — pratinjau proyek`,
      noPreviewAlt: (name) => `${name} — belum ada gambar pratinjau`,
      viewLive: 'Lihat proyek langsung',
      viewSource: 'Lihat kode sumber',
      nextProject: 'Proyek berikutnya',
      modal: {
        title: 'Belum ada versi publik',
        body: (name) =>
          `${name} belum ditayangkan di URL publik. Saya bisa menjelaskannya langsung, atau memberi akses kalau diminta.`,
        cta: 'Tanya saya soal ini',
        dismiss: 'Lanjut menjelajah',
        close: 'Tutup dialog',
      },
    },

    contact: {
      seoTitle: 'Kontak',
      seoDescription:
        'Hubungi Faidz Agustiawan untuk pekerjaan lepas, kolaborasi, atau posisi kerja.',
      heading: ['Mari bangun', 'sesuatu bersama'],
      blurb: ['Tertarik bekerja sama? Pakai formulir ini atau kirim email langsung.', 'Saat ini saya', 'tersedia', 'untuk pekerjaan lepas.'],
      availableWord: 'tersedia',
      location: 'Malang, ID',
      localSuffix: 'waktu setempat',
      connect: 'Terhubung',
      email: 'Email',
      downloadResume: 'Unduh CV',
      form: {
        name: 'Nama kamu',
        namePlaceholder: 'Budi Santoso',
        email: 'Email kamu',
        emailPlaceholder: 'budi@contoh.com',
        subject: 'Proyek atau perihal',
        subjectPlaceholder: 'Perombakan situs, kolaborasi, tawaran kerja',
        message: 'Pesan',
        messagePlaceholder: 'Ceritakan proyekmu…',
        submit: 'Kirim pesan',
        sending: 'Mengirim…',
        honeypot: 'Biarkan kolom ini kosong',
        successTitle: 'Pesan terkirim',
        successBody: 'Terima kasih sudah menghubungi. Saya akan segera membalas.',
        again: 'Kirim pesan lagi',
        notConfigured: 'Formulir kontak belum terkonfigurasi. Silakan kirim email langsung.',
        failed: 'Ada yang salah saat mengirim. Silakan kirim email langsung.',
      },
    },

    notFound: {
      seoTitle: 'Halaman tidak ditemukan',
      seoDescription: 'Halaman itu tidak ada.',
      heading: 'Halaman tidak ditemukan',
      body: 'Halaman yang kamu cari tidak ada — atau memang tidak pernah dimaksudkan untuk ditemukan.',
      home: 'Ke beranda',
      work: 'Lihat karya',
    },

    footer: {
      credit: (year) => `© ${year} Faidz Agustiawan. Dibangun dengan React dan Tailwind CSS.`,
      socialAria: 'Tautan sosial',
    },

    cv: {
      download: 'Unduh CV',
      downloadFull: 'Unduh CV (PDF)',
      hide: 'Sembunyikan pintasan CV',
    },

    common: {
      loadingPage: 'Memuat halaman',
    },

    // Category values come from the CMS in English and are also the filter
    // keys, so they are translated for display only — never for comparison.
    categories: {
      'Web Application': 'Aplikasi Web',
      Mobile: 'Mobile',
      'Landing Page': 'Landing Page',
      'AI/ML': 'AI/ML',
    },
  },
}
