import { Link } from 'react-router';
import styles from './Navbar.module.css';

import { ShoppingCart } from 'lucide-react';

function Navbar({ itemCount }) {
  return (
    <nav className={styles.navbar}>
      <div className={styles.wrapper}>
        <h3 className={styles.header}>
          <Link to="/">Kitchen market</Link>
        </h3>
        <Link to="shop">Products</Link>
        <Link to="cart" className={styles.cartLink}>
          <div className={styles.iconWrapper}>
            <span aria-label="item count" className={styles.itemCount}>
              {itemCount}
            </span>
            <ShoppingCart />
          </div>
          <span>Cart</span>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
