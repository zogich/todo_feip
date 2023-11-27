import { useState } from "react";
import { acceptAuthentication, getTokens } from "../stores/token";
import styles from "./LoginPage.module.css"
import { Link } from "react-router-dom";

function LoginPage(){
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    function handleChangeLogin(e){
        setLogin(e.target.value)
    }

    function handleChangePassword(e){
        setPassword(e.target.value)
    }

    getTokens.done.watch(async ({result, params}) =>{
        acceptAuthentication(result);
    });

    getTokens.fail.watch(async ({error, params}) =>{
        if (error.code == 'ERR_BAD_REQUEST') {
            setErrorMessage('Неверный логин или пароль');
        }
    })

    async function logIn(){
        await getTokens({username: login, password: password});
    }

    function handleSubmit(e){
        e.preventDefault();
        logIn();
    }
    return <>
        <div className={styles['login-page']}>
        <form onSubmit={handleSubmit}>
        <input className={styles} type={"text"} value={login} onChange={handleChangeLogin} placeholder={'Введите логин'}/>
        <input type={"password"} value={password} onChange={handleChangePassword} placeholder={'Введите пароль'}/>
            {errorMessage}
        <button onClick={logIn}>Войти</button>
        </form>
         <Link to={"/register"}>Зарегистрироваться</Link>
        </div>
    </>

}
export default LoginPage;