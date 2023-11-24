import {useState} from "react";
import api from "../api";
import { acceptAuthentication } from "../stores/token";
import styles from "./LoginPage.module.css"
import { Link } from "react-router-dom";

function LoginPage(){
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    function handleChangeLogin(e){
        setLogin(e.target.value)
    }

    function handleChangePassword(e){
        setPassword(e.target.value)
    }

    async function logIn(){
        await api.post('/auth/login', {username: login, password: password}).then(
            response => {
                localStorage.setItem('access', response.data.access);
                localStorage.setItem('refresh', response.data.refresh);
            }
        ).catch(
            error => {
                console.log(error)
                return;
            }
        )
        await api.get('/auth/profile').then(
            response =>{
                acceptAuthentication(response.data)
            }).catch(error => {
            console.log(error)
        })

    }

    return <>
        <div className={styles['login-page']}>
        <input type={"text"} value={login} onChange={handleChangeLogin}/>
        <input type={"password"} value={password} onChange={handleChangePassword}/>
        <button onClick={logIn}>Войти</button>
         <Link to={"/register"}>Зарегистрироваться</Link>
            </div>
    </>

}
export default LoginPage