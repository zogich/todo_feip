import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import TodoList from './components/TodoList.tsx'
import { listLoader } from "./routes/list";
import './index.css';
import TodoPage from './pages/TodoPage.tsx';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

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
        element: <TodoPage/>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
