import axios from "axios";
// import { parseCookies } from "nookies";

// const { "codaedorme.token": token } = parseCookies();

export const api = axios.create({
  baseURL: "http://localhost:8080",
});

// api.interceptors.request.use((config) => {
//   console.log(config);

//   return config;
// });

// if (token) {
//   api.defaults.headers["Authorization"] = `Bearer " + ${token}`;
// }

// Spring bloqueia requisições com token para rotas públicas, talvez seja mais efetivo adicionar apenas nas rotas necessárias
