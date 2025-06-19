import { useOutletContext } from 'react-router';
import './Cart.module.css';

function Cart() {
  const { products, cart, addProduct, removeProduct } = useOutletContext();

  const cartProducts = [];
  Object.entries(cart).forEach(([id, quantity]) => {
    const product = products.find((e) => e.id == id);

    if (quantity > 0) {
      cartProducts.push({ ...product, quantity });
    }
  });

  const totalPrice = cartProducts.reduce((accumulator, current) => {
    const { price, quantity } = current;

    const calculatedPrice = accumulator + price * quantity;
    const roundedPrice = Math.round(calculatedPrice * 100) / 100;

    return roundedPrice;
  }, 0);

  return (
    <main>
      <span>Your cart</span>
      <div>
        {isCartEmpty(cart) ? (
          <span>Cart is empty</span>
        ) : (
          cartProducts.map(({ id, images, title, quantity, price }) => {
            return (
              <div key={id}>
                <img src={images[0]} alt={title} />
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
                <span>{title}</span>
                <span>{price} €</span>
              </div>
            );
          })
        )}
      </div>
      <div>
        <span>Total price: {totalPrice} €</span>
      </div>
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
