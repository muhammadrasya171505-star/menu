
"use strict";

/* =========================================
   1. DATA MENU (DATABASE SEMENTARA)
   =========================================
   Tambahkan atau ubah menu di bagian ini.
   true = tersedia, false = habis.
*/

const databaseMenu = [
    {
        id: 1,
        nama: "Nasi Goreng Spesial",
        harga: 18000,
        kategori: "Makanan",
        deskripsi: "Nasi goreng dengan telur dan sayuran.",
        gambar: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&auto=format&fit=crop&q=80",
        tersedia: true
    },
    {
        id: 2,
        nama: "Chicken Burger",
        harga: 20000,
        kategori: "Makanan",
        deskripsi: "Burger ayam dengan sayuran dan saus.",
        gambar: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80",
        tersedia: true
    },
    {
        id: 3,
        nama: "Pizza Keju",
        harga: 25000,
        kategori: "Makanan",
        deskripsi: "Pizza dengan keju yang lezat.",
        gambar: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80",
        tersedia: false
    },
    {
        id: 4,
        nama: "Kentang Goreng",
        harga: 12000,
        kategori: "Camilan",
        deskripsi: "Kentang goreng renyah dengan saus.",
        gambar: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&auto=format&fit=crop&q=80",
        tersedia: true
    },
    {
        id: 5,
        nama: "Roti Panggang",
        harga: 14000,
        kategori: "Camilan",
        deskripsi: "Roti panggang dengan cokelat.",
        gambar: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&auto=format&fit=crop&q=80",
        tersedia: true
    },
    {
        id: 6,
        nama: "Es Teh Manis",
        harga: 5000,
        kategori: "Minuman",
        deskripsi: "Teh segar dengan tambahan es.",
        gambar: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&auto=format&fit=crop&q=80",
        tersedia: true
    },
    {
        id: 7,
        nama: "Es Kopi Susu",
        harga: 15000,
        kategori: "Minuman",
        deskripsi: "Kombinasi kopi, susu, dan gula.",
        gambar: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&auto=format&fit=crop&q=80",
        tersedia: true
    },
    {
        id: 8,
        nama: "Jus Stroberi",
        harga: 12000,
        kategori: "Minuman",
        deskripsi: "Minuman stroberi yang segar.",
        gambar: "https://images.unsplash.com/photo-1546173159-315724a31696?w=600&auto=format&fit=crop&q=80",
        tersedia: false
    },
    {
        id: 9,
        nama: "Salad Buah",
        harga: 16000,
        kategori: "Camilan",
        deskripsi: "Potongan buah dengan saus yoghurt.",
        gambar: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop&q=80",
        tersedia: true
    }
];


/* =========================================
   2. NOMOR WHATSAPP KASIR
   =========================================
   GANTI nomor di bawah dengan nomor kasir sebenarnya.
   Format Indonesia: 62 diikuti nomor, tanpa + atau spasi.
   Contoh format: 6281234567890
*/

const NOMOR_WA_KASIR = "GANTI_DENGAN_NOMOR_KASIR";


/* =========================================
   3. MENGAMBIL ELEMEN DARI HTML
   ========================================= */

const menuGrid = document.getElementById("menuGrid");
const searchInput = document.getElementById("searchInput");
const categoryButtons = document.getElementById("categoryButtons");
const resultCount = document.getElementById("resultCount");
const emptyMessage = document.getElementById("emptyMessage");

const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const customerName = document.getElementById("customerName");
const tableNumber = document.getElementById("tableNumber");
const clearCartButton = document.getElementById("clearCart");
const sendOrderButton = document.getElementById("sendOrder");

// Menyimpan kategori yang sedang dipilih.
let kategoriAktif = "Semua";

// Keranjang pesanan sementara.
const keranjang = [];


/* =========================================
   4. FORMAT HARGA RUPIAH
   ========================================= */

function formatRupiah(angka) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(angka);
}


/* =========================================
   5. MEMBUAT TOMBOL KATEGORI
   ========================================= */

function tampilkanKategori() {

    // Membuat daftar kategori tanpa duplikat.
    const daftarKategori = [
        "Semua",
        ...new Set(databaseMenu.map(menu => menu.kategori))
    ];

    categoryButtons.replaceChildren();

    daftarKategori.forEach(namaKategori => {
        const tombol = document.createElement("button");

        tombol.type = "button";
        tombol.className = "category-btn";
        tombol.textContent = namaKategori;

        if (namaKategori === kategoriAktif) {
            tombol.classList.add("active");
        }

        tombol.addEventListener("click", function () {
            kategoriAktif = namaKategori;

            tampilkanKategori();
            tampilkanMenu();
        });

        categoryButtons.appendChild(tombol);
    });
}


/* =========================================
   6. MEMBUAT KARTU MENU
   ========================================= */

