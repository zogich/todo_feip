import axios from "axios";
import {rejectAuthentication} from "./stores/token";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

axios.defaults.baseURL = BASE_URL;
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.xsrfCookieName = 'csrftoken';

const api = axios.create({
  headers: { "Content-Type": "application/json" },
  baseURL: BASE_URL,
  xsrfHeaderName: 'X-CSRFToken',
  xsrfCookieName: 'csrftoken',
});

api.interceptors.request.use(async config => {
  if (config.url == '/auth/login')
    return config;

  if (!localStorage.getItem('refresh')) {
    rejectAuthentication();
    return config;
  }

  if ((localStorage.getItem('access')))
    await axios.post(
      'auth/verify',
      { token: (localStorage.getItem('access')) }
    ).then(() => {

      config.headers['Authorization'] = 'Bearer ' + (localStorage.getItem('access'));
    }).catch(() => {
      localStorage.setItem('access', '');
    });

  if (!localStorage.getItem('access')) {
    const refresh = (localStorage.getItem('refresh'));

    await axios.post(
      'auth/refresh',
      { refresh: localStorage.getItem('refresh') }
    ).then(response => {
        localStorage.setItem('access', response.data.access);
        config.headers['Authorization'] = 'Bearer ' + (localStorage.getItem('access'));
      }
    ).catch(() => {
      localStorage.setItem('refresh', '');
      rejectAuthentication();

    });

    if (!localStorage.getItem('refresh'))
      await axios.post('auth/blacklist', { refresh: refresh });

  }
  return config;
})


export default api