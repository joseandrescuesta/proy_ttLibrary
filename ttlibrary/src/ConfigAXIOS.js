import axios from "axios";

const iAx = axios.create({
    baseURL: 'http://localhost:2000/api',
    headers: { 'Content-Type': 'application/json' }
})
// INTERCEPTOR DE REQUEST
iAx.interceptors.request.use(
    config => {
        console.log(config)
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// INTERCEPTOR DE RESPUESTA
iAx.interceptors.response.use(
    response => {
        return (response);
    },
    error => {
        // manejo errores de respuesta
        if (error.response && error.response.stats === 401) {
            // Redirigir a la pagina de inicio.
            window.location.href = '/app'
        }
        return (Promise.reject(error))
    }
);

export default iAx;