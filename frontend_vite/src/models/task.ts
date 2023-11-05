
interface Task{
    id: number;
    parent_task: number | null;
    name: string;
    description: string;
    isDone: boolean;
}

export default Task