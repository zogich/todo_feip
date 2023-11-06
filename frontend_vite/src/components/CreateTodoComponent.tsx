import { useState } from "react";
import api from "../api";
import styles from "./styles/CreateTodoComponent.module.css"


function CreateTodoComponent({parent_task = null}){
    const [ todoName, setName ]= useState('');
    const [ todoDescription, setDescription ]= useState('');
    const [isOpen, setIsOpen] = useState(false);

    function handleSubmit(){
        api.post('/api/todo', {name: todoName, description: todoDescription, parentTask: parent_task},
            ).catch(error => console.log(error))
    }
    function handleChangeName(e){
        setName(e.target.value)
    }

    function handleChangeDesctiption(e){
        setDescription(e.target.value)
    }
    let widget;
    if ( isOpen ) {
        widget =  <div className={styles.componentWrapper}>

                <button  onClick={() =>setIsOpen(!isOpen)}>Close</button>
                <input type={"text"} value={todoName} placeholder={'Имя'} onChange={handleChangeName}/>
                <input type={"text"} value={todoDescription} placeholder={'Описание'} onChange={handleChangeDesctiption}/>
                <button onClick={handleSubmit}>Ok</button>
            </div>
    }
    const openButton = <div className={styles.componentWrapper}><button onClick={() => setIsOpen(!isOpen)}>Add task</button></div>


    return isOpen ? widget : openButton
}

export default CreateTodoComponent;