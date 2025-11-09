"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("firebase/app");
var firestore_1 = require("firebase/firestore");
// --- IMPORTANT ---
// To run this script, you need to configure it with your Firebase project.
// 1. Make sure you have a .env.local file in the root of your project.
// 2. Add your Firebase config to .env.local (VITE_FIREBASE_...).
// 3. You will need to install ts-node to execute this script: `npm install -g ts-node`
// 4. Run the script from your terminal: `ts-node --esm ./scripts/seed.ts`
// Firebase configuration from environment variables
var firebaseConfig = {
    apiKey: process.env.VITE_FIREBASE_API_KEY,
    authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VITE_FIREBASE_APP_ID
};
// Initialize Firebase
var app = (0, app_1.initializeApp)(firebaseConfig);
var db = (0, firestore_1.getFirestore)(app);
console.log("Firebase Initialized for Seeding...");
// --- Sample Data ---
var sellers = [
    {
        name: "VisionTech Solutions",
        sellerProfileImageUrl: "https://firebasestorage.googleapis.com/v0/b/your-project-id.appspot.com/o/sellers%2Fvisiontech.png?alt=media",
        location: new firestore_1.GeoPoint(34.0522, -118.2437), // Los Angeles
        averageRating: 4.8,
        bio: "Pioneers in advanced AI-powered surveillance systems."
    },
    {
        name: "RoboCrafters Inc.",
        sellerProfileImageUrl: "https://firebasestorage.googleapis.com/v0/b/your-project-id.appspot.com/o/sellers%2Frobocrafters.png?alt=media",
        location: new firestore_1.GeoPoint(37.7749, -122.4194), // San Francisco
        averageRating: 4.9,
        bio: "Building the next generation of home and industrial robots."
    },
    {
        name: "AudioFlow",
        sellerProfileImageUrl: "https://firebasestorage.googleapis.com/v0/b/your-project-id.appspot.com/o/sellers%2Faudioflow.png?alt=media",
        location: new firestore_1.GeoPoint(40.7128, -74.0060), // New York City
        averageRating: 4.6,
        bio: "Crystal clear audio hardware for every need."
    }
];
var products = [
    {
        name: "Sentinel Security Cam",
        description: "A state-of-the-art security camera with AI person detection and night vision.",
        price: 199.99,
        category: "Surveillance",
        imageUrl: "https://firebasestorage.googleapis.com/v0/b/your-project-id.appspot.com/o/products%2Fsentinel_cam.png?alt=media",
        rating: 4.7,
        numberOfReviews: 120,
        location: new firestore_1.GeoPoint(34.0522, -118.2437), // Same as seller
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
        location: new firestore_1.GeoPoint(37.7749, -122.4194),
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
        location: new firestore_1.GeoPoint(40.7128, -74.0060),
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
        location: new firestore_1.GeoPoint(34.0522, -118.2437),
        keywords: ["drone", "security", "surveillance", "aerial"]
    }
];
// --- Seeding Function ---
var seedDatabase = function () { return __awaiter(void 0, void 0, void 0, function () {
    var sellersCollection, productsCollection, sellerDocs, _i, sellers_1, seller, docRef, _loop_1, _a, products_1, product, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 9, , 10]);
                console.log("Starting to seed database...");
                sellersCollection = (0, firestore_1.collection)(db, "sellers");
                productsCollection = (0, firestore_1.collection)(db, "products");
                sellerDocs = [];
                _i = 0, sellers_1 = sellers;
                _b.label = 1;
            case 1:
                if (!(_i < sellers_1.length)) return [3 /*break*/, 4];
                seller = sellers_1[_i];
                return [4 /*yield*/, (0, firestore_1.addDoc)(sellersCollection, seller)];
            case 2:
                docRef = _b.sent();
                sellerDocs.push(__assign(__assign({}, seller), { id: docRef.id }));
                console.log("Added seller: ".concat(seller.name));
                _b.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4:
                _loop_1 = function (product) {
                    var matchedSeller;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                matchedSeller = sellerDocs.find(function (s) { return s.location.latitude === product.location.latitude; });
                                if (!matchedSeller) return [3 /*break*/, 2];
                                return [4 /*yield*/, (0, firestore_1.addDoc)(productsCollection, __assign(__assign({}, product), { sellerId: matchedSeller.id }))];
                            case 1:
                                _c.sent();
                                console.log("Added product: ".concat(product.name));
                                _c.label = 2;
                            case 2: return [2 /*return*/];
                        }
                    });
                };
                _a = 0, products_1 = products;
                _b.label = 5;
            case 5:
                if (!(_a < products_1.length)) return [3 /*break*/, 8];
                product = products_1[_a];
                return [5 /*yield**/, _loop_1(product)];
            case 6:
                _b.sent();
                _b.label = 7;
            case 7:
                _a++;
                return [3 /*break*/, 5];
            case 8:
                console.log("Database seeding completed successfully!");
                process.exit(0);
                return [3 /*break*/, 10];
            case 9:
                error_1 = _b.sent();
                console.error("Error seeding database:", error_1);
                process.exit(1);
                return [3 /*break*/, 10];
            case 10: return [2 /*return*/];
        }
    });
}); };
// --- Execute Seeding ---
// This part of the script will run when executed from the command line.
if (process.env.VITE_FIREBASE_PROJECT_ID) {
    seedDatabase();
}
else {
    console.log("Firebase project ID not found. Make sure your .env.local file is configured correctly.");
    console.log("The script will not run.");
    process.exit(1);
}
