import Task from "../models/task.ts"
import styles from './styles/TodoPage.module.css'
import SubtaskList from '../components/SubtaskList.tsx'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import api from "../api";
import { setCurrentTask } from "../stores/todo";
import {createNewTask} from "../stores/todo";
import { updateTask } from "../stores/todo";

export default function TodoPage(){
    const routeParams = useParams();
    const [todoItem, setTodoItem]: Task = useState({});
    const [editTodoItem, setEditTodoItem]: Task = useState({});
    const [subtasks, setSubtasks]: Task = useState([]);

    createNewTask.watch((newSubtask)=>{
        setSubtasks([...subtasks, newSubtask])
    })

    useEffect(()=>{
        async function getCurrentTask(){
            await api.get(`api/todo/${routeParams.id}`).then(response=>{
                setTodoItem(response.data);
                setEditTodoItem(response.data);
                setCurrentTask(response.data);
            }).catch(error => console.log(error))
        }

        async function getSubtaskList(){
            await  api.get('/api/todo/byparent', {params:{parent_id: routeParams.id}}).then(
                response =>{
                    setSubtasks(response.data);
                }
            ).catch(error => console.log(error))
        }

        getCurrentTask();
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
            return <button className={styles.updateButton} onClick={updTask}>Update</button>
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