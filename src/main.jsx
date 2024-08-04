import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Root from './routes/root.jsx';
import ErrorPage from './error-page.jsx';
import Contact from './routes/contact.jsx';
import { Login } from './pages/login.jsx';
import { Signup } from './pages/signup.jsx';
import { Dashboard } from './pages/dashboard.jsx';
import RootAsset from './pages/asset/rootAsset.jsx';
import ProductsPage from './pages/products.jsx';
import OrdersPage from './pages/orders.jsx';
import AssetsPage from './pages/assets.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/contacts/:id",
        element: <Contact />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/assets",
        element: <AssetsPage />,
      },
      {
        path: "/products",
        element: <ProductsPage />,
      },
      {
        path: "/orders",
        element: <OrdersPage />,
      }
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
