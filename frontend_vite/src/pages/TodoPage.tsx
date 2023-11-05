import { useLoaderData } from "react-router-dom";
import Task from "../models/task.ts"


export default function TodoPage(){

    const todoItem: Task = useLoaderData() as Task

    return <>
        <div>{todoItem.name}</div>
        <div>{todoItem.description}</div>
        </>
}