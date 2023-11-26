import './App.css'
import './components/TodoList.tsx'
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import {useStore} from "effector-react";
import { useEffect, useState } from "react";
import $TokenStore, { acceptAuthentication, getProfile, rejectAuthentication } from "./stores/token";
import api from "./api";
import LoginPage from "./pages/LoginPage";

function App() {
  const tokenStore = useStore($TokenStore);
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();

  rejectAuthentication.watch(()=>{
      setIsAuth(tokenStore.isAuthenticated)
      navigate("/")
  });

  acceptAuthentication.watch(()=>{
      setIsAuth(tokenStore.isAuthenticated);
  })

  getProfile.done.watch(async ({result, params}) =>{
      acceptAuthentication(result);
  })

  getProfile.fail.watch(async ({error, params}) =>{
      console.log(error);
      navigate('/');
  })

  useEffect(() =>{
        getProfile({});

  }, [])

      return isAuth ? (
          <>
              <Header/>
              <Outlet/>
          </>
      ) : <LoginPage/>
}

export default App
