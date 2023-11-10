import Task from "../models/task";
import { useState } from 'react'
import { Link } from "react-router-dom";
import styles from "./styles/DropdownList.module.css"
import api from "../api";

function DropdownList(prop: {subtasksProp: Task[]}){
    const [isHidden, setValue] = useState(true);

    function handleIsDoneSubtask(subtask: Task){
        subtask.isDone = !subtask.isDone
        api.patch(`/api/todo/${subtask.id}`, {...subtask}).then(
            response => console.log(response)).catch(
                error => console.log(error)
        )
    }

    const subtasksList = prop.subtasksProp.map(element =>
        <div key={element.id} className={styles.item}>
            <input type={"checkbox"} defaultChecked={element.isDone}
             onChange={() => handleIsDoneSubtask(element)} />
            <Link to={`item/${element.id}`}>
                {element.name}
            </Link>
        </div>)
            console.log(prop.subtasksProp)
    const openListButton = <button className={styles.dropdownButton} onClick={() =>setValue(!isHidden)}>+</button>
    return isHidden ? openListButton : <><button className={styles.dropdownButton} onClick={() => setValue(!isHidden)}>-</button> {subtasksList}</>
}

export default DropdownList