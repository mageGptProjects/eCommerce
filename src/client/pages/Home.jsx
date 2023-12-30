import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import getProducts from '@wasp/queries/getProducts';

export function Home() {
  const { data: products, isLoading, error } = useQuery(getProducts);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Simswear: A Fusion of Casual and Cultural</h1>
      <h2 className="text-xl">Featured Products:</h2>

      <div className="grid grid-cols-3 gap-4 mt-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-md shadow">
            <Link to={`/product/${product.id}`} className="font-bold text-lg mb-2">{product.name}</Link>
            <p>{product.description}</p>
            <p className="text-xl font-bold mt-2">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}