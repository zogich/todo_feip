import Task from "../models/task.ts"
import styles from './TodoPage.module.css'
import SubtaskList from '../components/SubtaskList.tsx'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import api from "../api";
import { setCurrentTask } from "../stores/todo";
import {createNewTask, getCurrentTask} from "../stores/todo";
import { updateTask } from "../stores/todo";

export default function TodoPage(){
    const routeParams = useParams();
    const [todoItem, setTodoItem]: Task = useState({});
    const [editTodoItem, setEditTodoItem]: Task = useState({});
    const [subtasks, setSubtasks]: Task = useState([]);

    //! checked if subtask
    createNewTask.done.watch(({result, params})=>{
        setSubtasks([...subtasks, result])
    })

    getCurrentTask.done.watch(async ({result, params}) =>{
        setTodoItem(result);
        setEditTodoItem(result);
        setCurrentTask(result);
    })

    useEffect(()=>{

        async function getSubtaskList(){
            await  api.get('/api/todo/byparent', {params:{parent_id: routeParams.id}}).then(
                response =>{
                    setSubtasks(response.data);
                }
            ).catch(error => console.log(error))
        }

        getCurrentTask(routeParams.id);
        getSubtaskList();
    }, [routeParams])

    function handleChangeName(e){
        setEditTodoItem({...editTodoItem, name: e.target.value})
    }

    function handleChangeDescription(e){
        setEditTodoItem({...editTodoItem, description: e.target.value })
    }
    function handleChangeIsDone(){
        setEditTodoItem({...editTodoItem, isDone: !editTodoItem.isDone})
    }

    async function updTask(){
        updateTask(editTodoItem)
        setTodoItem({...editTodoItem})
    }

    function isChanged(){
        if (  todoItem.name != editTodoItem.name || todoItem.description != editTodoItem.description
        || todoItem.isDone != editTodoItem.isDone){
            return <button className={styles['update-button']} onClick={updTask}>Update</button>
        }
        return null
    }


    return <div className={styles.wrapper}>
        <div className={styles.name}>
            <input type={"checkbox"} checked={editTodoItem.isDone} onChange={handleChangeIsDone}/>
            <input type={"text"} value={editTodoItem.name} onChange={handleChangeName}/>
        </div>
        <input type={"text"} className={styles.description} value={editTodoItem.description} onChange={handleChangeDescription} />
        {isChanged()}
        <SubtaskList subtasks={subtasks} parentTaskId={todoItem.id}/>
        </div>
}