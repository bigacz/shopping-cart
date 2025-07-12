import { useOutletContext, useParams } from 'react-router';
import './Product.module.css';
import ReviewsList from 'components/ReviewsList/ReviewsList';
import StarRating from 'components/StarRating/StarRating';

import styles from './Product.module.css';

function Product() {
  const { productId } = useParams();
  const { products, addProduct, cart } = useOutletContext();

  const product = products.find((element) => element.id == productId);
  if (product == null) {
    return <p>No product found!</p>;
  }
  const { title, description, price, rating, reviews, images } = product;

  return (
    <div className={styles.wrapper}>
      <div className={styles.product}>
        <img src={images[0]} alt={title} className={styles.productImage} />
        <div className={styles.productInfo}>
          <h2>{title}</h2>
          <span className={styles.productPrice}>{price} $</span>
          <p className={styles.productDescription}>{description}</p>
          <StarRating rating={rating} className={styles.starRating} />
          {!cart[productId] ? (
            <button
              onClick={() => {
                addProduct(productId);
              }}
              className={styles.addButton}
            >
              Add to cart
            </button>
          ) : (
            <button className={styles.addButton}>Added</button>
          )}
        </div>
        <ReviewsList className={styles.reviewsList} reviews={reviews} />
      </div>
    </div>
  );
}

export default Product;
