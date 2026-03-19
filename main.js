// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// ... (existing code)

// Forgot Password Logic
const forgotPass = document.getElementById('forgotPass');
forgotPass.addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;

    if (!email) {
        alert("Please enter your email address in the box first.");
        return;
    }

    sendPasswordResetEmail(auth, email)
        .then(() => {
            alert("A password reset email has been sent! Check your inbox.");
        })
        .catch((error) => {
            const errorMessage = error.message;
            alert("Error: " + errorMessage);
        });
});

// 1. Firebase configuration (Your actual keys)
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

// --- UI Logic (Switching between Forms) ---
const signupBtn = document.getElementById('signupBtn');
const loginBtn = document.getElementById('loginBtn');
const signupForm = document.getElementById('signupForm');
const loginForm = document.getElementById('loginForm');

// Switch to Login
loginBtn.addEventListener('click', () => {
    signupBtn.classList.remove('active');
    loginBtn.classList.add('active');

    signupForm.classList.remove('active-form');
    loginForm.classList.add('active-form');
});

// Switch to Sign Up
signupBtn.addEventListener('click', () => {
    signupBtn.classList.add('active');
    loginBtn.classList.remove('active');

    signupForm.classList.add('active-form');
    loginForm.classList.remove('active-form');
});

// --- Firebase Authentication Logic ---

// Sign Up Form Submission
const signupFormElement = document.getElementById('signupFormElement');
signupFormElement.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('signupEmail').value;
    const pass = document.getElementById('signupPass').value;
    const confirmPass = document.getElementById('confirmPass').value;

    // Check if passwords match
    if (pass !== confirmPass) {
        alert("The passwords do not match!");
        return;
    }

    // Create a new user in Firebase Auth
    createUserWithEmailAndPassword(auth, email, pass)
        .then((userCredential) => {
            const user = userCredential.user;
            alert("Account created successfully for: " + user.email);
            signupFormElement.reset(); // Clear form
        })
        .catch((error) => {
            const errorMessage = error.message;
            alert("Sign-up Error: " + errorMessage);
        });
});

// Login Form Submission
const loginFormElement = document.getElementById('loginFormElement');
loginFormElement.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const pass = document.getElementById('loginPass').value;

    // Sign in with Firebase Auth
    signInWithEmailAndPassword(auth, email, pass)
        .then((userCredential) => {
            const user = userCredential.user;
            alert("Login Successful! Welcome back, " + user.email);
            loginFormElement.reset(); // Clear form
        })
        .catch((error) => {
            const errorMessage = error.message;
            alert("Login Error: " + errorMessage);
        });
});