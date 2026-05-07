import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Layout from './components/Layout';
import AboutPage from './pages/AboutPage';
import CartPage from './pages/CartPage';
import CategoryPage from './pages/CategoryPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import ProductPage from './pages/ProductPage';
// import Search from './pages/Search';
import ThanksPage from './pages/ThanksPage';

import fetchCategoryLoader from './loaders/categoryLoader';
import fetchProductLoader from './loaders/productLoader';
import ErrorBoundary from './components/ErrorBoundary';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage />, loader: fetchCategoryLoader, errorElement: <ErrorBoundary /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'category/:categoryId', element: <CategoryPage />, loader: fetchProductLoader, errorElement: <ErrorBoundary /> },
      { path: 'product/:productId', element: <ProductPage /> },
      // { path: 'search', element: <Search /> },
      { path: 'thanks', element: <ThanksPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;

