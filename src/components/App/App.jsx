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

      setProducts(json);
    }

    fetchProducts();
  }, []);

  return (
    <>
      <Navbar />
      <Outlet context={{ products }} />
      <Footer />
    </>
  );
}

export default App;
