import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import getOrder from '@wasp/queries/getOrder';
import getShipment from '@wasp/queries/getShipment';

export function OrderTracking() {
  const { id } = useParams();

  const { data: order, isLoading, error } = useQuery(getOrder, { id });
  const { data: shipment } = useQuery(getShipment, { id: order?.shipmentId });

  if (isLoading) return 'Loading order...';
  if (error) return 'Error: ' + error;

  const renderOrderStatus = () => {
    // Implement rendering of order status based on order.status
  };

  return (
    <div className='p-4'>
      <h1>Order Tracking</h1>

      <div className='my-4'>
        <h3>Order Status:</h3>
        {renderOrderStatus()}
      </div>

      <div className='my-4'>
        <h3>Shipment Details:</h3>
        <p>Shipment ID: {shipment?.id}</p>
        {/* Render shipment details here */}
      </div>
    </div>
  );
}