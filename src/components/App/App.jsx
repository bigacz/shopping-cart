import Navbar from 'components/Navbar/Navbar';
import Footer from 'components/Footer/Footer';
import { Outlet } from 'react-router';
import { useEffect, useState } from 'react';
import { ScrollRestoration } from 'react-router';

import { LoaderCircle } from 'lucide-react';

import styles from './App.module.css';

const apiUrl = 'https://dummyjson.com/products/category/kitchen-accessories';

function App() {
  const [products, setProducts] = useState();
  const [cart, setCart] = useState({});

  useEffect(() => {
    async function fetchProducts() {
      const request = await fetch(apiUrl);
      const json = await request.json();

      setProducts(json.products);
    }

    fetchProducts();
  }, []);

  function changeProductQuantity(id, quantity) {
    const newCart = { ...cart };

    newCart[id] = Number(quantity);

    setCart(newCart);
  }

  function addProduct(id) {
    const newCart = { ...cart };

    if (!cart[id]) {
      newCart[id] = 0;
    }

    newCart[id] += 1;

    setCart(newCart);
  }

  function removeProduct(id) {
    const newCart = { ...cart };

    if (!cart[id]) {
      newCart[id] = 0;
    } else {
      newCart[id] -= 1;
    }

    setCart(newCart);
  }

  return (
    <>
      <ScrollRestoration />
      <div className={styles.heroWrapper}>
        <Navbar />
        {products == null ? (
          <div className={styles.loadingWrapper}>
            <div className={styles.loadingContainer}>
              Loading
              <LoaderCircle size="2" alt="Loading" />
            </div>
          </div>
        ) : (
          <Outlet
            context={{
              products,
              cart,
              addProduct,
              removeProduct,
              changeProductQuantity,
            }}
          />
        )}
      </div>
      <Footer />
    </>
  );
}

export default App;
