
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getDatabase, ref, set, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js';

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

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('control-form');
    const sendSignalButton = document.getElementById('send-signal');

    form.addEventListener('change', function (event) {
        if (event.target.type === 'checkbox') {
            const lightControl = event.target.closest('.light-control');
            const radios = lightControl.querySelectorAll('input[type=radio]');
            radios.forEach(radio => {
                radio.disabled = !event.target.checked;
            });
        }
    });

    sendSignalButton.addEventListener('click', async function () {
        const selectedLights = [];
        const lightStates = [];

        document.querySelectorAll('.light-control').forEach(lightControl => {
            const checkbox = lightControl.querySelector('input[type=checkbox]');
            if (checkbox.checked && lightControl.querySelector('input[type=radio]:checked').value) {
                const state = lightControl.querySelector('input[type=radio]:checked').value;
                selectedLights.push(checkbox.name.replace('light', ''));
                lightStates.push(state);
            }
        });

        if (selectedLights.length > 0) {
            const pins = selectedLights.join(',');
            const states = lightStates.join(',');

            try {
                const newEntryRef = ref(db, 'light-controls/' + Date.now());
                await set(newEntryRef, {
                    pins: pins,
                    states: states,
                    timestamp: serverTimestamp()
                });
                alert(`pins=${pins}&states=${states} Saved`);
            } catch (error) {
                console.error('Error writing document: ', error);
                alert('Error saving data to Firebase.');
            }
        } else {
            alert('Please select at least one light to control.');
        }
    });
});
