import axios from "axios";
import { getAuth } from "firebase/auth";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

// Automatically attach Firebase token
axiosInstance.interceptors.request.use(
    async (config) => {
        const auth = getAuth();
        const currentUser = auth.currentUser;

        if (currentUser) {
            const token = await currentUser.getIdToken();
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;
