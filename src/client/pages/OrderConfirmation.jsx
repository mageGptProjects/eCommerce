import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import getOrder from '@wasp/queries/getOrder';

export function OrderConfirmationPage() {
  const { id } = useParams();
  const { data: order, isLoading, error } = useQuery(getOrder, { id });

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div>
      <h1>Order Confirmation</h1>
      <p>Order ID: {order.id}</p>
      {/* Display other order details here */}
    </div>
  );
}