import { Link, useOutletContext } from 'react-router';
import './Shop.module.css';

function Shop() {
  const { products } = useOutletContext();

  return (
    <div>
      <span>All products</span>
      {products ? (
        products.map(({ id, title, price, images }) => {
          return (
            <Link to={`/product/${id}`} key={id}>
              <img src={images[0]} alt={title} />
              <span>{title}</span>
              <span>{price}</span>
            </Link>
          );
        })
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default Shop;
