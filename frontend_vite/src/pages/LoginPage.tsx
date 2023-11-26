import {useState} from "react";
import { acceptAuthentication, getTokens } from "../stores/token";
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

    getTokens.done.watch(async ({result, params}) =>{
        acceptAuthentication(result);
    });

    async function logIn(){
        await getTokens({username: login, password: password});

    }

    return <>
        <div className={styles['login-page']}>
        <input type={"text"} value={login} onChange={handleChangeLogin} placeholder={'Введите логин'}/>
        <input type={"password"} value={password} onChange={handleChangePassword} placeholder={'Введите пароль'}/>
        <button onClick={logIn}>Войти</button>
         <Link to={"/register"}>Зарегистрироваться</Link>
            </div>
    </>

}
export default LoginPage