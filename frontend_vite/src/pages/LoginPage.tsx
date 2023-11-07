import {useState} from "react";
import api from "../api";

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
            response => console.log(response)
        ).catch(
            error => console.log(error)
        )
    }

    return <>
        <input type={"text"} value={login} onChange={handleChangeLogin}/>
        <input type={"password"} value={password} onChange={handleChangePassword}/>
        <button onClick={logIn}>Войти</button>
    </>

}
export default LoginPage