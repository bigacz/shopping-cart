import { useOutletContext } from 'react-router';
import './Cart.module.css';

function Cart() {
  const { products, cart, addProduct, removeProduct } = useOutletContext();

  return (
    <main>
      <span>Your cart</span>
      {isCartEmpty(cart) ? (
        <span>Cart is empty</span>
      ) : (
        Object.entries(cart).map(([id, quantity]) => {
          const product = products.find((e) => e.id == id);

          return (
            <div key={id}>
              <img src={product.images[0]} alt={product.title} />
              <div>
                <button
                  onClick={() => {
                    removeProduct(id);
                  }}
                >
                  -
                </button>
                <span>Quantity</span>
                <span>{quantity}</span>
                <button
                  onClick={() => {
                    addProduct(id);
                  }}
                >
                  +
                </button>
              </div>
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
