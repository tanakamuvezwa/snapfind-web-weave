import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Truck, ShoppingBag, User, Calendar } from 'lucide-react';

const OrderCard = ({ order }) => (
  <Card className="mb-4 bg-gray-800 border-gray-700">
    <CardContent className="flex items-center p-4">
      <img src={order.image} alt={order.item} className="w-16 h-16 rounded-lg mr-4" />
      <div class="flex-grow">
        <h4 className="font-bold text-lg text-white">{order.item}</h4>
        <p className="text-sm text-gray-400 flex items-center"><User className="w-4 h-4 mr-2" />{order.party}</p>
        <p className="text-sm text-gray-400 flex items-center"><Calendar className="w-4 h-4 mr-2" />Est. Delivery: {order.delivery}</p>
        <p className="text-sm text-green-400 flex items-center"><Truck className="w-4 h-4 mr-2" />{order.status}</p>
      </div>
      <div className="flex flex-col space-y-2">
        <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-700">View Details</Button>
        <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-700">Contact</Button>
      </div>
    </CardContent>
  </Card>
);

const Tracking = () => {
  const purchases = [
    {
      id: 1,
      item: 'Vintage Camera',
      party: 'Seller: John Doe',
      delivery: 'Nov 20, 2025',
      status: 'In Transit',
      image: 'https://via.placeholder.com/60',
    },
    {
      id: 2,
      item: 'Blue Scarf',
      party: 'Seller: Jane Smith',
      delivery: 'Nov 22, 2025',
      status: 'Processing',
      image: 'https://via.placeholder.com/60',
    },
  ];

  const sales = [
    {
      id: 1,
      item: 'Handmade Vase',
      party: 'Buyer: Emily White',
      delivery: 'Nov 25, 2025',
      status: 'Delivered',
      image: 'https://via.placeholder.com/60',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <header className="mb-8">
        <h2 className="text-4xl font-bold">Tracking</h2>
      </header>

      <Tabs defaultValue="my-purchases">
        <TabsList className="grid w-full grid-cols-2 bg-gray-800">
          <TabsTrigger value="my-purchases">My Purchases</TabsTrigger>
          <TabsTrigger value="my-sales">My Sales</TabsTrigger>
        </TabsList>
        <TabsContent value="my-purchances">
          <h3 className="text-2xl font-semibold my-6">Active Orders</h3>
          <div>
            {purchases.map(order => <OrderCard key={order.id} order={order} />)}
          </div>
          <h3 className="text-2xl font-semibold my-6">Past Orders</h3>
          {/* Add past orders here */}
        </TabsContent>
        <TabsContent value="my-sales">
          <h3 className="text-2xl font-semibold my-6">Active Sales</h3>
          <div>
            {sales.map(order => <OrderCard key={order.id} order={order} />)}
          </div>
          <h3 className="text-2xl font-semibold my-6">Past Sales</h3>
          {/* Add past sales here */}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Tracking;
