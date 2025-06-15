import { useOutletContext } from 'react-router';
import './Cart.module.css';

function Cart() {
  const { products, cart } = useOutletContext();

  return (
    <main>
      {isCartEmpty(cart) ? (
        <span>Cart is empty</span>
      ) : (
        Object.entries(cart).map(([id, amount]) => {
          const product = products.find((e) => e.id == id);

          return (
            <div key={id}>
              <img src={product.images[0]} alt={product.title} />
              <span>{amount}</span>
              <span>{product.title}</span>
              <span>{product.price} €</span>
            </div>
          );
        })
      )}
    </main>
  );
}

export default Cart;

function isCartEmpty(cart) {
  let isEmpty = true;

  Object.values(cart).forEach((value) => {
    if (value != 0) {
      isEmpty = false;
    }
  });

  return isEmpty;
}
