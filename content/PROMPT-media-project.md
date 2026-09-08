# Prompt: bikin sendiri media studi kasusnya

Dipakai **setelah** handoff naskah selesai, di sesi Claude yang sama, di dalam
repo project itu. Ganti `<SLUG>` dengan slug project.

Hasilnya berkas gambar di `.handoff/media/<SLUG>/` yang tinggal disalin ke
`media/<SLUG>/` di repo portofolio.

---

## Tugasmu

Kamu menjalankan project ini secara lokal dengan data karangan, lalu menangkap
sendiri layar-layar yang dibutuhkan halaman studi kasusnya. Bukan mengarang
gambar, bukan mockup — tangkapan layar aplikasi yang benar-benar berjalan.

Slug project ini: `<SLUG>`

## Aturan

1. **Tidak ada satu pun data asli di dalam gambar.** Semua nama, email, nomor
   telepon, NIK, alamat, foto orang, nama perusahaan, dan angka uang harus
   berasal dari data seed karangan. Kalau kamu terpaksa memakai basis data yang
   sudah ada, jangan ambil tangkapan layarnya — bikin basis data baru.
2. **Jangan pernah memakai KTP, paspor, atau foto wajah orang sungguhan**, milik
   siapa pun, termasuk pemilik repo. Untuk layar KYC, buat kartu identitas
   sintetis (HTML sederhana yang kamu render sendiri) dan pakai wajah hasil
   generator, bukan foto asli.
3. **Jangan mengubah kode project.** Boleh menambah berkas seed dan skrip
   tangkapan layar, keduanya di dalam `.handoff/`. Kalau sebuah layar hanya bisa
   dicapai dengan mengubah kode, katakan itu di catatan, jangan diam-diam
   mengubahnya.
4. **Jangan meng-commit apa pun.** Kalau perlu, kecualikan foldernya lewat
   `.git/info/exclude` — berkas itu lokal dan tidak ikut ter-commit. Jangan
   sentuh `.gitignore` yang di-track.
5. **Rahasia tidak boleh terlihat.** Token di URL, kunci API di panel jaringan,
   header Authorization — periksa sebelum menyerahkan.

## Persiapan

1. Baca README dan berkas env contoh. Catat layanan luar apa saja yang
   dibutuhkan (basis data, penyimpanan, gateway pembayaran, mesin ML).
2. Nyalakan yang bisa dinyalakan lokal. Yang butuh kredensial pihak ketiga
   biasanya bisa dilewati dengan mode sandbox atau stub — kalau tidak bisa,
   lewati layar itu dan catat alasannya.
3. Isi basis data dengan seed karangan: minimal dua akun berbeda peran, dan
   cukup baris supaya daftar tidak tampil kosong. Daftar kosong adalah gambar
   paling buruk yang bisa masuk ke portofolio — kalau sebuah layar hanya berisi
   satu baris, tambahkan lima.
4. Nama-nama karangan yang boleh dipakai: Aditya Nugroho, Sari Wulandari, Bagus
   Prasetyo, Nadia Puspita, PT Sinar Kreatif, CV Amanah Digital. Email
   `nama@contoh.id`. Nomor `0812-0000-0xxx`. NIK `3573xxxxxxxxxxxx`.

## Berkas yang harus dihasilkan

Semua ke `.handoff/media/<SLUG>/`:

| Berkas | Isi | Ukuran |
|---|---|---|
| `image.webp` | Layar paling mewakili produk. **Bukan** halaman login, bukan halaman kosong | 1600×900 |
| `detail-1.webp` … `detail-N.webp` | Satu per langkah `walkthrough` di handoff naskah, urut sama persis | lebar 1440 |

Aturan:

- WebP, kualitas 82. `image.webp` di bawah 5 MB (jauh di bawahnya kalau benar).
- Tanpa chrome peramban: tanpa bilah alamat, tanpa tab, tanpa bilah gulir.
- Satu tema saja untuk semua gambar. Kalau aplikasinya punya mode gelap dan
  terang, pilih satu dan konsisten — campuran terlihat seperti tangkapan dari
  dua produk berbeda.
- Layar yang menampilkan proses berjalan (unggah, verifikasi, penilaian)
  ditangkap saat prosesnya benar-benar tampak, bukan setelah selesai.
- Kalau sebuah langkah `walkthrough` bicara soal keadaan tertentu — terkunci,
  ditolak, antre — tangkapannya harus memperlihatkan keadaan itu. Seed datanya
  supaya keadaan itu muncul.

## Cara menangkap

Pakai Playwright headless, bukan tangkapan layar manual: hasilnya berulang,
ukurannya pasti, dan tidak ada chrome peramban yang ikut.

```bash
npm i -D playwright sharp
npx playwright install chromium
```

Simpan sebagai `.handoff/shots.mjs` dan sesuaikan:

