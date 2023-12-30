import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import getOrders from '@wasp/queries/getOrders';

export function CancelReturn() {
  const { data: orders, isLoading, error } = useQuery(getOrders);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      <h1>Order Cancel/Return Form</h1>
      {orders.map((order) => (
        <div key={order.id} className='flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg'>
          <div>Order ID: {order.id}</div>
          <div>Status: {order.status}</div>
          <div>
            <button
              className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
            >
              Cancel/Return
            </button>
            <Link
              to={`/order/${order.id}`}
              className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2'
            >
              Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}