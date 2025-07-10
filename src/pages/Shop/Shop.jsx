import { Link, useOutletContext } from 'react-router';
import styles from './Shop.module.css';

function Shop() {
  const { products } = useOutletContext();
  return (
    <div className={styles.wrapper}>
      {products ? (
        <>
          <span className={styles.number}>All products: {products.length}</span>
          <div className={styles.productsWrapper}>
            {products.map(({ id, title, price, images }) => {
              return (
                <Link to={`/product/${id}`} key={id} className={styles.product}>
                  <img
                    src={images[0]}
                    alt={title}
                    className={styles.productImage}
                  />
                  <span>{title}</span>
                  <span className={styles.productPrice}>{price}</span>
                </Link>
              );
            })}
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default Shop;
