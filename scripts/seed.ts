
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, GeoPoint } from "firebase/firestore";

// --- IMPORTANT ---
// To run this script, you need to configure it with your Firebase project.
// 1. Make sure you have a .env.local file in the root of your project.
// 2. Add your Firebase config to .env.local (VITE_FIREBASE_...).
// 3. You will need to install ts-node to execute this script: `npm install -g ts-node`
// 4. Run the script from your terminal: `ts-node --esm ./scripts/seed.ts`

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log("Firebase Initialized for Seeding...");

// --- Data Models as per your plan ---

interface Seller {
    name: string;
    sellerProfileImageUrl: string;
    location: GeoPoint;
    averageRating: number;
    bio: string;
}

interface Product {
    name: string;
    description: string;
    price: number;
    category: string;
    sellerId: string; // This will be the document ID from the sellers collection
    imageUrl: string;
    rating: number;
    numberOfReviews: number;
    location: GeoPoint;
    keywords: string[];
}

// --- Sample Data ---

const sellers: Omit<Seller, 'id'>[] = [
    {
        name: "VisionTech Solutions",
        sellerProfileImageUrl: "https://firebasestorage.googleapis.com/v0/b/your-project-id.appspot.com/o/sellers%2Fvisiontech.png?alt=media",
        location: new GeoPoint(34.0522, -118.2437), // Los Angeles
        averageRating: 4.8,
        bio: "Pioneers in advanced AI-powered surveillance systems."
    },
    {
        name: "RoboCrafters Inc.",
        sellerProfileImageUrl: "https://firebasestorage.googleapis.com/v0/b/your-project-id.appspot.com/o/sellers%2Frobocrafters.png?alt=media",
        location: new GeoPoint(37.7749, -122.4194), // San Francisco
        averageRating: 4.9,
        bio: "Building the next generation of home and industrial robots."
    },
    {
        name: "AudioFlow",
        sellerProfileImageUrl: "https://firebasestorage.googleapis.com/v0/b/your-project-id.appspot.com/o/sellers%2Faudioflow.png?alt=media",
        location: new GeoPoint(40.7128, -74.0060), // New York City
        averageRating: 4.6,
        bio: "Crystal clear audio hardware for every need."
    }
];

const products: Omit<Product, 'sellerId'>[] = [
    {
        name: "Sentinel Security Cam",
        description: "A state-of-the-art security camera with AI person detection and night vision.",
        price: 199.99,
        category: "Surveillance",
        imageUrl: "https://firebasestorage.googleapis.com/v0/b/your-project-id.appspot.com/o/products%2Fsentinel_cam.png?alt=media",
        rating: 4.7,
        numberOfReviews: 120,
        location: new GeoPoint(34.0522, -118.2437), // Same as seller
        keywords: ["security", "camera", "ai", "surveillance", "smart home"]
    },
    {
        name: "ButlerBot V2",
        description: "Your personal home assistant robot. Can carry items, set schedules, and integrate with smart home devices.",
        price: 2999.00,
        category: "Robots",
        imageUrl: "https://firebasestorage.googleapis.com/v0/b/your-project-id.appspot.com/o/products%2Fbutlerbot.png?alt=media",
        rating: 4.9,
        numberOfReviews: 45,
        location: new GeoPoint(37.7749, -122.4194),
        keywords: ["robot", "home assistant", "automation", "butler"]
    },
    {
        name: "StudioPro Microphone",
        description: "USB-C condenser microphone for professional-grade recording and streaming.",
        price: 149.50,
        category: "Audio",
        imageUrl: "https://firebasestorage.googleapis.com/v0/b/your-project-id.appspot.com/o/products%2Fstudiopro_mic.png?alt=media",
        rating: 4.8,
        numberOfReviews: 350,
        location: new GeoPoint(40.7128, -74.0060),
        keywords: ["microphone", "audio", "recording", "streaming", "podcast"]
    },
    {
        name: "DroneGuard 360",
        description: "An autonomous drone that patrols your property, providing a 360-degree view.",
        price: 899.00,
        category: "Surveillance",
        imageUrl: "https://firebasestorage.googleapis.com/v0/b/your-project-id.appspot.com/o/products%2Fdroneguard.png?alt=media",
        rating: 4.5,
        numberOfReviews: 78,
        location: new GeoPoint(34.0522, -118.2437),
        keywords: ["drone", "security", "surveillance", "aerial"]
    }
];


// --- Seeding Function ---

const seedDatabase = async () => {
    try {
        console.log("Starting to seed database...");

        // Clear existing collections (optional, use with caution)
        // console.log("Clearing existing data...");
        // await db.collection("sellers").delete();
        // await db.collection("products").delete();

        const sellersCollection = collection(db, "sellers");
        const productsCollection = collection(db, "products");

        const sellerDocs = [];
        for (const seller of sellers) {
            const docRef = await addDoc(sellersCollection, seller);
            sellerDocs.push({ ...seller, id: docRef.id });
            console.log(`Added seller: ${seller.name}`);
        }

        for (const product of products) {
            // Assign a sellerId based on location match for simplicity
            const matchedSeller = sellerDocs.find(s => s.location.latitude === product.location.latitude);
            if (matchedSeller) {
                await addDoc(productsCollection, { ...product, sellerId: matchedSeller.id });
                console.log(`Added product: ${product.name}`);
            }
        }

        console.log("Database seeding completed successfully!");
        process.exit(0);

    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
};

// --- Execute Seeding ---
// This part of the script will run when executed from the command line.
if (process.env.VITE_FIREBASE_PROJECT_ID) {
    seedDatabase();
} else {
    console.log("Firebase project ID not found. Make sure your .env.local file is configured correctly.");
    console.log("The script will not run.");
    process.exit(1);
}
