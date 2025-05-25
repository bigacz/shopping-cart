import { useOutletContext } from 'react-router';
import './Shop.module.css';

function Shop() {
  const { products } = useOutletContext();

  return (
    <div>
      {products.map(({ id, title, price, images }) => {
        return (
          <div key={id}>
            <img src={images[0]} alt={title} />
            <span>{title}</span>
            <span>{price}</span>
          </div>
        );
      })}
    </div>
  );
}

export default Shop;
