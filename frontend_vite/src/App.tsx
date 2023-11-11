import './App.css'
import './components/TodoList.tsx'
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import {useStore} from "effector-react";
import { useEffect, useState } from "react";
import $TokenStore, { acceptAuthentication, userSetted, rejectAuthentication } from "./stores/token";
import api from "./api";
import LoginPage from "./pages/LoginPage";

function App() {
  const tokenStore = useStore($TokenStore);
  const [isAuth, setIsAuth] = useState(false);
  
  rejectAuthentication.watch(()=>{
      setIsAuth(tokenStore.isAuthenticated)
  })

  userSetted.watch(()=>{
      setIsAuth(tokenStore.isAuthenticated)
  })

  useEffect(() =>{
        async function setStore(){
            await api.get('/auth/profile').then(
            response => {
                acceptAuthentication(response.data)
                return;
            }
        ).catch(error => {
                return
            })
        }
        setStore()

  }, [])

      return isAuth ? (
          <>
              <Header/>
              <Outlet/>
          </>
      ) : <LoginPage/>
}

export default App
