import api from "../api";

export async function pageLoader({ params }){

    const response_todo = await api.get(`api/todo/${params.id}`, )
    return response_todo.data
}

/*export async function setupApp(){
    if ( localStorage.getItem('access')){
            api.get('auth/profile').then(response =>{
                setUserId(response.data.id)
                acceptAuthentication()
            }).catch(error => {

                rejectAuthentication()
            })
        }
    return null
}

 */
