
"use strict";

/* =========================================
   1. DATA MAKANAN DAN MINUMAN
   ========================================= */

// Data menu disimpan dalam array.
// Untuk menambah menu, salin salah satu objek
// lalu ubah nama, harga, kategori, dan datanya.

const daftarMenu = [
    {
        nama: "Nasi Goreng Spesial",
        harga: 18000,
        kategori: "Makanan",
        deskripsi: "Nasi goreng dengan telur dan sayuran.",
        gambar: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&auto=format&fit=crop&q=80",
        tersedia: true
    },
    {
        nama: "Chicken Burger",
        harga: 20000,
        kategori: "Makanan",
        deskripsi: "Burger ayam dengan sayuran dan saus.",
        gambar: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80",
        tersedia: true
    },
    {
        nama: "Pizza Keju",
        harga: 25000,
        kategori: "Makanan",
        deskripsi: "Pizza dengan keju yang lezat.",
        gambar: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80",
        tersedia: false
    },
    {
        nama: "Kentang Goreng",
        harga: 12000,
        kategori: "Camilan",
        deskripsi: "Kentang goreng renyah dengan saus.",
        gambar: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&auto=format&fit=crop&q=80",
        tersedia: true
    },
    {
        nama: "Roti Panggang",
        harga: 14000,
        kategori: "Camilan",
        deskripsi: "Roti panggang dengan cokelat.",
        gambar: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&auto=format&fit=crop&q=80",
        tersedia: true
    },
    {
        nama: "Es Teh Manis",
        harga: 5000,
        kategori: "Minuman",
        deskripsi: "Teh segar dengan tambahan es.",
        gambar: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&auto=format&fit=crop&q=80",
        tersedia: true
    },
    {
        nama: "Es Kopi Susu",
        harga: 15000,
        kategori: "Minuman",
        deskripsi: "Kombinasi kopi, susu, dan gula.",
        gambar: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&auto=format&fit=crop&q=80",
        tersedia: true
    },
    {
        nama: "Jus Stroberi",
        harga: 12000,
        kategori: "Minuman",
        deskripsi: "Minuman stroberi yang segar.",
        gambar: "https://images.unsplash.com/photo-1546173159-315724a31696?w=600&auto=format&fit=crop&q=80",
        tersedia: false
    },
    {
        nama: "Salad Buah",
        harga: 16000,
        kategori: "Camilan",
        deskripsi: "Potongan buah dengan saus yoghurt.",
        gambar: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop&q=80",
        tersedia: true
    }
];


/* =========================================
   2. MENGAMBIL ELEMEN DARI HTML
   ========================================= */

// JavaScript mengambil elemen berdasarkan ID
// yang sudah dibuat di file index.html.

const menuGrid = document.getElementById("menuGrid");
const searchInput = document.getElementById("searchInput");
const categoryButtons = document.getElementById("categoryButtons");
const resultCount = document.getElementById("resultCount");
const emptyMessage = document.getElementById("emptyMessage");

// Kategori awal yang dipilih adalah Semua.
let kategoriAktif = "Semua";


/* =========================================
   3. MENGUBAH ANGKA MENJADI HARGA RUPIAH
   ========================================= */

function formatRupiah(angka) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(angka);
}


/* =========================================
   4. MEMBUAT TOMBOL KATEGORI
   ========================================= */

function buatKategori() {

    // Mengambil kategori yang berbeda dari data menu.
    const kategoriUnik = [
        "Semua",
        ...new Set(daftarMenu.map(menu => menu.kategori))
    ];

    // Menghapus tombol lama sebelum membuat tombol baru.
    categoryButtons.replaceChildren();

    // Membuat satu tombol untuk setiap kategori.
    kategoriUnik.forEach(kategori => {

        const tombol = document.createElement("button");

        tombol.type = "button";
        tombol.className = "category-btn";
        tombol.textContent = kategori;

        // Menandai tombol kategori yang sedang aktif.
        if (kategori === kategoriAktif) {
            tombol.classList.add("active");
        }

        // Menjalankan fungsi ketika tombol diklik.
        tombol.addEventListener("click", function () {

            kategoriAktif = kategori;

            // Memperbarui warna tombol aktif.
            buatKategori();

            // Menampilkan menu sesuai kategori.
            tampilkanMenu();
        });

        // Memasukkan tombol ke dalam HTML.
        categoryButtons.appendChild(tombol);
    });
}