function buatKartuMenu(menu) {

    const kartu = document.createElement("article");
    kartu.className = "menu-card";

    // Gambar makanan.
    const gambar = document.createElement("img");
    gambar.className = "menu-image";
    gambar.src = menu.gambar;
    gambar.alt = menu.nama;
    gambar.loading = "lazy";

    // Gambar pengganti jika foto gagal dimuat.
    gambar.onerror = function () {
        this.onerror = null;
        this.src =
            "https://placehold.co/600x400/e8ece6/26352c?text=Foto+Menu";
    };

    // Informasi menu.
    const info = document.createElement("div");
    info.className = "menu-info";

    const kategori = document.createElement("p");
    kategori.className = "menu-category";
    kategori.textContent = menu.kategori;

    const nama = document.createElement("h3");
    nama.textContent = menu.nama;

    const deskripsi = document.createElement("p");
    deskripsi.className = "menu-description";
    deskripsi.textContent = menu.deskripsi;

    // Harga dan status.
    const bagianBawah = document.createElement("div");
    bagianBawah.className = "menu-bottom";

    const harga = document.createElement("span");
    harga.className = "menu-price";
    harga.textContent = formatRupiah(menu.harga);

    const status = document.createElement("span");

    status.className = menu.tersedia
        ? "status available"
        : "status sold-out";

    status.textContent = menu.tersedia
        ? "Tersedia"
        : "Habis";

    bagianBawah.append(harga, status);

    // Tombol menambahkan menu ke keranjang.
    const tombolTambah = document.createElement("button");

    tombolTambah.type = "button";
    tombolTambah.className = "add-to-cart";

    tombolTambah.textContent = menu.tersedia
        ? "Tambah ke Pesanan"
        : "Menu Habis";

    tombolTambah.disabled = !menu.tersedia;

    tombolTambah.addEventListener("click", function () {
        tambahKeKeranjang(menu);
    });

    // Menyusun seluruh bagian kartu.
    info.append(
        kategori,
        nama,
        deskripsi,
        bagianBawah,
        tombolTambah
    );

    kartu.append(gambar, info);

    return kartu;
}


/* =========================================
   7. PENCARIAN DAN FILTER MENU
   ========================================= */

