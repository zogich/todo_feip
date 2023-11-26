import Task from "../models/task";
import { useState } from 'react'
import { Link } from "react-router-dom";
import styles from "./DropdownList.module.css"
import { updateTask } from "../stores/todo";

function DropdownList(prop: {subtasksProp: Task[]}){
    const [isHidden, setValue] = useState(true);

    function handleIsDoneSubtask(subtask: Task){
        subtask.isDone = !subtask.isDone
        updateTask(subtask)
    }

    const subtasksList = prop.subtasksProp.map(element =>
        <div key={element.id} className={styles.item}>
            <input type={"checkbox"} defaultChecked={element.isDone}
             onChange={() => handleIsDoneSubtask(element)} />
            <Link to={`item/${element.id}`}>
                {element.name}
            </Link>
        </div>)
    const openListButton = <button className={styles['dropdown-button']} onClick={() =>setValue(!isHidden)}>+</button>
    return isHidden ? openListButton : <><button className={styles['dropdown-button']} onClick={() => setValue(!isHidden)}>-</button> {subtasksList}</>
}

export default DropdownList