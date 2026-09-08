# Prompt: kumpulkan bahan studi kasus dari repo project

Cara pakai: buka sesi Claude di **repo project itu sendiri** (satu sesi satu
project), tempel seluruh isi di bawah garis sebagai pesan pertama, dan ganti
`<SLUG>` di bagian pertama dengan slug project tersebut. Keluarannya satu blok
handoff yang kamu tempel balik ke sesi portofolio.

Slug yang dipakai portofolio: `tolongin`, `exhibitly`, `engineer-coffee`,
`re-enviro`, `finote`, `pantausam`, `kalkulator-sdmk`, `spk-property-backend`,
`travel-backend`.

---

## Tugasmu

Kamu berada di dalam repo sebuah project. Portofolio pemilik repo ini punya
halaman studi kasus untuk project tersebut, dan kamu mengumpulkan bahannya dari
kode — bukan dari ingatan, bukan dari README, bukan dari nama file.

Slug project ini: `<SLUG>`

Kamu **tidak** punya akses ke repo portofolio. Jangan mencoba menulis ke sana,
jangan menjalankan perintah apa pun miliknya. Satu-satunya keluaranmu adalah
blok teks di akhir, yang akan ditempel manusia ke sesi lain.

## Aturan

1. **Setiap klaim teknis harus punya bukti file.** Kamu akan mencantumkan
   `path/file.ext:baris` untuk klaim-klaim utama di bagian bukti. Kalau sebuah
   kalimat tidak bisa kamu tunjuk sumbernya di repo ini, jangan tulis kalimat
   itu.
2. **Yang hanya diketahui pemiliknya, tulis `[ISI: pertanyaannya]`.** Nama klien
   sebenarnya, jumlah pengguna, hasil terukur, pembagian kerja tim, alasan
   project berhenti. Portofolionya otomatis melewatkan nilai yang masih memuat
   `[ISI`, jadi penanda tidak akan pernah tayang. Mengarang jauh lebih buruk
   daripada kosong.
3. **Tanpa bahasa pemasaran.** Tidak ada "seamless", "cutting-edge",
   "user-friendly", "revolusioner", "solusi menyeluruh". Kalimat lugas,
   keputusan konkret, alasan di balik pilihan. Anggap pembacanya engineer yang
   akan memeriksa reponya.
4. **Dua bahasa.** Inggris dan Indonesia, keduanya ditulis rapi. Indonesia bukan
   hasil terjemahan harfiah — susun ulang supaya wajar dibaca, isinya sama.
5. **Jangan menyentuh kode project ini.** Tugasmu membaca. Satu-satunya berkas
   yang boleh kamu buat ada di `.handoff/`, dan itu pun hanya tangkapan layar.

## Yang harus kamu baca dulu

Sebelum menulis satu kalimat pun:

- Titik masuk aplikasi dan konfigurasi rute
- Model/skema database atau migrasi
- Lapisan autentikasi dan otorisasi
- Integrasi pihak ketiga (pembayaran, penyimpanan, email, ML, peta)
- Bagian yang paling banyak logikanya — biasanya di situ letak masalah
  sebenarnya yang diselesaikan project ini
- `git log --oneline | head -40` untuk melihat urutan pembangunannya

## Keluaran

Cetak **persis** struktur di bawah, dalam satu pesan, di akhir pekerjaanmu.
Tanpa basa-basi sebelum atau sesudahnya.

### Bagian 1 — naskah

```
=== HANDOFF v1 · <SLUG> · NASKAH ===
```
diikuti satu blok kode JSON berisi objek dengan bentuk ini:

```json
{
  "shared": {
    "technologies": ["Laravel", "MySQL", "Xendit"],
    "access": "internal",
    "previewmode": "auto",
    "walkthrough": [],
    "snippets": []
  },
  "en": {
    "tagline": "",
    "client": "",
    "duration": "",
    "overview": "",
    "challenge": "",
    "approach": "",
    "solution": "",
    "contribution": "",
    "outcome": ""
  },
  "id": {
    "tagline": "",
    "client": "",
    "duration": "",
    "overview": "",
    "challenge": "",
    "approach": "",
    "solution": "",
    "contribution": "",
    "outcome": ""
  }
}
```

Isi tiap field:

| Field | Isi | Panjang |
|---|---|---|
| `tagline` | Apa produknya, dalam satu baris. Bukan slogan | ≤ 70 karakter |
| `client` | Siapa yang memakainya. `[ISI: ...]` kalau tidak jelas dari repo | pendek |
| `duration` | Rentang kerja, perkirakan dari `git log` tanggal commit pertama dan terakhir. Tulis `±2 bulan` | pendek |
| `overview` | Produknya melakukan apa, untuk siapa | 2–3 kalimat |
| `challenge` | Masalah **teknis** nyata. Bukan "membuat UI menarik". Batasan yang memaksa keputusan tertentu | 2–4 kalimat |
| `approach` | Cara masalah itu didekati, **termasuk alternatif yang tidak diambil dan alasannya** | 3–5 kalimat |
| `solution` | Yang benar-benar dibangun: komponen, lapisan, alur data. Konkret dan bernama | 3–5 kalimat |
| `contribution` | Bagian yang dikerjakan pemilik repo. Kalau ini kerja tim, sebut bagian yang bukan miliknya. `[ISI]` kalau tidak bisa dipastikan dari `git log` | 2–3 kalimat |
| `outcome` | Yang terjadi setelahnya. Tanpa angka lebih baik daripada angka karangan. `[ISI]` kalau tidak tahu | 1–3 kalimat |

