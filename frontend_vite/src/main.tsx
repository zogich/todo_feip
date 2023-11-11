import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import TodoList from './components/TodoList.tsx'
import './index.css';
import TodoPage from './pages/TodoPage.tsx';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import RegisterPage from "./pages/RegisterPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "",
        element: <TodoList/>,
      },
      {
        path: "/item/:id",
        element: <TodoPage/>,
      }
    ]
  },
  {
    path: "/register",
    element: <RegisterPage/>
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
