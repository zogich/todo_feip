import api from "../api";

export async function pageLoader({ params }){
    const response_todo = await api.get(`api/todo/${params.id}`, )
    return response_todo.data
}
