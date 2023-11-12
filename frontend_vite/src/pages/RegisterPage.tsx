import {useState} from "react";
import api from "../api";
import styles from "./styles/RegisterPage.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { acceptAuthentication } from "../stores/token";

function RegisterPage(){

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigate();

    function handleChangeLogin(e){
        setLogin(e.target.value)
    }
    function handleChangePassword(e){
        setPassword(e.target.value)
    }

    async function signUP(){
        await api.post('/auth/signup', {username: login, password: password}).then(response => {
            console.log(response)
        })
        .catch(error=>{
            console.log(error)
        })

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
        navigation('/')
    }

    return <>
        <div className={styles['register-page']}>
        <input type={"text"} value={login} onChange={handleChangeLogin}/>
        <input type={"password"} value={password} onChange={handleChangePassword}/>
        <button onClick={signUP}>Зарегистрироваться</button>
            <Link to={'/'}>Назад</Link>
        </div>
    </>
}

export default RegisterPage