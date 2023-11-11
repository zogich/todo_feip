import styles from './styles/Header.module.css'
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import $todoStore, {setCurrentTask} from '../stores/todo';
import {useStore} from "effector-react";
import {rejectAuthentication} from "../stores/token";

export default function Header(){
    const routeParams = useParams()

    const store = useStore($todoStore)

    const [navButton, setNavButton] = useState(<></>)

    function logOut(){
        rejectAuthentication();
    }

    setCurrentTask.watch(()=>{
        if (store.current_task) {
            if (store.current_task?.parentTask) {
                setNavButton(<Link to={`/item/${store.current_task.parentTask}`}>Назад</Link>)
            } else {
                setNavButton(<Link to={`/`}>Назад</Link>)
            }
        }
        else {
            setNavButton(<></>)
        }
    })

    useEffect(()=>{
        if (store.current_task){
            if ( store.current_task.parentTask){
                setNavButton(<Link to={`/item/${store.current_task.parentTask}`}>Назад</Link>)
            }
            else{
                setNavButton(<Link to={`/`}>Назад</Link>)
            }
        }
        else{
            setNavButton(<></>)
        }
    }, [routeParams, store.current_task])
    return (
            <div className={styles.cap}>
                {navButton}
                <button onClick={logOut}>Logout</button>
            </div>
    )
}