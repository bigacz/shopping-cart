import { useOutletContext } from 'react-router';
import './Cart.module.css';

function Cart() {
  const { products, cart } = useOutletContext();

  return (
    <main>
      {products.map((product) => (
        <div key={product.id}>
          <img src={product.images[0]} alt={product.title} />
          <span>{cart[product.id]}</span>
          <span>{product.title}</span>
          <span>{product.price} €</span>
        </div>
      ))}
    </main>
  );
}

export default Cart;
