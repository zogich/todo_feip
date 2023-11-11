import './App.css'
import './components/TodoList.tsx'
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Header from "./components/Header";
import {useStore} from "effector-react";
import { useEffect, useState } from "react";
import $TokenStore, { acceptAuthentication } from "./stores/token";
import api from "./api";

function App() {
  const tokenStore = useStore($TokenStore)

  useEffect(() =>{
        async function setStore(){
            await api.get('/auth/profile').then(
            response => {
                acceptAuthentication(response.data)
                return;
            }
        ).catch(error => {
                return null
            })
        }
        setStore()

  }, [])

      return (
          <>
              <Header/>
              <Outlet/>
          </>
      )
}

export default App
