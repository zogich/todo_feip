import {useState} from "react";
import api from "../api";
import { acceptAuthentication } from "../stores/token";
import $tokenStore from "../stores/token"
import { useStore } from "effector-react";
import { useNavigate } from "react-router-dom";

function LoginPage(){
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

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
                acceptAuthentication();
            }
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