// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Konfigurasi Firebase Anda
const firebaseConfig = {
    apiKey: "AIzaSyC32ogV4MXkNwfTxYcBzejTjfM2vdIGV6s",
    authDomain: "kcumks-eb203.firebaseapp.com",
    projectId: "kcumks-eb203",
    storageBucket: "kcumks-eb203.firebasestorage.app",
    messagingSenderId: "905778145865",
    appId: "1:905778145865:web:bd5c6d8f216b791a3ded98",
    measurementId: "G-VMD07N22DG"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Fungsi untuk menambahkan data ke Firestore
async function tambahDataAC(letakAC, jalan, model, kapasitas, freon) {
    try {
        const docRef = await addDoc(collection(db, "unitAC"), {
            letakAC: letakAC,
            jalan: jalan,
            model: model,
            kapasitas: kapasitas,
            freon: freon,
            timestamp: new Date()
        });
        console.log("Dokumen berhasil ditambahkan dengan ID: ", docRef.id);
    } catch (e) {
        console.error("Error menambahkan dokumen: ", e);
    }
}

// Fungsi untuk mendapatkan data dari Firestore
async function ambilDataAC() {
    const querySnapshot = await getDocs(collection(db, "unitAC"));
    const data = [];
    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
    });
    return data;
}

// Fungsi untuk memperbarui data di Firestore
async function updateDataAC(docId, letakAC, jalan, model, kapasitas, freon) {
    const docRef = doc(db, "unitAC", docId);
    await updateDoc(docRef, {
        letakAC: letakAC,
        jalan: jalan,
        model: model,
        kapasitas: kapasitas,
        freon: freon,
        timestamp: new Date()
    });
    console.log("Dokumen berhasil diperbarui!");
}

// Fungsi untuk menghapus data di Firestore
async function deleteDataAC(docId) {
    const docRef = doc(db, "unitAC", docId);
    await deleteDoc(docRef);
    console.log("Dokumen berhasil dihapus!");
}

// Export fungsi untuk digunakan di file lain
export { tambahDataAC, ambilDataAC, updateDataAC, deleteDataAC };
