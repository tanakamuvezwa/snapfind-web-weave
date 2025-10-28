import { collection, addDoc } from 'firebase/firestore';
import { db } from '../src/firebase.js';
import { products } from '../src/lib/db.js';

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

seedDatabase();