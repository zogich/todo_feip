import Task from '../models/task.ts'
import TodoItem from  './TodoItem.tsx'
import styles from './styles/TodoList.module.css'
import { useLoaderData } from "react-router-dom";
import CreateTodoComponent from "./CreateTodoComponent";


function TodoList(){
    const todoList  = useLoaderData();
    const items = todoList.map(element => <TodoItem key={element.id} taskProp={element} />)
    return <>
        <div>
        <CreateTodoComponent/>
        <div className={styles.listBody}>{items}</div>
        </div>
    </>
}

export default TodoList