
import React, { useState, useEffect } from 'react';
import { collection, getDocs, DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { db } from '../firebase'; // Make sure this path is correct
import ProductCard, { ProductData } from '../components/ProductCard'; // Import the ProductCard and its interface

// --- Interfaces for Firestore data ---
// These match the structure in your seed.ts script
interface SellerDoc {
    id: string;
    name: string;
    averageRating: number;
    // add other seller fields if needed
}

interface ProductDoc {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    imageUrl: string;
    rating: number;
    numberOfReviews: number;
    location: any; // GeoPoint
    sellerId: string;
}


// --- Main Marketplace Page Component ---

const MarketplacePage: React.FC = () => {
    const [products, setProducts] = useState<ProductData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                // 1. Fetch Sellers and create a lookup map
                const sellersCollection = collection(db, 'sellers');
                const sellerSnapshot = await getDocs(sellersCollection);
                const sellerMap: Map<string, SellerDoc> = new Map();
                sellerSnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
                    sellerMap.set(doc.id, { id: doc.id, ...doc.data() } as SellerDoc);
                });

                // 2. Fetch Products
                const productsCollection = collection(db, 'products');
                const productSnapshot = await getDocs(productsCollection);

                // 3. Combine Product and Seller data
                const combinedProducts: ProductData[] = [];
                productSnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
                    const productDoc = { id: doc.id, ...doc.data() } as ProductDoc;
                    const seller = sellerMap.get(productDoc.sellerId);

                    combinedProducts.push({
                        ...productDoc,
                        seller: seller ? { name: seller.name, averageRating: seller.averageRating } : undefined
                    });
                });

                setProducts(combinedProducts);

            } catch (err) {
                console.error("Error fetching data:", err);
                setError("Failed to load products. Please try again later.");
            }
            setLoading(false);
        };

        fetchData();
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 orange-hue">
            {/* Header Placeholder */}
            <header className="bg-white shadow-sm p-4">
                <h1 className="text-2xl font-bold text-gray-800">SnapFind Marketplace</h1>
            </header>

            <div className="flex flex-1">
                {/* Sidebar for Filters */}
                <aside className="w-1/4 max-w-xs p-6 bg-white border-r border-gray-200">
                    <h2 className="text-lg font-semibold">Filters</h2>
                    <div className="mt-4">
                        <p className="text-gray-600">[Filter options will go here]</p>
                        {/* Price, category, distance filters will be implemented here */}
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 p-6">
                    {loading && <p className='text-center'>Loading products...</p>}
                    {error && <p className='text-center text-red-500'>{error}</p>}
                    
                    {!loading && !error && (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {products.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default MarketplacePage;
