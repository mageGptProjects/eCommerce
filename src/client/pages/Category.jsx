import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import getProducts from '@wasp/queries/getProducts';

export function Category() {
  const { id } = useParams();

  const { data: products, isLoading, error } = useQuery(getProducts, { categoryId: Number(id) });

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div>
      {products.map((product) => (
        <div key={product.id} className='p-4 bg-gray-100 mb-4 rounded-lg'>
          <h2 className='text-lg font-bold mb-2'>{product.name}</h2>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
        </div>
      ))}
    </div>
  );
}