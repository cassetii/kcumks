import { tambahDataAC, ambilDataAC } from './firebase.js';

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
});

// Menampilkan data unit AC dari Firestore ke tabel
window.onload = function () {
    ambilDataAC();
};

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

        // Menambahkan event listener pada tombol submit untuk mengupdate data
        document.getElementById("acForm").onsubmit = async function (e) {
            e.preventDefault();

            // Ambil nilai dari form
            const letakAC = document.getElementById("letakAC").value;
            const jalan = document.getElementById("jalan").value;
            const model = document.getElementById("model").value;
            const kapasitas = document.getElementById("kapasitas").value;
            const freon = document.getElementById("freon").value;

            // Update data di Firestore
            await updateDoc(docRef, {
                letakAC: letakAC,
                jalan: jalan,
                model: model,
                kapasitas: kapasitas,
                freon: freon,
                timestamp: new Date()
            });

            // Reset form dan tampilkan kembali data
            document.getElementById("acForm").reset();
            tampilkanDataAC();
        };
    }
}

// Fungsi untuk hapus data
async function hapusData(docId) {
    const docRef = doc(db, "unitAC", docId);

    try {
        await deleteDoc(docRef);
        alert("Data berhasil dihapus!");
        tampilkanDataAC();  // Menampilkan ulang data setelah dihapus
    } catch (e) {
        console.error("Error menghapus dokumen: ", e);
    }
}

// Panggil fungsi tampilkanDataAC saat halaman dimuat
window.onload = function () {
    tampilkanDataAC();
};
