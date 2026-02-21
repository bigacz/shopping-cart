import { useOutletContext } from 'react-router';
import styles from './Cart.module.css';
import { ShoppingCartIcon } from 'lucide-react';
import { Plus as IconPlus, Minus as IconMinus } from 'lucide-react';

function Cart() {
  const { products, cart, addProduct, removeProduct, changeProductQuantity } =
    useOutletContext();

  const cartProducts = [];
  Object.entries(cart).forEach(([id, quantity]) => {
    const product = products.find((e) => e.id == id);

    if (quantity > 0) {
      cartProducts.push({ ...product, quantity });
    }
  });

  const totalPrice = roundPrice(
    cartProducts.reduce((accumulator, current) => {
      const { price, quantity } = current;

      return accumulator + price * quantity;
    }, 0),
  );

  let cartContent = <span>Cart is empty</span>;

  if (!isCartEmpty(cart)) {
    cartContent = cartProducts.map(({ id, images, title, quantity, price }) => {
      return (
        <div key={id} className={styles.product}>
          <span className={styles.productName}>{title}</span>
          <img src={images[0]} alt={title} className={styles.productImage} />
          <div className={styles.quantityDisplay}>
            <span className={styles.quantityText}>Quantity</span>
            <button
              onClick={() => {
                removeProduct(id);
              }}
              className={styles.quantityButtonLeft}
            >
              <IconMinus size={24} strokeWidth={1.8} />
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => {
                changeProductQuantity(id, e.target.value);
              }}
              className={styles.quantityInput}
            />
            <button
              onClick={() => {
                addProduct(id);
              }}
              className={styles.quantityButtonRight}
            >
              <IconPlus size={26} strokeWidth={1.6} />
            </button>
          </div>
          <span className={styles.productPrice}>
            {roundPrice(price * quantity)} $
          </span>
        </div>
      );
    });
  }

  return (
    <main className={styles.main}>
      <div className={styles.cartContent}>
        <span>Your cart</span>
        {cartContent}
      </div>
      <div className={styles.cartSummaryWrapper}>
        <div className={styles.cartSummary}>
          <span>Total price: {totalPrice} $</span>
          <button
            className={styles.checkoutButton}
            disabled={Number(totalPrice) <= 0}
          >
            Checkout
          </button>
        </div>
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

function roundPrice(price) {
  const roundedPrice = Math.round(price * 100) / 100;
  return roundedPrice.toFixed(2);
}
