import Task from "../models/task";
import { useState } from 'react'
import styles from "./DropdownList.module.css"

function dropdownList(prop: {subtasksProp: Task[]}){
    const [isHidden, setValue] = useState(true);
    const subtasksList = prop.subtasksProp.map(element =>
        <div key={element.id} className={styles.item}>
            <input type={"checkbox"}/>
            {element.name}
        </div>)
    const openListButton = <button className={styles.dropdownButton} onClick={() =>setValue(!isHidden)}>+</button>
    return isHidden ? openListButton : <><button className={styles.dropdownButton} onClick={() => setValue(!isHidden)}>-</button> {subtasksList}</>
}

export default dropdownList