import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const Sell: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { image, product, description, price } = location.state || {};

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
          <CardTitle>Create a New Listing</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="space-y-4">
            {image && (
              <div className="mb-4">
                <img src={image} alt="Product" className="rounded-lg w-full object-contain" />
              </div>
            )}
            <div>
              <label htmlFor="name" className="text-sm font-medium">Product Name</label>
              <Input id="name" defaultValue={product.name} className="mt-1" />
            </div>
            <div>
              <label htmlFor="description" className="text-sm font-medium">Description</label>
              <Textarea id="description" defaultValue={description} className="mt-1" rows={6} />
            </div>
            <div>
              <label htmlFor="price" className="text-sm font-medium">Suggested Price</label>
              <Input id="price" defaultValue={price} className="mt-1" />
            </div>
            <Button className="w-full">Create Listing</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Sell;
