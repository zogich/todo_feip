import Task from '../models/task.ts'
import TodoItem from  './TodoItem.tsx'
import styles from './styles/TodoList.module.css'
import { useLoaderData } from "react-router-dom";
import CreateTodoComponent from "./CreateTodoComponent";
import { useList, useStore } from "effector-react";
import $todoStore, { setTodoList, setCurrentTask, createNewTask } from "../stores/todo";
import { useEffect, useState } from "react";

function TodoList(){
    const todoStore = useStore($todoStore)
    const [todoList, setList] = useState([])

    setTodoList.watch(()=>{
        setList(todoStore.todo_list)
    })

    createNewTask.watch((newTask)=>{
       setTodoList([...todoList, newTask])
    })

    useEffect(()=>{
        setList(todoStore.todo_list)
    }, [])

    setCurrentTask(null);
    return <>
        <div>
        <CreateTodoComponent/>
        <div className={styles.listBody}>{
            todoList.map(element => <TodoItem key={element.id} taskProp={element} />)
        }</div>
        </div>
    </>
}

export default TodoList