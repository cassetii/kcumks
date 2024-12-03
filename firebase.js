// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

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
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
    });
}

// Export fungsi untuk digunakan di file lain
export { tambahDataAC, ambilDataAC };
