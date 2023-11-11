import { createStore, createEvent } from "effector";
import Task from "../models/task";
import {userSetted} from "./token";
import api from "../api";

export const setTodoList = createEvent<Task[]>();
export const setCurrentTask = createEvent<Task>();
export const setCurrentSubtasks = createEvent<Task[]>();
export const setUserId = createEvent<number>();


type TodoStore = {
    user_id: number;
    todo_list: Task[];
    current_task: Task | null;
    current_subtasks: Task[];
}

userSetted.watch(async (user_id) =>{
            await api.get(`/api/todo/byuser/`, {params:{user_id: user_id}} ).then(
                response =>{
                    setTodoList(response.data)
            }

    )})

const todoStore = createStore<TodoStore>({
    user_id: -1,
    todo_list: [],
    current_task: null,
    current_subtasks: []
}).on(setTodoList, (state, todoList)=>{
    state.todo_list = todoList;
}).on(setCurrentTask, (state, task) => {
    state.current_task = task;
}).on(setCurrentSubtasks, (state, subtasks) =>{
    state.current_subtasks = subtasks;
}).on(setUserId, (state, id) =>{
    state.user_id = id
})

export default todoStore