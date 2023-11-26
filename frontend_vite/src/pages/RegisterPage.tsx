import {useState} from "react";
import styles from "./RegisterPage.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { acceptAuthentication, getTokens, registerNewUser } from "../stores/token";

function RegisterPage(){

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigate();

    const [passwordErrorMessage, setPasswordMessage] = useState(<></>)
    const [passwordLengthMessage, setPasswordLenghtMessage] = useState(<></>)

    const [loginErrorMessage, setLoginMessage] = useState(<></>)
    const [loginLengthMessage, setLoginLenghtMessage] = useState(<></>)

    function handleChangeLogin(e){
        setLogin(e.target.value)
    }
    function handleChangePassword(e){
        setPassword(e.target.value)
    }

    function validateLogin(){
        const reg = new RegExp('^[A-Za-z][A-Za-z\\d]+$')
        let validate = true;
        setLoginMessage(<></>);
        setLoginLenghtMessage(<></>);
        if (!reg.test(login)){
            setLoginMessage(<div>Логин должен состоять из латинских букв и цифр и начинаться с буквы.</div>);
            validate = false;
        }
        if ( login.length < 6 || login.length > 20 ){
            setLoginLenghtMessage(<div>Логин должен быть длиной от 6 до 20 символов</div>);
            validate = false;
        }
        return validate
    }

    function validatePassword(){
        const reg = new RegExp('^[A-Za-z][A-Za-z\\d]+$');
        let validate = true;
        setPasswordMessage(<></>);
        setPasswordLenghtMessage(<></>)
        if (!reg.test(password)){
            setPasswordMessage(<div>Пароль должен состоять из латинских букв и цифр и начинаться с буквы.</div>);
            validate = false;
        }
        if ( password.length < 6 || password.length > 20){
            setPasswordLenghtMessage(<div>Пароль должен быть длиной от 6 до 20 символов</div>)
            validate = false;
        }
        return validate;
    }

    registerNewUser.done.watch(async ({result, params}) =>{
        acceptAuthentication(result);
    })


    async function signUP() {
        const isLoginValid = validateLogin();
        const isPasswordValid = validatePassword();
        if (isLoginValid && isPasswordValid) {
            await registerNewUser({ username: login, password: password })
        }
    }

    return <>
        <div className={styles['register-page']}>
        <input type={"text"} value={login} onChange={handleChangeLogin} placeholder={'Введите логин'}/>
            {loginErrorMessage}
            {loginLengthMessage}
        <input type={"password"} value={password} onChange={handleChangePassword} placeholder={'Введите пароль'}/>
            {passwordErrorMessage}
            {passwordLengthMessage}
        <button onClick={signUP}>Зарегистрироваться</button>
            <Link to={'/'}>Назад</Link>
        </div>
    </>
}

export default RegisterPage