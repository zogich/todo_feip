import { useState } from "react";
import api from "../api";
import Task from "../models/task";
function CreateTodoComponent(){
    const [ todoName, setName ]= useState('');
    const [ todoDescription, setDescription ]= useState('');

    function handleSubmit(){
        api.post('/api/todo', {name: todoName, description: todoDescription},
            ).then(
            response => console.log(response)
        ).catch(error => console.log(error))
    }
    function handleChangeName(e){
        setName(e.target.value)
    }

    function handleChangeDesctiption(e){
        setDescription(e.target.value)
    }

    return (
        <div>
            <input type={"text"} value={todoName} onChange={handleChangeName}/>
            <input type={"text"} value={todoDescription} onChange={handleChangeDesctiption}/>
            <input type={"button"} onClick={handleSubmit}/>
        </div>
    )
}

export default CreateTodoComponent