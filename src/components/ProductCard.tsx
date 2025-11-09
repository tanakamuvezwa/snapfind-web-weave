
import React from 'react';
import { GeoPoint } from 'firebase/firestore';

// --- Component Interfaces ---

// This interface combines fields from your Product and Seller data models
// It represents the data this component expects to receive.
export interface ProductData {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  rating: number;
  numberOfReviews: number;
  location: GeoPoint;
  seller?: {
    name: string;
    averageRating: number;
  };
  distance?: number; // Calculated distance from the user
}

interface ProductCardProps {
  product: ProductData;
}

// --- Helper Components ---

const StarRating: React.FC<{ rating: number; reviewCount: number }> = ({ rating, reviewCount }) => (
  <div className="flex items-center">
    <svg className="w-4 h-4 text-yellow-400 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
    </svg>
    <span className="ml-1 text-sm font-bold text-gray-700">{rating.toFixed(1)}</span>
    <span className="ml-2 text-sm text-gray-500">({reviewCount})</span>
  </div>
);

// --- Main Component ---

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="flex flex-col overflow-hidden bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 group">
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-105"
          // Add a fallback for broken image links
          onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/400x300.png?text=Image+Not+Found'; }}
        />
        {product.distance && (
            <span className="absolute top-2 right-2 bg-gray-800 bg-opacity-70 text-white text-xs font-semibold px-2 py-1 rounded-full">
                {product.distance.toFixed(1)} km away
            </span>
        )}
      </div>

      {/* Content Container */}
      <div className="flex flex-col flex-grow p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate" title={product.name}>
          {product.name}
        </h3>
        
        <p className="mt-1 text-sm text-gray-500">by {product.seller?.name || 'Unknown Seller'}</p>
        
        <div className="flex items-center justify-between mt-3">
          <p className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
          <StarRating rating={product.rating} reviewCount={product.numberOfReviews} />
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
             <button className="w-full px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                View Details
             </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
