
export type Product = {
  keywords: string[];
  name: string;
  category: string;
  description: string;
  condition: string;
  buyerPrice: number;
  sellerPrice: number;
};

export const products: Product[] = [
  // iPhones
  { keywords: ['iphone-x'], name: 'iPhone X', category: 'Electronics', description: 'A revolutionary smartphone with a stunning all-screen display.', condition: 'Good', buyerPrice: 250, sellerPrice: 200 },
  { keywords: ['iphone-11'], name: 'iPhone 11', category: 'Electronics', description: 'A powerful smartphone with a dual-camera system.', condition: 'Like New', buyerPrice: 400, sellerPrice: 350 },
  { keywords: ['iphone-11-pro', 'iphone 11 pro'], name: 'iPhone 11 Pro', category: 'Electronics', description: 'A transformative triple‑camera system that adds tons of capability without complexity.', condition: 'Like New', buyerPrice: 450, sellerPrice: 400 },
  { keywords: ['iphone-11-pro-max', 'iphone 11 pro max'], name: 'iPhone 11 Pro Max', category: 'Electronics', description: 'The first iPhone to be called Pro Max, with a larger display and even longer battery life.', condition: 'Like New', buyerPrice: 500, sellerPrice: 450 },
  { keywords: ['iphone-12'], name: 'iPhone 12', category: 'Electronics', description: 'Experience super-fast 5G and the A14 Bionic chip.', condition: 'Like New', buyerPrice: 500, sellerPrice: 450 },
  { keywords: ['iphone-12-pro', 'iphone 12 pro'], name: 'iPhone 12 Pro', category: 'Electronics', description: 'A huge leap forward, with 5G speed, A14 Bionic, and a Pro camera system.', condition: 'New', buyerPrice: 600, sellerPrice: 550 },
  { keywords: ['iphone-13'], name: 'iPhone 13', category: 'Electronics', description: 'The most advanced dual-camera system ever on iPhone.', condition: 'New', buyerPrice: 650, sellerPrice: 600 },
  { keywords: ['iphone-14'], name: 'iPhone 14', category: 'Electronics', description: 'A new, larger 6.7-inch size joins the popular 6.1-inch design.', condition: 'New', buyerPrice: 800, sellerPrice: 750 },
  { keywords: ['iphone-15'], name: 'iPhone 15', category: 'Electronics', description: 'Features Dynamic Island, a 48MP Main camera, and USB-C.', condition: 'New', buyerPrice: 950, sellerPrice: 900 },

  // Samsung S-Series
  { keywords: ['samsung-s20', 's20'], name: 'Samsung Galaxy S20', category: 'Electronics', description: 'The phone to make your world bigger.', condition: 'Good', buyerPrice: 300, sellerPrice: 250 },
  { keywords: ['samsung-s21', 's21'], name: 'Samsung Galaxy S21', category: 'Electronics', description: 'The epic-in-every-way smartphone.', condition: 'Like New', buyerPrice: 450, sellerPrice: 400 },
  { keywords: ['samsung-s22', 's22'], name: 'Samsung Galaxy S22', category: 'Electronics', description: 'The phone that makes everyday epic.', condition: 'New', buyerPrice: 600, sellerPrice: 550 },
  { keywords: ['samsung-s23', 's23'], name: 'Samsung Galaxy S23', category: 'Electronics', description: 'Capture the night, even in low light.', condition: 'New', buyerPrice: 750, sellerPrice: 700 },

  // Samsung A-Series
  { keywords: ['samsung-a52', 'a52'], name: 'Samsung Galaxy A52', category: 'Electronics', description: 'Awesome screen, awesome camera, long-lasting battery life.', condition: 'Good', buyerPrice: 200, sellerPrice: 150 },
  { keywords: ['samsung-a72', 'a72'], name: 'Samsung Galaxy A72', category: 'Electronics', description: 'A phone with a powerful camera and a large screen.', condition: 'Like New', buyerPrice: 300, sellerPrice: 250 },

  // Nike Shoes
  { keywords: ['nike-air-force-1', 'air force 1'], name: 'Nike Air Force 1', category: 'Shoes', description: 'The radiance lives on in the b-ball original.', condition: 'Like New', buyerPrice: 80, sellerPrice: 60 },
  { keywords: ['nike-dunk-low', 'dunk low'], name: 'Nike Dunk Low', category: 'Shoes', description: 'A streetwear staple and a skateboarding classic.', condition: 'New', buyerPrice: 120, sellerPrice: 100 },
  { keywords: ['nike-air-max-97', 'air max 97'], name: 'Nike Air Max 97', category: 'Shoes', description: 'Push your style full speed ahead.', condition: 'Good', buyerPrice: 150, sellerPrice: 120 },

  // Adidas Shoes
  { keywords: ['adidas-superstar', 'superstar'], name: 'Adidas Superstar', category: 'Shoes', description: 'The authentic low top with the shell toe.', condition: 'Like New', buyerPrice: 70, sellerPrice: 50 },
  { keywords: ['adidas-stan-smith', 'stan smith'], name: 'Adidas Stan Smith', category: 'Shoes', description: 'An international icon of clean, crisp style.', condition: 'Good', buyerPrice: 60, sellerPrice: 45 },
  { keywords: ['adidas-ultraboost', 'ultraboost'], name: 'Adidas Ultraboost', category: 'Shoes', description: 'High-performance running shoes with a responsive feel.', condition: 'New', buyerPrice: 180, sellerPrice: 150 },
];
