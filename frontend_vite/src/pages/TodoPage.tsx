import { useLoaderData } from "react-router-dom";
import Task from "../models/task.ts"
import styles from './TodoPage.module.css'

export default function TodoPage(){

    const todoItem: Task = useLoaderData() as Task

    return <div className={styles.wrapper}>
        <div className={styles.name}>{todoItem.name}</div>
        <div className={styles.description}>{todoItem.description}</div>
        </div>
}