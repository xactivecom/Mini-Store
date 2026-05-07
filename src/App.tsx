import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Layout from './components/Layout';
import NotFoundPage from './pages/NotFoundPage';
import ThanksPage from './pages/ThanksPage';

import fetchCategoryLoader from './loaders/categoryLoader';
import fetchProductLoader from './loaders/productLoader';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load pages
const AboutPage = lazy(() => import('./pages/AboutPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));
const HomePage = lazy(() => import('./pages/HomePage'));
const ProductPage = lazy(() => import('./pages/ProductPage'));

// Define routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true, 
        element: <HomePage />, 
        loader: fetchCategoryLoader, 
        errorElement: <ErrorBoundary /> 
      },
      {
        path: 'about',
        element: <AboutPage />
      },
      {
        path: 'cart',
        element: <CartPage />
      },
      {
        path: 'category/:categoryId',
        element: <CategoryPage />,
        loader: fetchProductLoader,
        errorElement: <ErrorBoundary />
      },
      {
        path: 'product/:productId',
        element: <ProductPage />
      },
      {
        path: 'thanks',
        element: <ThanksPage />
      },
      {
        path: '*',
        element: <NotFoundPage />
      },
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;

