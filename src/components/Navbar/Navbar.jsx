import { Link } from 'react-router';
import './Navbar.module.css';
import { ShoppingCart } from 'lucide-react';

function Navbar() {
  return (
    <nav>
      <h1>
        <a href="/">Kitchen</a>
      </h1>
      <a href="/shop">Products</a>
      <a href="/cart">
        <ShoppingCart />
        Cart
      </a>
    </nav>
  );
}

export default Navbar;
