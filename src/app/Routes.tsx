import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const Products = lazy(() => import('@/pages/products/Products'));
const EditProduct = lazy(() => import('@/pages/edit-product/EditProduct'));
const NewProduct = lazy(() => import('@/pages/new-product/NewProduct'));
const Page404 = lazy(() => import('@/pages/404/Page404'));

const AppRoutes = () => (
  <Routes>
    <Route
      path="/"
      element={
        <Suspense fallback={<div>Loading...</div>}>
          <Products />
        </Suspense>
      }
    />
    <Route
      path="/new-product"
      element={
        <Suspense fallback={<div>Loading...</div>}>
          <NewProduct />
        </Suspense>
      }
    />
    <Route
      path="/products"
      element={
        <Suspense fallback={<div>Loading...</div>}>
          <Products />
        </Suspense>
      }
    />
    <Route
      path="/products/:id"
      element={
        <Suspense fallback={<div>Loading...</div>}>
          <EditProduct />
        </Suspense>
      }
    />
    <Route path="*" element={<Page404 />} />
  </Routes>
);
export default AppRoutes;
