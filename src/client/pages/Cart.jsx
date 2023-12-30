import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import checkout from '@wasp/actions/checkout';

export function Cart() {
  const { data: cart, isLoading, error } = useQuery(getCart);
  const checkoutFn = useAction(checkout);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleCheckout = () => {
    checkoutFn();
  };

  return (
    <div className='p-4'>
      <h1 className='text-3xl font-bold mb-4'>Cart</h1>
      {cart.map((item) => (
        <div
          key={item.id}
          className='bg-gray-100 p-4 mb-4 rounded-lg'
        >
          <div>{item.name}</div>
          <div>Price: ${item.price}</div>
        </div>
      ))}
      <button
        onClick={handleCheckout}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        Checkout
      </button>
    </div>
  );
}