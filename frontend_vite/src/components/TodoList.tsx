import Task from '../models/task.ts'
import TodoItem from  './TodoItem.tsx'
import styles from './TodoList.module.css'
import CreateTodoComponent from "./CreateTodoComponent";
import { useStore } from "effector-react";
import $todoStore, { setTodoList, setCurrentTask, createNewTask, removeTask } from "../stores/todo";
import { useEffect, useState } from "react";

function TodoList(){
    const todoStore = useStore($todoStore)
    const [todoList, setList] = useState([])

    removeTask.watch((task_id) =>{
        setList(todoList.filter(element => element.id != task_id))
    })

    setTodoList.watch(()=>{
        setList(todoStore.todo_list)
    })

    createNewTask.watch((newTask)=>{
        const task: Task = newTask as Task;
        if (task.parentTask){
            return;
        }
       setTodoList([...todoList, task])
    })

    useEffect(()=>{
        setList(todoStore.todo_list)
    }, [])

    setCurrentTask(null);
    return <>
        <div>
        <CreateTodoComponent/>
        <div className={styles['list-body']}>{
            todoList.map(element => <TodoItem key={element.id} taskProp={element} />)
        }</div>
        </div>
    </>
}

export default TodoList