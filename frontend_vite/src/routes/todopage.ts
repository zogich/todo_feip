import api from "../api";

export async function pageLoaderById({ params }){
    const response = await api.get(`api/todo/${params.id}`, )
    return response.data
}
