
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getDatabase, ref, onValue } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js';

const firebaseConfig = {
    apiKey: "AIzaSyACI4q45NCRMvevEk6OqFX3FN-IrbKeP1Y",
    authDomain: "fir-c3858.firebaseapp.com",
    databaseURL: "https://fir-c3858-default-rtdb.firebaseio.com",
    projectId: "fir-c3858",
    storageBucket: "fir-c3858.appspot.com",
    messagingSenderId: "852410770710",
    appId: "1:852410770710:web:6758c9606badabd38c9c37"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

function fetchData() {
    const dataContainer = document.getElementById('data-container');
    const dataRef = ref(db, 'light-controls');

    onValue(dataRef, (snapshot) => {
        dataContainer.innerHTML = '';
        snapshot.forEach(childSnapshot => {
            const data = childSnapshot.val();
            const dataItem = document.createElement('div');
            dataItem.classList.add('data-item');
            dataItem.innerHTML = `
                <p><strong>Pins:</strong> ${data.pins}</p>
                <p><strong>States:</strong> ${data.states}</p>
                <p><strong>Timestamp:</strong> ${new Date(data.timestamp).toLocaleString()}</p>
            `;
            dataContainer.appendChild(dataItem);
        });
    });
}

document.addEventListener('DOMContentLoaded', fetchData);
