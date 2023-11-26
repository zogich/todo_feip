import { createStore, createEvent, createEffect } from "effector";
import User from "../models/user";
import api from "../api";

type TokenStore = {
    isAuthenticated: boolean;
    user: User | null;
}
export const acceptAuthentication = createEvent<User>();
export const rejectAuthentication = createEvent();

export const getTokens = createEffect(async (params) =>{
    await api.post('/auth/login', {username: params.username, password: params.password}).then(response =>{
         localStorage.setItem('access', response.data.access);
         localStorage.setItem('refresh', response.data.refresh);
    });
    const response = await api.get('/auth/profile');
    return response.data;
});

export const getProfile = createEffect(async () =>{
    const response = await api.get('/auth/profile');
    return response.data;
})


const tokenStore = createStore<TokenStore>({
    isAuthenticated: false,
    user: null
}).on(acceptAuthentication, (state, user ) =>{
    state.isAuthenticated = true;
    state.user = user;
}).on(rejectAuthentication, (state) =>{
    localStorage.setItem('refresh', '');
    localStorage.setItem('access', '');
    state.isAuthenticated = false;
    state.user = null;
})

export default tokenStore