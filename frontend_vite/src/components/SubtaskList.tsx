import Task from "../models/task";
import CreateTodoComponent from "./CreateTodoComponent";
import { Link } from "react-router-dom";
import styles from './styles/SubtaskList.module.css'


function SubtaskList( prop: {subtasks: Task[], parentTaskId}){

    const list = prop.subtasks.map(element => <div key={element.id} className={styles.subtodoItem}>
            <Link to={`/item/${element.id}`}>
            {element.name}
            </Link>
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