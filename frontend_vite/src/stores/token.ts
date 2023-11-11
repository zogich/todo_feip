import { createStore, createEvent } from "effector";
import User from "../models/user";

type TokenStore = {
    isAuthenticated: boolean;
    user: User | null;
}
export const userSetted = createEvent()
export const acceptAuthentication = createEvent<User>();
export const rejectAuthentication = createEvent();
export const updateTask = createEvent();

const tokenStore = createStore<TokenStore>({
    isAuthenticated: false,
    user: null
}).on(acceptAuthentication, (state, user ) =>{
    state.isAuthenticated = true;
    state.user = user;
    userSetted(user.id)
}).on(rejectAuthentication, (state) =>{
    localStorage.setItem('refresh', '');
    localStorage.setItem('access', '');
    state.isAuthenticated = false;
    state.user = null;
})

export default tokenStore