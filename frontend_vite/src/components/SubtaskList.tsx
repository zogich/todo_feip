import { useEffect, useState } from "react";
import api from "../api";
import Task from "../models/task";
import CreateTodoComponent from "./CreateTodoComponent";
import { Link } from "react-router-dom";


function SubtaskList( prop: {subtasks: Task[], parentTaskId}){

    const list = prop.subtasks.map(element => <div key={element.id}>
            <Link to={`/item/${element.id}`}>
            {element.name}
            </Link>
        </div>)
    return <>
        <CreateTodoComponent parent_task={prop.parentTaskId}/>
        {list}
    </>
}

export default SubtaskList