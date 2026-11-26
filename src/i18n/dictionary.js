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
      seoTitle: 'Full-Stack Developer in Malang, Indonesia',
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
      viewDemo: 'Open the demo',
      viewSource: 'View source',
      sourceOnRequest: 'Source available on request',
      nextProject: 'Next project',

      preview: {
        liveLabel: 'Live site',
        demoLabel: 'Demo — dummy data',
        sandboxLabel: 'Interactive demo — dummy data',
        load: 'Open the preview',
        loadHint: 'Opens over this page. Nothing you do in there leaves your browser.',
        mobileHint: 'The interface is built for a wider screen, so it opens in its own tab.',
        newTab: 'Open in a new tab',
        reset: 'Reset',
        close: 'Close the preview',
        blockedHint: 'Some sites refuse to be framed. If nothing appears,',
        frameTitle: (name) => `${name}, running inside this page`,
        sandboxLoad: 'Start the demo',
        sandboxLoading: 'Starting…',
        sandboxHint: 'Every control works. The data is invented and resets when you reload.',
        sandboxError: 'The demo failed to load. Try reloading the page.',
      },

      tour: {
        eyebrow: 'Walkthrough',
        heading: 'How it works, screen by screen',
        listLabel: 'Walkthrough steps',
        stepAlt: (i) => `Walkthrough step ${i}`,
      },

      snippets: {
        eyebrow: 'The API',
        heading: 'What goes in, what comes back',
        listLabel: 'Endpoints',
        request: 'Request',
        response: 'Response',
        copy: 'Copy',
        copied: 'Copied',
      },

      access: {
        cta: 'Ask for a walkthrough',
        public: {
          title: 'Publicly available',
          body: 'Open it yourself, or preview it here without leaving the page.',
        },
        demo: {
          title: 'Demo environment',
          body: 'A copy of the real build running on invented data. Nothing you change is saved.',
        },
        internal: {
          title: 'Internal system — not publicly accessible',
          body: 'It runs inside an organisation, so there is no URL to hand out. The walkthrough below covers the flows in full.',
        },
        archived: {
          title: 'No longer deployed',
          body: 'The site has been retired, so the walkthrough below is what remains of it.',
        },
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
      seoTitle: 'Full-Stack Developer di Malang, Indonesia',
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
      viewDemo: 'Buka demonya',
      viewSource: 'Lihat kode sumber',
      sourceOnRequest: 'Kode sumber bisa diberikan kalau diminta',
      nextProject: 'Proyek berikutnya',

      preview: {
        liveLabel: 'Situs langsung',
        demoLabel: 'Demo — data contoh',
        sandboxLabel: 'Demo interaktif — data contoh',
        load: 'Buka pratinjaunya',
        loadHint: 'Terbuka menutupi halaman ini. Apa pun yang kamu lakukan di dalamnya tidak keluar dari peramban.',
        mobileHint: 'Antarmukanya dirancang untuk layar lebar, jadi dibuka di tab sendiri.',
        newTab: 'Buka di tab baru',
        reset: 'Ulang',
        close: 'Tutup pratinjau',
        blockedHint: 'Sebagian situs menolak dibingkai. Kalau tidak ada yang muncul,',
        frameTitle: (name) => `${name}, berjalan di dalam halaman ini`,
        sandboxLoad: 'Mulai demo',
        sandboxLoading: 'Menyiapkan…',
        sandboxHint: 'Semua kontrolnya berfungsi. Datanya karangan dan kembali seperti semula begitu dimuat ulang.',
        sandboxError: 'Demo gagal dimuat. Coba muat ulang halamannya.',
      },

      tour: {
        eyebrow: 'Penelusuran',
        heading: 'Cara kerjanya, layar demi layar',
        listLabel: 'Langkah penelusuran',
        stepAlt: (i) => `Langkah penelusuran ${i}`,
      },

      snippets: {
        eyebrow: 'API-nya',
        heading: 'Apa yang masuk, apa yang kembali',
        listLabel: 'Endpoint',
        request: 'Permintaan',
        response: 'Balasan',
        copy: 'Salin',
        copied: 'Tersalin',
      },

      access: {
        cta: 'Minta dijelaskan',
        public: {
          title: 'Terbuka untuk umum',
          body: 'Buka sendiri, atau lihat pratinjaunya di sini tanpa meninggalkan halaman.',
        },
        demo: {
          title: 'Lingkungan demo',
          body: 'Salinan build aslinya yang berjalan dengan data karangan. Apa pun yang kamu ubah tidak tersimpan.',
        },
        internal: {
          title: 'Sistem internal — tidak bisa diakses umum',
          body: 'Dipakai di dalam organisasi, jadi tidak ada URL yang bisa dibagikan. Penelusuran di bawah memuat seluruh alurnya.',
        },
        archived: {
          title: 'Sudah tidak ditayangkan',
          body: 'Situsnya sudah dipensiunkan, jadi penelusuran di bawah inilah yang tersisa.',
        },
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
