import { User, AppConfig } from "../types";
import { auth, db } from "./firebase";
// Note: When activating Firebase, you would import specific Firebase functions:
// import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
// import { doc, getDoc, setDoc } from "firebase/firestore";

/**
 * DATA PROVIDER
 * This service abstracts the data source.
 * Currently tailored for LocalStorage (Prototype).
 * Includes commented-out code for Firebase (Production).
 */

const STORAGE_KEY = 'tradeum_users';

// --- LOCAL STORAGE IMPLEMENTATION (CURRENT) ---

export const dataProvider = {
    async login(email: string, pass: string): Promise<User> {
        // Simulate network delay
        await new Promise(r => setTimeout(r, 500));

        const stored = localStorage.getItem(STORAGE_KEY);
        const users: User[] = stored ? JSON.parse(stored) : [];
        const user = users.find(u => u.email === email && u.password === pass);

        if (!user) throw new Error('Invalid credentials');
        return user;
    },

    async register(email: string, pass: string, defaultConfig: AppConfig): Promise<User> {
        // Simulate network delay
        await new Promise(r => setTimeout(r, 500));

        const stored = localStorage.getItem(STORAGE_KEY);
        const users: User[] = stored ? JSON.parse(stored) : [];

        if (users.find(u => u.email === email)) {
            throw new Error('User already exists');
        }

        const newUser: User = {
            email,
            password: pass,
            config: defaultConfig
        };

        users.push(newUser);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
        return newUser;
    },

    async saveConfig(userEmail: string, newConfig: AppConfig): Promise<void> {
        // Simulate network delay
        await new Promise(r => setTimeout(r, 300));

        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return;

        const users: User[] = JSON.parse(stored);
        const updatedUsers = users.map(u => 
            u.email === userEmail ? { ...u, config: newConfig } : u
        );

        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUsers));
    },

    async logout(): Promise<void> {
        // No-op for local storage
        return Promise.resolve();
    }
};


// --- FIREBASE IMPLEMENTATION (PREPARED) ---
/*
export const firebaseProvider = {
    async login(email: string, pass: string): Promise<User> {
        if (!auth || !db) throw new Error("Firebase not initialized");
        
        // 1. Auth Login
        const userCredential = await signInWithEmailAndPassword(auth, email, pass);
        const firebaseUser = userCredential.user;

        // 2. Fetch User Config from Firestore
        const docRef = doc(db, "users", firebaseUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return {
                email: firebaseUser.email || "",
                password: "", // Don't store password in state for Firebase
                config: docSnap.data().config as AppConfig
            };
        } else {
            // Should not happen for registered users, but handle fallback
            throw new Error("User profile not found in database");
        }
    },

    async register(email: string, pass: string, defaultConfig: AppConfig): Promise<User> {
        if (!auth || !db) throw new Error("Firebase not initialized");

        // 1. Auth Register
        const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
        const firebaseUser = userCredential.user;

        // 2. Create User Profile in Firestore
        const newUser: User = {
            email: firebaseUser.email || "",
            password: "",
            config: defaultConfig
        };

        await setDoc(doc(db, "users", firebaseUser.uid), {
            config: defaultConfig,
            createdAt: new Date()
        });

        return newUser;
    },

    async saveConfig(userEmail: string, newConfig: AppConfig): Promise<void> {
        if (!auth || !db) throw new Error("Firebase not initialized");
        
        const currentUser = auth.currentUser;
        if (!currentUser) throw new Error("No authenticated user");

        const userRef = doc(db, "users", currentUser.uid);
        await setDoc(userRef, { config: newConfig }, { merge: true });
    },

    async logout(): Promise<void> {
        if (!auth) return;
        await signOut(auth);
    }
};
*/
