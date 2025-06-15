import { useOutletContext, useParams } from 'react-router';
import './Product.module.css';
import ReviewsList from 'components/ReviewsList/ReviewsList';
import StarRating from 'components/StarRating/StarRating';

function Product() {
  const { productId } = useParams();
  const { products, addProduct, cart } = useOutletContext();

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
      {!cart[productId] ? (
        <button
          onClick={() => {
            addProduct(productId);
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
