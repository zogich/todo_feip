import Task from '../models/task.ts'
import styles from './styles/TodoItem.module.css'
import { useState, useEffect } from 'react'
import DropDownList from  './DropdownList.tsx'
import {Link} from "react-router-dom";
import api from "../api";
import { removeTask, updateTask } from "../stores/todo";

function TodoItem(prop: { taskProp: Task }){

    const [subtasks, setSubtasks] = useState([]);
    const [isDone, setIsDone] = useState(prop.taskProp.isDone)
    const [taskName, setTaskName] = useState(prop.taskProp.name)

    async function handleUpdStatus(){
        prop.taskProp.isDone = !isDone
        setIsDone(!isDone)
        updateTask(prop.taskProp)
    }

    updateTask.watch(async (task)=>{
        if (prop.taskProp.id === task.id){
            prop.taskProp.isDone = task.isDone
            prop.taskProp.name = task.name
            setIsDone(task.isDone)
            setTaskName(task.name)
        }
    })

    async function deleteTask(){
        removeTask(prop.taskProp.id)
    }

    async function getSubtasks(){
        await api.get('api/todo/byparent', {params:{parent_id: prop.taskProp.id}}).then(response=>{
            setSubtasks(response.data)
        }).catch(error => console.log(error))
    }

    useEffect(() => {getSubtasks()}, [])

    return <>
        <div className={styles.card}>
            <div className={styles['task-details']}>
                <div className={styles['name-with-access-button']}>
                    <input type={"checkbox"} defaultChecked={isDone} onChange={handleUpdStatus} />
                    <Link to={`item/${prop.taskProp.id}`}>
                        <div>{taskName}</div>
                    </Link>
                </div>
                {subtasks?.length ?
                        <DropDownList subtasksProp={subtasks}/>
                    : null}

            </div>
            <div className={styles['action-block']}>
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