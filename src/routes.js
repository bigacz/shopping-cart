import App from './components/App/App';

import Home from './pages/Home/Home';
import Shop from './pages/Shop/Shop';
import Cart from './pages/Cart/Cart';
import Product from './pages/Product/Product';
import ErrorPage from 'pages/ErrorPage/ErrorPage';

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
        path: 'product/:productId',
        Component: Product,
      },
    ],
    ErrorBoundary: ErrorPage,
  },
];

export default routes;
