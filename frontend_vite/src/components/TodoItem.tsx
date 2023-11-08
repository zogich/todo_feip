import Task from '../models/task.ts'
import styles from './styles/TodoItem.module.css'
import { useState, useEffect } from 'react'
import DropDownList from  './DropdownList.tsx'
import {Link} from "react-router-dom";
import api from "../api";

function TodoItem(prop: { taskProp: Task }){

    const [subtasks, setSubtasks] = useState([]);
    const [isDone, setIsDone] = useState(prop.taskProp.isDone)

    async function handleUpdStatus(){
        const currentIdDone = isDone
        setIsDone(!isDone)
        await api.patch(`/api/todo/${prop.taskProp.id}`, {...prop.taskProp, isDone: !currentIdDone}).then(
            response => {
            }
        ).catch(error => console.log(error))
    }

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
                    <input type={"checkbox"} checked={isDone} onChange={handleUpdStatus} />
                    <Link to={`item/${prop.taskProp.id}`}>
                        <div>{prop.taskProp.name}</div>
                    </Link>
                </div>
                {subtasks?.length ?
                        <DropDownList subtasksProp={subtasks}/>
                    : null}

            </div>
            <div className={styles.actionBlock}>
                <button onClick={deleteTask}>
                    <svg width="100%" height="100%" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#ffffff">

<g id="SVGRepo_bgCarrier" stroke-width="0"/>

<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>

<g id="SVGRepo_iconCarrier"> <title>Close</title> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Close"> <rect id="Rectangle" fill-rule="nonzero" x="0" y="0" width="24" height="24"> </rect> <line x1="16.9999" y1="7" x2="7.00001" y2="16.9999" id="Path" stroke="#ffffff" stroke-width="2" stroke-linecap="round"> </line> <line x1="7.00006" y1="7" x2="17" y2="16.9999" id="Path" stroke="#ffffff" stroke-width="2" stroke-linecap="round"> </line> </g> </g> </g>

</svg>
                </button>
            </div>

        </div>
    </>
}

export default TodoItem