function tampilkanMenu() {

    const kataKunci = searchInput.value
        .trim()
        .toLowerCase();

    // Menyeleksi menu yang cocok dengan pencarian.
    const hasilMenu = databaseMenu.filter(menu => {

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

    menuGrid.replaceChildren();

    resultCount.textContent =
        "Menampilkan " + hasilMenu.length + " menu";

    emptyMessage.hidden = hasilMenu.length !== 0;

    // Menampilkan kartu yang sesuai.
    hasilMenu.forEach(menu => {
        menuGrid.appendChild(buatKartuMenu(menu));
    });
}

// Pencarian bekerja setiap kali pelanggan mengetik.
searchInput.addEventListener("input", tampilkanMenu);


/* =========================================
   8. MENAMBAHKAN MENU KE KERANJANG
   ========================================= */

function tambahKeKeranjang(menu) {

    if (!menu.tersedia) {
        alert("Maaf, menu ini sedang habis.");
        return;
    }

    // Memeriksa apakah menu sudah ada di keranjang.
    const itemAda = keranjang.find(
        item => item.id === menu.id
    );

    if (itemAda) {
        itemAda.jumlah += 1;
    } else {
        keranjang.push({
            id: menu.id,
            nama: menu.nama,
            harga: menu.harga,
            jumlah: 1
        });
    }

    tampilkanKeranjang();
}


/* =========================================
   9. MENAMPILKAN KERANJANG DAN TOTAL HARGA
   ========================================= */

function tampilkanKeranjang() {

    cartItems.replaceChildren();

    // Jika keranjang masih kosong.
    if (keranjang.length === 0) {
        const pesanKosong = document.createElement("p");

        pesanKosong.className = "empty-cart-text";
        pesanKosong.textContent =
            "Keranjang masih kosong. Silakan pilih menu.";

        cartItems.appendChild(pesanKosong);

        cartTotal.textContent =
            "Total: " + formatRupiah(0);

        return;
    }

    // Menampilkan setiap menu pesanan.
    keranjang.forEach(item => {

        const baris = document.createElement("div");
        baris.className = "cart-item";

        const info = document.createElement("div");
        info.className = "cart-item-info";

        const nama = document.createElement("strong");
        nama.textContent = item.nama;

        const rincian = document.createElement("p");

        rincian.textContent =
            item.jumlah + " x " +
            formatRupiah(item.harga) + " = " +
            formatRupiah(item.harga * item.jumlah);

        info.append(nama, rincian);

        // Tombol untuk mengatur jumlah pesanan.
        const kontrol = document.createElement("div");
        kontrol.className = "cart-item-controls";

        const tombolKurang = document.createElement("button");
        tombolKurang.type = "button";
        tombolKurang.className = "quantity-btn";
        tombolKurang.textContent = "−";
        tombolKurang.setAttribute(
            "aria-label",
            "Kurangi " + item.nama
        );

        const jumlah = document.createElement("span");
        jumlah.textContent = item.jumlah;

        const tombolTambah = document.createElement("button");
        tombolTambah.type = "button";
        tombolTambah.className = "quantity-btn";
        tombolTambah.textContent = "+";
        tombolTambah.setAttribute(
            "aria-label",
            "Tambah " + item.nama
        );

        const tombolHapus = document.createElement("button");
        tombolHapus.type = "button";
        tombolHapus.className = "remove-btn";
        tombolHapus.textContent = "Hapus";

        // Mengurangi jumlah pesanan.
        tombolKurang.addEventListener("click", function () {
            item.jumlah -= 1;

            if (item.jumlah <= 0) {
                hapusItemDariKeranjang(item.id);
            } else {
                tampilkanKeranjang();
            }
        });

        // Menambah jumlah pesanan.
        tombolTambah.addEventListener("click", function () {
            item.jumlah += 1;
            tampilkanKeranjang();
        });

        // Menghapus satu menu dari keranjang.
        tombolHapus.addEventListener("click", function () {
            hapusItemDariKeranjang(item.id);
        });

        kontrol.append(
            tombolKurang,
            jumlah,
            tombolTambah,
            tombolHapus
        );

        baris.append(info, kontrol);

        cartItems.appendChild(baris);
    });

    // Menghitung seluruh harga pesanan.
    const total = keranjang.reduce((jumlah, item) => {
        return jumlah + item.harga * item.jumlah;
    }, 0);

    cartTotal.textContent =
        "Total: " + formatRupiah(total);
}


/* =========================================
   10. MENGHAPUS ITEM DARI KERANJANG
   ========================================= */

function hapusItemDariKeranjang(id) {

    const index = keranjang.findIndex(
        item => item.id === id
    );

    if (index !== -1) {
        keranjang.splice(index, 1);
    }

    tampilkanKeranjang();
}


/* =========================================
   11. MENGOSONGKAN KERANJANG
   ========================================= */

clearCartButton.addEventListener("click", function () {

    if (keranjang.length === 0) {
        alert("Keranjang sudah kosong.");
        return;
    }

    const yakin = confirm(
        "Apakah kamu yakin ingin menghapus semua pesanan?"
    );

    if (yakin) {
        keranjang.length = 0;
        tampilkanKeranjang();
    }
});


/* =========================================
   12. MENGIRIM PESANAN KE WHATSAPP KASIR
   ========================================= */

sendOrderButton.addEventListener("click", function () {

    // Memastikan ada menu yang dipilih.
    if (keranjang.length === 0) {
        alert("Silakan pilih menu terlebih dahulu.");
        return;
    }

    // Memeriksa nama pelanggan.
    const namaPelanggan = customerName.value.trim();

    if (!namaPelanggan) {
        alert("Silakan isi nama pelanggan.");
        customerName.focus();
        return;
    }

    // Memeriksa nomor meja.
    const nomorMeja = tableNumber.value.trim();

    if (!nomorMeja) {
        alert("Silakan isi nomor meja.");
        tableNumber.focus();
        return;
    }

    // Memastikan nomor WhatsApp kasir sudah diisi.
    if (!/^62\d{8,15}$/.test(NOMOR_WA_KASIR)) {
        alert(
            "Periksa NOMOR_WA_KASIR di script.js. " +
            "Gunakan format 62 diikuti nomor, tanpa + atau spasi."
        );
        return;
    }

    // Membuat rincian setiap item.
    const daftarRincian = keranjang.map((item, index) => {

        const subtotal = item.harga * item.jumlah;

        return (
            (index + 1) + ". " +
            item.nama + " x" + item.jumlah +
            " = " + formatRupiah(subtotal)
        );
    });

    // Menghitung total akhir.
    const total = keranjang.reduce((jumlah, item) => {
        return jumlah + item.harga * item.jumlah;
    }, 0);

    // Menyusun isi pesan WhatsApp.
    const pesan = [
        "HALO KASIR, SAYA INGIN MEMESAN",
        "",
        "Nama: " + namaPelanggan,
        "Meja: " + nomorMeja,
        "",
        "DAFTAR PESANAN:",
        ...daftarRincian,
        "",
        "TOTAL: " + formatRupiah(total),
        "",
        "Mohon konfirmasi pesanan saya. Terima kasih."
    ].join("\n");

    // Membuka WhatsApp dengan pesan yang sudah dibuat.
    const urlWhatsApp =
        "https://wa.me/" + NOMOR_WA_KASIR +
        "?text=" + encodeURIComponent(pesan);

    window.open(
        urlWhatsApp,
        "_blank",
        "noopener,noreferrer"
    );
});


/* =========================================
   13. MENJALANKAN WEBSITE
   ========================================= */

// Menampilkan tombol kategori.
tampilkanKategori();

// Menampilkan seluruh menu.
tampilkanMenu();

// Menampilkan keranjang kosong pada awal halaman.
tampilkanKeranjang();
