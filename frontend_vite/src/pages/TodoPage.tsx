import { useLoaderData } from "react-router-dom";
import Task from "../models/task.ts"
import styles from './TodoPage.module.css'
import SubtaskList from '../components/SubtaskList.tsx'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import api from "../api";
import { setCurrentTask } from "../stores/todo";

export default function TodoPage(){
    const routeParams = useParams();

    let todoItem: Task = useLoaderData() as Task;
    setCurrentTask(todoItem)

    const [editTodoItem, setEditTodoItem]: Task = useState(todoItem);
    const [subtasks, setSubtasks]: Task = useState([]);

    useEffect( () =>{
        const fetchData = async () =>{
            const response_subtasks = await api.get('/api/todo/byparent', {params:{parent_id: routeParams.id}})
            setSubtasks(response_subtasks.data)
            setEditTodoItem(todoItem)
        }
        fetchData();

    }, [routeParams, todoItem])




    function handleChangeName(e){
        setEditTodoItem({...editTodoItem, name: e.target.value})
    }

    function handleChangeDescription(e){
        setEditTodoItem({...editTodoItem, description: e.target.value })
    }
    function handleChangeIsDone(){
        setEditTodoItem({...editTodoItem, isDone: !editTodoItem.isDone})
    }

    async function updateTask(){
        //todoItem dont change
        await api.patch(`/api/todo/${todoItem.id}`, {...editTodoItem}).then(response =>{
            console.log(response.data)
        })
        todoItem = {...editTodoItem}

    }

    function isChanged(){
        if (  todoItem.name != editTodoItem.name || todoItem.description != editTodoItem.description
        || todoItem.isDone != editTodoItem.isDone){
            return <button onClick={updateTask}>Update</button>
        }
        return null
    }


    return <div className={styles.wrapper}>
        <input type={"checkbox"} checked={editTodoItem.isDone} onChange={handleChangeIsDone}/>
        <input type={"text"} className={styles.name} value={editTodoItem.name} onChange={handleChangeName}/>
        <input type={"text"} className={styles.description} value={editTodoItem.description} onChange={handleChangeDescription} />
        {isChanged()}
        <SubtaskList subtasks={subtasks} parentTaskId={todoItem.id}/>
        </div>
}