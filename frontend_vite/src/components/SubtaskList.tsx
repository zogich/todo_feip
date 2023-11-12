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
            console.log(element.isDone)
        }} />
            <Link to={`/item/${element.id}`}>
            {element.name}
            </Link>
            <button onClick={() => deleteSubtask(element.id)}>Удалить</button>
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