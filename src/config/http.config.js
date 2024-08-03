import axios from 'axios';

const axiosInstance = axios.create({
    // Aquí puedes agregar cualquier configuración adicional que necesites
});

axiosInstance.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        console.error('API Error:', error);
        // Opcionalmente puedes mostrar un mensaje de error aquí en lugar de redirigir
        if (error.response && error.response.status === 401) {
            // Muestra el error en la consola pero no redirige
            console.warn('Unauthorized - 401');
            // Puedes manejar aquí la redirección o cualquier otra acción si es necesario
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
