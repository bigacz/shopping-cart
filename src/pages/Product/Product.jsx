import { useOutletContext, useParams } from 'react-router';
import './Product.module.css';
import ReviewsList from 'components/ReviewsList/ReviewsList';
import StarRating from 'components/StarRating/StarRating';
import { useState } from 'react';

function Product() {
  const { productId } = useParams();
  const { products, addProduct } = useOutletContext();

  const [isAdded, setIsAdded] = useState(false);

  const product = products.find((element) => element.id == productId);
  if (product == null) {
    return <p>No product found!</p>;
  }
  const { title, description, price, rating, reviews, images } = product;

  return (
    <div>
      <img src={images[0]} alt={title} />
      <h2>{title}</h2>
      <span>{price} €</span>
      <p>{description}</p>
      <StarRating rating={rating} />
      <ReviewsList reviews={reviews} />
      {isAdded ? (
        <button
          onClick={() => {
            addProduct(productId);
            setIsAdded(true);
          }}
        >
          Add to cart
        </button>
      ) : (
        <button>Added</button>
      )}
    </div>
  );
}

export default Product;
