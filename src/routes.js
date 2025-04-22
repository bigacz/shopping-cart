import App from './components/App/App';

import Home from './pages/Home/Home';
import Shop from './pages/Shop/Shop';
import Cart from './pages/Cart/Cart';
import Product from './pages/Product/Product';

const routes = [
  {
    path: '/',
    Component: App,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'shop',
        Component: Shop,
      },
      {
        path: 'cart',
        Component: Cart,
      },
      {
        path: 'Product',
        Component: Product,
        // Dynamic segments
      },
    ],
  },
];

export default routes;
