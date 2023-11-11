import api from "../api";

export async function listLoader() {
    const response = await api.get('/api/todo/byuser', )
    return response.data
}