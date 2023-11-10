import {useState} from "react";
import api from "../api";
import styles from "./styles/RegisterPage.module.css"

function RegisterPage(){

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    function handleChangeLogin(e){
        setLogin(e.target.value)
    }
    function handleChangePassword(e){
        setPassword(e.target.value)
    }

    async function signUP(){
        await api.post('/auth/signup', {username: login, password: password}).then(response => {
            localStorage.setItem('access', response.data.access)
            localStorage.setItem('refresh', response.data.refresh)
        })
        .catch(error=>{
            console.log(error)
        })
    }

    return <>
        <div className={styles.registerPage}>
        <input type={"text"} value={login} onChange={handleChangeLogin}/>
        <input type={"password"} value={password} onChange={handleChangePassword}/>
        <button onClick={signUP}>Зарегистрироваться</button>
        </div>
    </>
}

export default RegisterPage