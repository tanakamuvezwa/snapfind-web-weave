'''/*
- To run this script, use the command: `npx ts-node --esm scripts/seed.ts`
- This script is a standalone utility and is not part of the main application flow.
- It is designed to be run manually from the command line when you need to populate the database.
- Make sure your Firebase project has a 'products' collection ready before running.
- The script reads product data from `src/lib/db.ts` and uploads it to the Firestore collection.
*/

import { collection, addDoc } from 'firebase/firestore';
import { db } from '../src/firebase'; // Adjust the import path as needed
import { products } from '../src/lib/db';

async function seedDatabase() {
  try {
    console.log('Starting to seed the database...');
    const productsCollection = collection(db, 'products');

    for (const product of products) {
      await addDoc(productsCollection, product);
      console.log(`Added product: ${product.name}`);
    }

    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding the database:', error);
  }
}

seedDatabase();'''