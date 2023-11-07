
interface Task{
    id: number;
    parentTask: number | null;
    name: string;
    description: string;
    isDone: boolean;
}

export default Task