```js
import { chromium } from 'playwright'
import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'

const SLUG = '<SLUG>'
const BASE = 'http://localhost:3000'
const OUT = `.handoff/media/${SLUG}`

// deviceScaleFactor 2 supaya teksnya tetap tajam setelah diperkecil ke lebar
// akhir. Menangkap pada 1440 lalu memperbesar akan terlihat buram.
const shots = [
  { file: 'image', path: '/dashboard', width: 1600, height: 900 },
  { file: 'detail-1', path: '/verification', width: 1440, height: 900 },
]

await mkdir(OUT, { recursive: true })

const browser = await chromium.launch()
const context = await browser.newContext({ deviceScaleFactor: 2 })
const page = await context.newPage()

// Login sekali, sesinya dipakai untuk semua tangkapan.
await page.goto(`${BASE}/login`)
await page.fill('input[name=email]', 'aditya@contoh.id')
await page.fill('input[name=password]', 'password123')
await page.click('button[type=submit]')
await page.waitForURL('**/dashboard')

for (const shot of shots) {
  await page.setViewportSize({ width: shot.width, height: shot.height })
  await page.goto(`${BASE}${shot.path}`, { waitUntil: 'networkidle' })

  // Matikan animasi dan sembunyikan apa pun yang bukan bagian dari produk.
  await page.addStyleTag({
    content: `
      *, *::before, *::after { animation: none !important; transition: none !important; }
      ::-webkit-scrollbar { display: none; }
      [data-cookie-banner], .toast, #devtools { display: none !important; }
    `,
  })
  await page.waitForTimeout(400)

  const png = await page.screenshot({ type: 'png' })
  await sharp(png).resize({ width: shot.width }).webp({ quality: 82 }).toFile(`${OUT}/${shot.file}.webp`)
  console.log(shot.file, 'ok')
}

await browser.close()
```

Untuk layar yang butuh interaksi (modal terbuka, form terisi, keadaan gagal),
tulis langkahnya di dalam loop sebelum `screenshot` — klik, isi, tunggu, baru
tangkap.

## Kalau aplikasinya mobile

Emulator Android, lalu:

```bash
adb exec-out screencap -p > .handoff/media/<SLUG>/raw-1.png
```

Ukuran perangkat 1080×2400. Sebelum diserahkan, tempelkan ke atas latar polos
selebar 1440 supaya tidak tampil sebagai pita sempit di panel penelusuran:

```js
await sharp({ create: { width: 1440, height: 1200, channels: 4, background: '#0a0a0a' } })
  .composite([{ input: await sharp('raw-1.png').resize({ height: 1100 }).toBuffer(), gravity: 'center' }])
  .webp({ quality: 82 })
  .toFile('detail-1.webp')
```

## Kalau project ini tidak punya antarmuka

API murni tidak punya layar, dan tangkapan Postman tidak memperlihatkan apa
pun. Gantinya, render sendiri gambarnya dengan Playwright dari HTML yang kamu
tulis di `.handoff/`:

- `image.webp` — diagram alur permintaan: klien, API, antrean/pekerja, basis
  data, layanan luar. Kotak dan panah sederhana, latar `#0a0a0a`, teks putih,
  font monospace. Tanpa clip art.
- `detail-N.webp` — potongan kode sungguhan dari repo ini: satu fungsi atau satu
  handler yang menjadi inti langkah tersebut, dengan pewarnaan sintaks. Sertakan
  jalur berkas di sudutnya.

Ambil kodenya apa adanya dari repo. Kalau ada rahasia di dalamnya, ganti dengan
`***` dan sebutkan di catatan.

## Sebelum menyerahkan

Periksa satu per satu, dan laporkan hasilnya:

- [ ] Tidak ada nama, email, nomor, NIK, alamat, atau foto orang sungguhan
- [ ] Tidak ada token, kunci API, atau header Authorization yang terbaca
- [ ] Tidak ada chrome peramban, bilah gulir, atau panel devtools
- [ ] Semua gambar satu tema
- [ ] Tidak ada daftar kosong atau layar setengah termuat
- [ ] Jumlah `detail-N` sama dengan jumlah langkah `walkthrough`, urutannya sama
- [ ] `image.webp` di bawah 5 MB
- [ ] Tidak ada yang ter-commit

## Keluaran

Cetak ini di akhir:

```
=== HANDOFF v1 · <SLUG> · MEDIA SIAP ===
```

- Daftar berkas beserta ukuran piksel dan besar berkasnya
- Pemetaan `detail-N.webp` ke judul langkah `walkthrough`-nya
- Layar yang gagal ditangkap beserta alasannya (butuh kredensial pihak ketiga,
  butuh perubahan kode, keadaan tidak bisa direproduksi)
- Apa saja yang kamu ganti demi kebersihan data
