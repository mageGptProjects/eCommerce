import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getProduct from '@wasp/queries/getProduct';
import getReviews from '@wasp/queries/getReviews';
import addToCart from '@wasp/actions/addToCart';
import createReview from '@wasp/actions/createReview';

export function ProductPage() {
  const { id } = useParams();

  const { data: product, isLoading: isLoadingProduct, error: productError } = useQuery(getProduct, { id });
  const { data: reviews, isLoading: isLoadingReviews, error: reviewsError } = useQuery(getReviews, { productId: id });

  const addToCartFn = useAction(addToCart);

  const createReviewFn = useAction(createReview);

  if (isLoadingProduct || isLoadingReviews) return 'Loading...';
  if (productError) return `Error: ${productError}`;
  if (reviewsError) return `Error: ${reviewsError}`;

  const handleAddToCart = () => {
    addToCartFn({ productId: id });
  };

  const handleCreateReview = (rating, reviewText) => {
    createReviewFn({ userId: 123, productId: id, rating, reviewText });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">{product.name}</h2>
      <p className="text-lg">{product.description}</p>

      <div className="mt-4">
        <button
          onClick={handleAddToCart}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add to Cart
        </button>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-bold">Product Reviews</h3>
        <ul className="mt-4">
          {reviews.map((review) => (
            <li key={review.id} className="mb-2">
              <div>Rating: {review.rating}</div>
              <div>Review: {review.reviewText}</div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-bold">Leave a review</h3>
        <form className="mt-4">
          <div className="mb-2">
            <label className="block text-sm font-bold mb-1" htmlFor="rating">Rating:</label>
            <input type="number" min="1" max="5" id="rating" className="border rounded px-2 py-1" />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-bold mb-1" htmlFor="reviewText">Review:</label>
            <textarea id="reviewText" className="border rounded px-2 py-1"></textarea>
          </div>
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              const rating = document.getElementById('rating').value;
              const reviewText = document.getElementById('reviewText').value;
              handleCreateReview(rating, reviewText);
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
}