import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// ... (previous logic)

// 1. Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBoCQo1yrieelrzAkIzNgegkv0w0sQvjho",
  authDomain: "mypredictionapp-f23e4.firebaseapp.com",
  projectId: "mypredictionapp-f23e4",
  storageBucket: "mypredictionapp-f23e4.firebasestorage.app",
  messagingSenderId: "821118473868",
  appId: "1:821118473868:web:00f4e5b7f0895cf7fb8da9"
};

// 2. Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider(); // Google Provider

// --- Handle Login State (Real-time) ---
onAuthStateChanged(auth, (user) => {
    const imagePanel = document.querySelector('.image-panel');
    const formPanel = document.querySelector('.form-panel');
    const dashboard = document.getElementById('userDashboard');
    const welcomeMsg = document.getElementById('userWelcomeMsg');

    if (user) {
        imagePanel.style.display = 'none';
        formPanel.style.display = 'none';
        dashboard.style.display = 'flex';
        welcomeMsg.innerText = "Welcome! Logged in as: " + user.email;
    } else {
        imagePanel.style.display = 'block';
        formPanel.style.display = 'block';
        dashboard.style.display = 'none';
    }
});

// Logout Action
document.getElementById('logoutBtn').addEventListener('click', () => {
    signOut(auth).then(() => alert("Logged out."));
});

// Google Login Logic
const googleBtns = document.querySelectorAll('.google-btn');
googleBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        signInWithPopup(auth, provider)
            .then((result) => {
                // User signed in
            })
            .catch((error) => {
                alert("Google Error: " + error.message);
            });
    });
});

// UI Logic (Switching between Forms)
const signupBtn = document.getElementById('signupBtn');
const loginBtn = document.getElementById('loginBtn');
const signupForm = document.getElementById('signupForm');
const loginForm = document.getElementById('loginForm');

loginBtn.addEventListener('click', () => {
    signupBtn.classList.remove('active');
    loginBtn.classList.add('active');
    signupForm.classList.remove('active-form');
    loginForm.classList.add('active-form');
});

signupBtn.addEventListener('click', () => {
    signupBtn.classList.add('active');
    loginBtn.classList.remove('active');
    signupForm.classList.add('active-form');
    loginForm.classList.remove('active-form');
});

// Forgot Password Logic
const forgotPass = document.getElementById('forgotPass');
forgotPass.addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    if (!email) { alert("Please enter your email first."); return; }
    sendPasswordResetEmail(auth, email)
        .then(() => alert("Reset email sent!"))
        .catch((error) => alert(error.message));
});

// Sign Up Submission
const signupFormElement = document.getElementById('signupFormElement');
signupFormElement.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('signupEmail').value;
    const pass = document.getElementById('signupPass').value;
    const confirmPass = document.getElementById('confirmPass').value;
    if (pass !== confirmPass) { alert("Passwords do not match!"); return; }
    createUserWithEmailAndPassword(auth, email, pass).catch(err => alert(err.message));
});

// Login Submission
const loginFormElement = document.getElementById('loginFormElement');
loginFormElement.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const pass = document.getElementById('loginPass').value;
    signInWithEmailAndPassword(auth, email, pass).catch(err => alert(err.message));
});