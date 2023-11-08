import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import TodoList from './components/TodoList.tsx'
import { listLoader } from "./routes/list";
import { pageLoader, setupApp } from "./routes/todopage";
import './index.css';
import TodoPage from './pages/TodoPage.tsx';
import LoginPage from "./pages/LoginPage";

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
        loader: listLoader
      },
      {
        path: "/item/:id",
        element: <TodoPage/>,
        loader: pageLoader
      }
    ]
  },
  {
    path: "/register",
    element: <RegisterPage/>
  },
  {
    path: "/login",
    element: <LoginPage/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
