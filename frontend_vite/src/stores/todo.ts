import { createStore, createEvent } from "effector";
import Task from "../models/task";

export const setTodoList = createEvent<Task[]>();
export const setCurrentTask = createEvent<Task>();
export const setCurrentSubtasks = createEvent<Task[]>();

type TodoStore = {
    user_id: number;
    todo_list: Task[];
    current_task: Task ;
    current_subtasks: Task[]
}

const todoStore = createStore<TodoStore>({
    user_id: -1,
    todo_list: [],
    current_task: {name: "", id: -1, description: '', parent_task: null, isDone: false},
    current_subtasks: []
}).on(setTodoList, (state, todoList)=>{
    state.todo_list = todoList;
}).on(setCurrentTask, (state, task) => {
    state.current_task = task;
}).on(setCurrentSubtasks, (state, subtasks) =>{
    state.current_subtasks = subtasks;
})

export default todoStore