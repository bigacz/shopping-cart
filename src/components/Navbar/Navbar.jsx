import { Link } from 'react-router';
import './Navbar.module.css';

import { ShoppingCart } from 'lucide-react';

function Navbar() {
  return (
    <nav>
      <h1>
        <Link to="/">Kitchen</Link>
      </h1>
      <Link to="shop">Products</Link>
      <Link to="cart">
        <ShoppingCart />
        Cart
      </Link>
    </nav>
  );
}

export default Navbar;
