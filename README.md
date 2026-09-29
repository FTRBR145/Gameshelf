# GameShelf

Katalog unduhan game statis berbasis HTML, CSS, dan JavaScript biasa. File game tetap berada di Google Drive; situs ini hanya membuka tautannya.

## Menjalankan lokal

Jalankan server statis dari folder proyek, misalnya `python -m http.server 8000`, lalu buka `http://localhost:8000`.

## Menambah game

Tambahkan objek baru ke daftar `window.GAMES` di `assets/games.js`. Ikuti tipe JSDoc `Game` dan `GameFile` di bagian atas berkas. Kartu katalog dan halaman `game.html?game=slug` dibuat otomatis dari daftar tersebut. Simpan ilustrasi di `assets/` dan isi path relatifnya pada properti `artwork`.

## GitHub Pages

Unggah isi folder ini ke repositori GitHub publik. Pada **Settings → Pages**, pilih **Deploy from a branch**, branch **main**, folder **/(root)**. Situs akan tersedia di `https://NAMA-PENGGUNA.github.io/NAMA-REPOSITORI/` setelah proses Pages selesai.
