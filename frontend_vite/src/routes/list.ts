import api from "../api";



export async function listLoader() {
    const response = await api.get('/api/todo')
    return response.data
}