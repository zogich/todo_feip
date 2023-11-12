import Task from "../models/task";
import CreateTodoComponent from "./CreateTodoComponent";
import { Link } from "react-router-dom";
import styles from './styles/SubtaskList.module.css'
import { updateTask } from "../stores/todo";
import { removeTask } from "../stores/todo";
import { useEffect, useState } from "react";


function SubtaskList( prop: {subtasks: Task[], parentTaskId}){

    const [subtaskState, setSubtaskState] = useState([])
    useEffect(()=>{setSubtaskState(prop.subtasks)
    }, [prop.subtasks])

    async function updateSubtaskChecked(subtask: Task){
       subtask.isDone = !subtask.isDone
       updateTask(subtask)
    }

    async function deleteSubtask(subtaskId: number){
        setSubtaskState(subtaskState.filter(element => element.id !=subtaskId))
        removeTask(subtaskId)
    }

    const list = subtaskState.map(element => <div key={element.id} className={styles.subtodoItem}>
        <input type={"checkbox"} defaultChecked={element.isDone} onChange={() => {
            updateSubtaskChecked(element);
        }} />
            <Link to={`/item/${element.id}`}>
            {element.name}
            </Link>
            <button onClick={() => deleteSubtask(element.id)}>
                <svg width="30px" height="30px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#ffffff">

<g id="SVGRepo_bgCarrier" stroke-width="0"/>

<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>

<g id="SVGRepo_iconCarrier"> <title>Close</title> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Close"> <rect id="Rectangle" fill-rule="nonzero" x="0" y="0" width="24" height="24"> </rect> <line x1="16.9999" y1="7" x2="7.00001" y2="16.9999" id="Path" stroke="#ffffff" stroke-width="2" stroke-linecap="round"> </line> <line x1="7.00006" y1="7" x2="17" y2="16.9999" id="Path" stroke="#ffffff" stroke-width="2" stroke-linecap="round"> </line> </g> </g> </g>

</svg>
            </button>
        </div>)
    return <div className={styles.listWrapper}>
        <div className={styles.listBody}>
        {list}
        </div>
        <div className={styles.createTodo}>
        <CreateTodoComponent parent_task={prop.parentTaskId} />
        </div>
    </div>
}

export default SubtaskList