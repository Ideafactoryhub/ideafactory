import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
} from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: 'AIzaSyDuRl8o5jM5IJre8tSREsaRjAmuROTG2hs',
  authDomain: 'ideafactory-2d67e.firebaseapp.com',
  projectId: 'ideafactory-2d67e',
  storageBucket: 'ideafactory-2d67e.appspot.com',
  messagingSenderId: '801823458198',
  appId: '1:801823458198:web:926c95f5542dfeffbf93b7',
  measurementId: 'G-RGVVZ6EPM5',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', () => {
  const reviewForm = document.getElementById('reviewForm');
  const reviewList = document.getElementById('reviewList');

  reviewForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('reviewerName').value.trim();
    const text = document.getElementById('reviewText').value.trim();

    if (name && text) {
      try {
        await addDoc(collection(db, 'reviews'), {
          name,
          text,
          timestamp: new Date(),
        });
        reviewForm.reset();
        loadReviews();
      } catch (err) {
        console.error('Error adding document:', err);
      }
    }
  });

  async function loadReviews() {
    try {
      const querySnapshot = await getDocs(collection(db, 'reviews'));
      reviewList.innerHTML = '';
      querySnapshot.forEach((doc) => {
        const rev = doc.data();
        const card = document.createElement('div');
        card.className = 'review-card';
        card.innerHTML = `
          <h3><i class="fas fa-user" style="color: white;"></i> ${rev.name}</h3>
          <p>${rev.text}</p>
        `;
        reviewList.appendChild(card);
      });
    } catch (err) {
      console.error('Error loading reviews:', err);
    }
  }

  loadReviews();
});
