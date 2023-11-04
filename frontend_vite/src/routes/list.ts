
export function fetchByUser(){
    return [
        {id: 1, name: "Task 1", description: 'KEKW', parent_task: null},
        {id: 2, name: "Task 2", description: 'Koool', parent_task: null},
        {id: 3, name: "Task 3", description: 'KEKW', parent_task: null},
        {id: 1, name: "Task 1", description: 'KEKW', parent_task: null},
        {id: 2, name: "Task 2", description: 'Koool', parent_task: null},
        {id: 3, name: "Task 3", description: 'KEKW', parent_task: null},
        {id: 1, name: "Task 1", description: 'KEKW', parent_task: null},
        {id: 2, name: "Task 2", description: 'Koool', parent_task: null},
        {id: 3, name: "Task 3", description: 'KEKW', parent_task: null},
        {id: 1, name: "Task 1", description: 'KEKW', parent_task: null},
        {id: 2, name: "Task 2", description: 'Koool', parent_task: null},
    ]
}


export function listLoader() {
    return fetchByUser()
}