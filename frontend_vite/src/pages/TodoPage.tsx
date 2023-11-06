import { useLoaderData } from "react-router-dom";
import Task from "../models/task.ts"
import styles from './TodoPage.module.css'
import SubtaskList from '../components/SubtaskList.tsx'

export default function TodoPage(){

    const todoItem: Task = useLoaderData() as Task

    return <div className={styles.wrapper}>
        <div className={styles.name}>{todoItem.name}</div>
        <div className={styles.description}>{todoItem.description}</div>
        <SubtaskList parentTaskId={todoItem.id}/>
        </div>
}