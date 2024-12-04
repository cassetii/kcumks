import { tambahDataAC, ambilDataAC, updateDataAC, deleteDataAC } from './firebase.js';

// Menangani pengiriman form
document.getElementById('acForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Ambil nilai dari form
    const letakAC = document.getElementById('letakAC').value;
    const jalan = document.getElementById('jalan').value;
    const model = document.getElementById('model').value;
    const kapasitas = document.getElementById('kapasitas').value;
    const freon = document.getElementById('freon').value;

    // Kirim data ke Firebase
    tambahDataAC(letakAC, jalan, model, kapasitas, freon);

    // Kosongkan form setelah data dikirim
    document.getElementById('acForm').reset();

    // Menampilkan data unit AC setelah data ditambahkan
    tampilkanDataAC();
});

// Menampilkan data unit AC dari Firestore ke tabel
async function tampilkanDataAC() {
    const dataUnitAC = await ambilDataAC();

    const tableBody = document.getElementById("dataAC");
    tableBody.innerHTML = "unitAc";  // Kosongkan tabel sebelum menambahkan data baru

    dataUnitAC.forEach((data) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${data.letakAC}</td>
            <td>${data.jalan}</td>
            <td>${data.model}</td>
            <td>${data.kapasitas}</td>
            <td>${data.freon}</td>
            <td>
                <button onclick="editData('${data.id}')">Edit</button>
                <button onclick="hapusData('${data.id}')">Hapus</button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

// Fungsi untuk edit data
async function editData(docId) {
    const docRef = doc(db, "unitAC", docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const data = docSnap.data();

        // Isi form dengan data yang akan diupdate
        document.getElementById("letakAC").value = data.letakAC;
        document.getElementById("jalan").value = data.jalan;
        document.getElementById("model").value = data.model;
        document.getElementById("kapasitas").value = data.kapasitas;
        document.getElementById("freon").value = data.freon;

        // Update form action untuk mengupdate data
        document.getElementById("acForm").onsubmit = async function (e) {
            e.preventDefault();

            // Ambil nilai dari form
            const letakAC = document.getElementById("letakAC").value;
            const jalan = document.getElementById("jalan").value;
            const model = document.getElementById("model").value;
            const kapasitas = document.getElementById("kapasitas").value;
            const freon = document.getElementById("freon").value;

            // Update data di Firestore
            await updateDataAC(docId, letakAC, jalan, model, kapasitas, freon);

            // Reset form dan tampilkan kembali data
            document.getElementById("unitAc").reset();
            tampilkanDataAC();
        };
    }
}

// Fungsi untuk hapus data
async function hapusData(docId) {
    await deleteDataAC(docId);
    tampilkanDataAC();  // Menampilkan ulang data setelah dihapus
}

// Panggil fungsi tampilkanDataAC saat halaman dimuat
window.onload = function () {
    tampilkanDataAC();
};
