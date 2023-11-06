import Task from "../models/task";
import { useState } from 'react'
import { Link } from "react-router-dom";
import styles from "./styles/DropdownList.module.css"

function dropdownList(prop: {subtasksProp: Task[]}){
    const [isHidden, setValue] = useState(true);
    const subtasksList = prop.subtasksProp.map(element =>
        <div key={element.id} className={styles.item}>
            <input type={"checkbox"}/>
            <Link to={`item/${element.id}`}>
                {element.name}
            </Link>
        </div>)
    const openListButton = <button className={styles.dropdownButton} onClick={() =>setValue(!isHidden)}>+</button>
    return isHidden ? openListButton : <><button className={styles.dropdownButton} onClick={() => setValue(!isHidden)}>-</button> {subtasksList}</>
}

export default dropdownList