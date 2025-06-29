import Navbar from 'components/Navbar/Navbar';
import Footer from 'components/Footer/Footer';
import { Outlet } from 'react-router';
import { useEffect, useState } from 'react';

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

    newCart[id] = quantity;

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
      <Navbar />
      <Outlet
        context={{
          products,
          cart,
          addProduct,
          removeProduct,
          changeProductQuantity,
        }}
      />
      <Footer />
    </>
  );
}

export default App;
