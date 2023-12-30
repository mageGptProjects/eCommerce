import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import getOrders from '@wasp/queries/getOrders';

export function Orders() {
  const { data: orders, isLoading, error } = useQuery(getOrders);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      {orders.map((order) => (
        <div key={order.id} className='bg-gray-100 p-4 mb-4 rounded-lg'>
          <div>Order ID: {order.id}</div>
          <div>Status: {order.status}</div>
          <div>Products:</div>
          <ul>
            {order.products.map((product) => (
              <li key={product.id}>
                {product.name} - ${product.price}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}