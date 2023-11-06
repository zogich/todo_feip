import { useEffect, useState } from "react";
import api from "../api";
import CreateTodoComponent from "./CreateTodoComponent";


function SubtaskList( prop: {parentTaskId: number}){
    const [subtasks, setSubtasks] = useState([])

    async function fetchSubtasks(){
        await api.get('/api/todo/byparent', {params: {parent_id: prop.parentTaskId}}).then(response =>
            setSubtasks(response.data)
        )
    }

    useEffect(() => { fetchSubtasks() }, [])

    const list = subtasks.map(element => <div key={element.id}>
            {element.name}
        </div>)
    return <>
        <CreateTodoComponent parent_task={prop.parentTaskId}/>
        {list}
    </>
}

export default SubtaskList