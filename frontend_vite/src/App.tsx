import './App.css'
import './components/TodoList.tsx'
import { Outlet } from "react-router-dom";
import Header from "./components/Header";


function App() {
  return (
    <>
        <Header/>
        <Outlet/>
        <div>FOOTER</div>
    </>
  )
}

export default App
