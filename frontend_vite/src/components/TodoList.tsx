import Task from '../models/task.ts'
import TodoItem from  './TodoItem.tsx'
import styles from './styles/TodoList.module.css'
import { useLoaderData } from "react-router-dom";
import CreateTodoComponent from "./CreateTodoComponent";
import { useStore } from "effector-react";
import $todoStore, { setTodoList, setCurrentTask } from "../stores/todo";
import api from "../api";


function TodoList(){
    const todoStore = useStore($todoStore)
    setTodoList(useLoaderData() as Task[])
    setCurrentTask(null);

    const items = todoStore.todo_list.map(element => <TodoItem key={element.id} taskProp={element} />)

    return <>
        <div>
        <CreateTodoComponent/>
        <div className={styles.listBody}>{items}</div>
        </div>
    </>
}

export default TodoList