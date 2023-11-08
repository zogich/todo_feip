import { createStore, createEvent } from "effector";

type TokenStore = {
    isAuthenticated: boolean
}

export const acceptAuthentication = createEvent<boolean>();
export const rejectAuthentication = createEvent<boolean>();

const tokenStore = createStore<TokenStore>({
    isAuthenticated: false
}).on(acceptAuthentication, (state) =>{
    state.isAuthenticated = true;
}).on(rejectAuthentication, (state) =>{
    state.isAuthenticated = false;
})

export default tokenStore