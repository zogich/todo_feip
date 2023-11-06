import Task from '../models/task.ts'
import styles from './styles/TodoItem.module.css'
import { useState, useEffect } from 'react'
import DropDownList from  './DropdownList.tsx'
import {Link} from "react-router-dom";
import api from "../api";

function todoItem(prop: { taskProp: Task }){

    const [subtasks, setSubtasks] = useState([]);

    async function deleteTask(){
        await api.delete(`api/todo/${prop.taskProp.id}`)
    }

    async function getSubtasks(){
        await api.get('api/todo/byparent', {params:{parent_id: prop.taskProp.id}}).then(response=>{
            setSubtasks(response.data)
        }).catch(error => console.log(error))
    }

    useEffect(() => {getSubtasks()}, [])

    return <>
        <div className={styles.card}>
            <div className={styles.taskDetails}>
                <div className={styles.nameWithAccessButton}>
                    <input type={"checkbox"}/>
                    <Link to={`item/${prop.taskProp.id}`}>
                        <div>{prop.taskProp.name}</div>
                    </Link>
                </div>
                {subtasks?.length ?
                        <DropDownList subtasksProp={subtasks}/>
                    : null}

            </div>
            <div className={styles.actionBlock}>
                <button>Change</button>
                <button onClick={deleteTask}>Delete</button>
            </div>

        </div>
    </>
}

export default todoItem