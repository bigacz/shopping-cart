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
          <span aria-label="item count">{itemCount}</span>
          <ShoppingCart />
          Cart
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
