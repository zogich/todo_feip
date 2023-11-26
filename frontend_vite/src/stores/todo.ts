import { createStore, createEvent, createEffect } from "effector";
import Task from "../models/task";
import {acceptAuthentication} from "./token";
import api from "../api";

export const setTodoList = createEvent<Task[]>();
export const setCurrentTask = createEvent<Task>();
export const setCurrentSubtasks = createEvent<Task[]>();
export const setUserId = createEvent<number>();

export const createNewTask = createEffect(async (todo) =>{
    const response = await api.post('/api/todo', todo);
    return response.data;
})

export const removeTask = createEvent<number>();
export const updateTask = createEvent<Task>();


type TodoStore = {
    user_id: number;
    todo_list: Task[];
    current_task: Task | null;
    current_subtasks: Task[];
}

acceptAuthentication.watch(async (user) =>{
            await api.get(`/api/todo/byuser/`, {params:{user_id: user.id}} ).then(
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
}).on(removeTask, (state, taskId) =>{
    async function deleteTask(){
        await api.delete(`api/todo/${taskId}`)
    }
    deleteTask()
}).on(updateTask, (state, patched_task) =>{
    async function patchTask() {
        await api.patch(`/api/todo/${patched_task.id}`, { ...patched_task })
    }
    patchTask();
})

export default todoStore