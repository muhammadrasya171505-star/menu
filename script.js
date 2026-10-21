
/* =================================
   1. DATABASE SEMENTARA MENUKITA
   ================================= */

// Anggap bagian ini sebagai tempat menyimpan data menu.
// Belum memakai database sungguhan.

const databaseMenu = [
    {
        nama: "Nasi Goreng",
        harga: 18000,
        kategori: "Makanan",
        deskripsi: "Nasi goreng dengan telur dan sayuran.",
        gambar: "https://placehold.co/600x400?text=Nasi+Goreng",
        tersedia: true
    },
    {
        nama: "Kentang Goreng",
        harga: 12000,
        kategori: "Camilan",
        deskripsi: "Kentang goreng yang renyah.",
        gambar: "https://placehold.co/600x400?text=Kentang+Goreng",
        tersedia: true
    },
    {
        nama: "Es Teh Manis",
        harga: 5000,
        kategori: "Minuman",
        deskripsi: "Teh manis dengan es yang menyegarkan.",
        gambar: "https://placehold.co/600x400?text=Es+Teh",
        tersedia: true
    },
    {
        nama: "Es Kopi Susu",
        harga: 15000,
        kategori: "Minuman",
        deskripsi: "Kopi dicampur susu.",
        gambar: "https://placehold.co/600x400?text=Es+Kopi",
        tersedia: false
    }
];


/* =================================
   2. MENGHUBUNGKAN JAVASCRIPT KE HTML
   ================================= */

const menuGrid = document.getElementById("menuGrid");
const searchInput = document.getElementById("searchInput");
const categoryButtons = document.getElementById("categoryButtons");
const resultCount = document.getElementById("resultCount");
const emptyMessage = document.getElementById("emptyMessage");

let kategoriAktif = "Semua";


/* =================================
   3. MENGUBAH HARGA MENJADI RUPIAH
   ================================= */

function formatRupiah(harga) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(harga);
}


/* =================================
   4. MEMBUAT TOMBOL KATEGORI
   ================================= */

function tampilkanKategori() {
    const kategori = [
        "Semua",
        ...new Set(databaseMenu.map(menu => menu.kategori))
    ];

    categoryButtons.innerHTML = "";

    kategori.forEach(namaKategori => {
        const tombol = document.createElement("button");

        tombol.type = "button";
        tombol.textContent = namaKategori;
        tombol.className = "category-btn";

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


/* =================================
   5. MENAMPILKAN DATA MENU
   ================================= */

function tampilkanMenu() {
    const kataKunci = searchInput.value.toLowerCase().trim();

    // Mencari data yang sesuai dengan kata kunci
    // dan kategori yang dipilih.

    const hasilMenu = databaseMenu.filter(menu => {
        const cocokNama = menu.nama
            .toLowerCase()
            .includes(kataKunci);

        const cocokKategori =
            kategoriAktif === "Semua" ||
            menu.kategori === kategoriAktif;

        return cocokNama && cocokKategori;
    });

    // Mengosongkan tampilan menu sebelumnya.
    menuGrid.innerHTML = "";

    // Menampilkan jumlah hasil.
    resultCount.textContent =
        "Menampilkan " + hasilMenu.length + " menu";

    // Jika menu tidak ditemukan.
    if (hasilMenu.length === 0) {
        emptyMessage.style.display = "block";
        return;
    }

    emptyMessage.style.display = "none";

    // Mengambil data satu per satu dari database sementara.
    hasilMenu.forEach(menu => {
        const kartu = document.createElement("article");
        kartu.className = "menu-card";

        kartu.innerHTML = `
            <img
                class="menu-image"
                src="${menu.gambar}"
                alt="${menu.nama}"
                loading="lazy"
            >

            <div class="menu-info">
                <p class="menu-category">${menu.kategori}</p>

                <h3>${menu.nama}</h3>

                <p class="menu-description">
                    ${menu.deskripsi}
                </p>

                <div class="menu-bottom">
                    <span class="menu-price">
                        ${formatRupiah(menu.harga)}
                    </span>

                    <span class="status ${
                        menu.tersedia ? "available" : "sold-out"
                    }">
                        ${menu.tersedia ? "Tersedia" : "Habis"}
                    </span>
                </div>
            </div>
        `;

        // Jika gambar gagal dibuka, tampilkan gambar pengganti.
        const gambar = kartu.querySelector("img");

        gambar.addEventListener("error", function () {
            this.onerror = null;
            this.src =
                "https://placehold.co/600x400?text=Foto+Menu";
        });

        menuGrid.appendChild(kartu);
    });
}


/* =================================
   6. FITUR PENCARIAN
   ================================= */

// Menu diperbarui setiap kali pengguna mengetik.
searchInput.addEventListener("input", tampilkanMenu);


/* =================================
   7. MENJALANKAN WEBSITE
   ================================= */

// Membuat tombol kategori.
tampilkanKategori();

// Menampilkan semua menu saat website dibuka.
tampilkanMenu();
