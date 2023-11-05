import Task from '../models/task.ts'
import styles from './styles/TodoItem.module.css'
import { useState } from 'react'
import DropDownList from  './DropdownList.tsx'
import {Link} from "react-router-dom";
import api from "../api";

function todoItem(prop: { taskProp: Task }){

    const [subtasks, setSubtasks] = useState([
    {id: 1, name: "Subtask 1", description: 'KEKW', parent_task: null},
    {id: 2, name: "Subtask 2", description: 'Koool', parent_task: null},
    {id: 3, name: "Subtask 3", description: 'KEKW', parent_task: null}
    ]);

    async function deleteTask(){
        await api.delete(`api/todo/${prop.taskProp.id}`)
    }

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