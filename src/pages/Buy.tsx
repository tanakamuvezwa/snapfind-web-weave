import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Buy: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product, description } = location.state || {};

  const fakeListings = [
    { id: 1, seller: 'User123', price: 'Slightly less than suggested', location: 'Nearby' },
    { id: 2, seller: 'AnotherSeller', price: 'The same as suggested', location: 'A bit further' },
    { id: 3, seller: 'ThirdPerson', price: 'More than suggested', location: 'Far away' },
  ];

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold">No product data available.</h1>
        <Button onClick={() => navigate('/')} className="mt-4">Go Back</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle>{product.name}</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <p className="text-lg mb-6">{description}</p>
          <h2 className="text-xl font-bold mb-4">Listings Near You</h2>
          <div className="space-y-4">
            {fakeListings.map(listing => (
              <Card key={listing.id} className="bg-gray-700 border-gray-600">
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{listing.seller}</p>
                    <p className="text-sm text-gray-400">{listing.location}</p>
                  </div>
                  <Button>{listing.price}</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Buy;