Kalau project ini terdiri dari lebih dari satu repositori (mis. API dan
frontend terpisah), tambahkan `repos` di `shared`:

```json
"repos": [
  { "label": "Backend", "url": "https://github.com/pemilik/nama-api" },
  { "label": "Frontend", "url": "https://github.com/pemilik/nama-web" }
]
```

Satu repositori saja cukup dikosongkan — portofolio memakai `githuburl`.

`access` diisi salah satu: `public` (ada URL hidup yang boleh dibuka siapa
saja), `internal` (dipakai di dalam organisasi, tidak untuk umum), `archived`
(dulu tayang, sekarang tidak), atau `[ISI: internal atau archived?]` kalau tidak
bisa kamu pastikan dari repo. Jangan menebak.

### Bagian 2 — penelusuran layar (`walkthrough`)

Wajib kalau project ini punya antarmuka. Tiga sampai enam langkah, urut sesuai
alur pemakaian. Isi ke `shared.walkthrough`:

```json
[
  {
    "image": "detail-1.webp",
    "title": "Guarded routes",
    "title_id": "Rute berpenjaga",
    "body": "Satu sampai dua kalimat: layar ini melakukan apa, dan keputusan teknis apa yang ada di baliknya.",
    "body_id": "Versi Indonesianya."
  }
]
```

- `image` diisi `detail-1.webp`, `detail-2.webp`, dan seterusnya, berurutan.
  Nama itu yang akan dipakai saat media diunggah — jangan pakai nama lain.
- `body` bukan keterangan gambar. Sebutkan batasan, jebakan, atau keputusan yang
  layar itu selesaikan. Ini bagian yang membuat halaman berguna.

Kalau project ini tidak punya antarmuka sama sekali, kosongkan array-nya.

### Bagian 3 — endpoint (`snippets`)

Wajib kalau project ini berupa API atau backend. Dua sampai lima endpoint yang
paling menunjukkan isi pekerjaannya — bukan CRUD paling sepele. Isi ke
`shared.snippets`:

```json
[
  {
    "label": "Create booking",
    "label_id": "Buat pemesanan",
    "method": "post",
    "path": "/api/v1/bookings",
    "note": "Satu kalimat: kenapa endpoint ini menarik.",
    "note_id": "...",
    "request": { "package_id": 12, "travellers": 2 },
    "response": { "id": 4181, "status": "pending" }
  }
]
```

Bentuk `request` diambil dari validasi/form request yang sungguhan ada. Bentuk
`response` diambil dari resource/serializer/return statement yang sungguhan ada.
Nilai contohnya boleh karangan; **strukturnya tidak boleh**. Kalau ada rahasia
di contoh (kunci API, token), ganti dengan `"..."`.

### Bagian 4 — daftar tangkapan layar

```
=== HANDOFF v1 · <SLUG> · MEDIA ===
```

Satu tabel: nama berkas, layar/rute mana yang harus ditangkap, dan apa yang
harus terlihat di sana.

| Berkas | Rute/layar | Harus terlihat | Perlu dibersihkan |
|---|---|---|---|
| `image.webp` | `/dashboard` | Layar paling mewakili produk. Bukan halaman login | nama warga, nomor telepon |
| `detail-1.webp` | `/reports/create` | Form laporan terisi | — |

Aturan berkas:

- `image.webp` — satu, wajib, 1600×900, di bawah 5 MB. Ini poster halaman.
- `detail-N.webp` — satu per langkah walkthrough, lebar 1440, tinggi bebas.
- Aplikasi mobile: tangkapan layar perangkat 1080×2400.
- Kolom terakhir wajib diisi kalau ada nama orang, nomor, alamat, email, angka
  anggaran, atau logo instansi di layar itu. Sebutkan apa yang harus diganti
  atau diburamkan.

**Kalau kamu bisa menjalankan project ini secara lokal**, ambil sendiri
tangkapan layarnya, simpan ke `.handoff/media/` dengan nama persis seperti di
tabel, dan sebutkan di catatan bahwa berkasnya sudah ada beserta jalurnya.
Jangan commit folder itu. Kalau tidak bisa dijalankan, tabelnya saja sudah
cukup — pemilik yang akan menangkap layarnya.

### Bagian 5 — bukti

```
=== HANDOFF v1 · <SLUG> · BUKTI ===
```

Daftar pendek, satu baris per klaim utama di `challenge`, `approach`, dan
`solution`:

```
challenge  storage blob habis kuota      -> src/lib/upload.js:42
approach   upload langsung ke Cloudinary -> src/lib/cloudinary.js:15
solution   ProtectedRoute dua arah       -> src/routes/ProtectedRoute.jsx:8
```

Ini yang membuat naskahnya bisa diperiksa. Tanpa bagian ini, handoff-nya
ditolak.

### Bagian 6 — catatan dan pertanyaan

```
=== HANDOFF v1 · <SLUG> · CATATAN ===
```

- Setiap `[ISI: ...]` yang kamu pakai, kumpulkan jadi daftar pertanyaan di sini
- Hal yang kamu temukan dan mungkin belum disadari pemiliknya: rahasia yang
  ter-commit, dependensi usang bercelah, README yang tidak cocok lagi dengan
  kodenya
- Kalau repo ini ternyata tidak cocok dengan slug yang diberikan, katakan

## Yang membuat handoff ini gagal

- Ada kalimat teknis tanpa baris bukti
- Angka hasil atau nama klien muncul tanpa `[ISI]` padahal tidak ada di repo
- Indonesia terasa seperti hasil terjemahan mesin
- `request`/`response` direka, bukan dari kode
- Kode project diubah
