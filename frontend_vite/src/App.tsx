import './App.css'
import './components/TodoList.tsx'
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Header from "./components/Header";
import {useStore} from "effector-react";
import { useEffect, useState } from "react";
import $TokenStore, { acceptAuthentication, rejectAuthentication } from "./stores/token";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "./api";
import { setUserId } from "./stores/todo";


function App() {
  const tokenStore = useStore($TokenStore)
  const [isAuthenticated, setIsAuth] = useState(false)

  useEffect(() =>{
      const log = true
      if (log){
          setIsAuth(log)
      }
  }, [])

      return (
          <>
              <Header/>
              <Outlet/>
              <div>FOOTER</div>
          </>
      )
}

export default App
