import { useState } from "react";
import styles from "./CreateTodoComponent.module.css"
import $tokenStore from "../stores/token";
import { useStore } from "effector-react";
import {createNewTask} from "../stores/todo";

function CreateTodoComponent({parent_task = null}){
    const [ todoName, setName ]= useState('');
    const [ todoDescription, setDescription ]= useState('');
    const [isOpen, setIsOpen] = useState(false);
    const tokenStore = useStore($tokenStore)

    createNewTask.done.watch(() =>{
        setName('');
        setDescription('');
    })

    function handleSubmit(){
        const newTask ={name: todoName, description: todoDescription,
                parentTask: parent_task, user: tokenStore.user?.id}
        createNewTask(newTask);
    }
    function handleChangeName(e){
        setName(e.target.value)
    }

    function handleChangeDesctiption(e){
        setDescription(e.target.value)
    }
    let widget;
    if ( isOpen ) {
        widget =  <div className={styles['component-wrapper']}>
                <button  onClick={() =>setIsOpen(!isOpen)}>Close</button>
                <input type={"text"} value={todoName} placeholder={'Имя'} onChange={handleChangeName}/>
                <input type={"text"} value={todoDescription} placeholder={'Описание'} onChange={handleChangeDesctiption}/>
                <button onClick={handleSubmit}>Ok</button>
            </div>
    }
    const openButton = <div className={styles['component-wrapper']}><button onClick={() => setIsOpen(!isOpen)}>Add task</button></div>


    return isOpen ? widget : openButton
}

export default CreateTodoComponent;