/* =========================================
   5. MENAMPILKAN MENU DI WEBSITE
   ========================================= */

function tampilkanMenu() {

    // Mengambil teks pencarian dan mengubahnya
    // menjadi huruf kecil agar mudah dibandingkan.
    const kataKunci = searchInput.value
        .trim()
        .toLowerCase();

    // Menyaring menu berdasarkan pencarian
    // dan kategori yang dipilih.
    const menuTerpilih = daftarMenu.filter(menu => {

        const teksMenu = (
            menu.nama + " " +
            menu.deskripsi + " " +
            menu.kategori
        ).toLowerCase();

        const cocokPencarian = teksMenu.includes(kataKunci);

        const cocokKategori =
            kategoriAktif === "Semua" ||
            menu.kategori === kategoriAktif;

        return cocokPencarian && cocokKategori;
    });

    // Mengosongkan daftar sebelum menampilkan hasil baru.
    menuGrid.replaceChildren();

    // Memperbarui jumlah hasil pencarian.
    resultCount.textContent =
        "Menampilkan " + menuTerpilih.length + " menu";

    // Menampilkan pesan jika tidak ada menu yang cocok.
    if (menuTerpilih.length === 0) {
        emptyMessage.style.display = "block";
        return;
    }

    emptyMessage.style.display = "none";


    /* =====================================
       6. MEMBUAT KARTU UNTUK SETIAP MENU
       ===================================== */

    menuTerpilih.forEach(menu => {

        // Membuat kartu utama.
        const kartu = document.createElement("article");
        kartu.className = "menu-card";

        // Membuat gambar menu.
        const gambar = document.createElement("img");
        gambar.className = "menu-image";
        gambar.src = menu.gambar;
        gambar.alt = menu.nama;
        gambar.loading = "lazy";

        // Menampilkan gambar pengganti
        // jika gambar utama gagal dimuat.
        gambar.onerror = function () {
            this.onerror = null;
            this.src =
                "https://placehold.co/600x400/e8ece6/26352c?text=Foto+Menu";
        };

        // Membuat bagian informasi menu.
        const info = document.createElement("div");
        info.className = "menu-info";

        // Menampilkan kategori.
        const kategori = document.createElement("p");
        kategori.className = "menu-category";
        kategori.textContent = menu.kategori;

        // Menampilkan nama makanan atau minuman.
        const nama = document.createElement("h3");
        nama.textContent = menu.nama;

        // Menampilkan deskripsi.
        const deskripsi = document.createElement("p");
        deskripsi.className = "menu-description";
        deskripsi.textContent = menu.deskripsi;

        // Membuat bagian harga dan status.
        const bagianBawah = document.createElement("div");
        bagianBawah.className = "menu-bottom";

        // Menampilkan harga dalam format rupiah.
        const harga = document.createElement("span");
        harga.className = "menu-price";
        harga.textContent = formatRupiah(menu.harga);

        // Menentukan status berdasarkan data menu.
        const status = document.createElement("span");

        status.className = menu.tersedia
            ? "status available"
            : "status sold-out";

        status.textContent = menu.tersedia
            ? "Tersedia"
            : "Habis";

        // Menyusun harga dan status ke dalam satu bagian.
        bagianBawah.append(harga, status);

        // Menyusun semua informasi ke dalam kartu.
        info.append(
            kategori,
            nama,
            deskripsi,
            bagianBawah
        );

        // Menyusun gambar dan informasi kartu.
        kartu.append(gambar, info);

        // Memasukkan kartu ke halaman website.
        menuGrid.appendChild(kartu);
    });
}


/* =========================================
   7. MENJALANKAN PENCARIAN OTOMATIS
   ========================================= */

// Setiap kali pelanggan mengetik,
// daftar menu akan diperbarui secara otomatis.

searchInput.addEventListener("input", tampilkanMenu);


/* =========================================
   8. MENJALANKAN WEBSITE SAAT DIBUKA
   ========================================= */

// Membuat tombol kategori terlebih dahulu.
buatKategori();

// Menampilkan semua menu saat halaman pertama dibuka.
tampilkanMenu();
