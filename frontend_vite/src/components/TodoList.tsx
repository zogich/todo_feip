import Task from '../models/task.ts'
import TodoItem from  './TodoItem.tsx'
import styles from './TodoList.module.css'
import { useLoaderData } from "react-router-dom";



function TodoList(){
    const todoList  = useLoaderData();
    const items = todoList.map(element => <TodoItem key={element.id} taskProp={element} />)
    return <>
        <div className={styles.listBody}>{items}</div>
    </>
}

export default TodoList