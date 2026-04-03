import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const PUBLIC_ROUTES = [
    "/users/login",
    "/users/register",
    "/users/refresh-token",
];

const isPublicRoute = (url = "") =>
    PUBLIC_ROUTES.some((route) => url.includes(route));

const axiosInstance = axios.create({
    baseURL: BASE_URL + "/api/v1",
    withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        error ? prom.reject(error) : prom.resolve(token);
    });
    failedQueue = [];
};

// Attach access token
axiosInstance.interceptors.request.use((config) => {
    if (isPublicRoute(config.url)) return config;

    const token = localStorage.getItem("accessToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// Export a function to register the response interceptor
// so it can receive navigate + setUser from inside the router
export const setupResponseInterceptor = (navigate, setUser) => {
    const interceptor = axiosInstance.interceptors.response.use(
        (res) => res,
        async (error) => {
            const originalRequest = error.config;

            if (isPublicRoute(originalRequest.url)) {
                return Promise.reject(error);
            }

            if (error.response?.status !== 401 || originalRequest._retry) {
                return Promise.reject(error);
            }

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return axiosInstance(originalRequest);
                    })
                    .catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const refreshToken = localStorage.getItem("refreshToken");

                if (!refreshToken) throw new Error("No refresh token");

                const { data } = await axios.post(
                    `${BASE_URL}/api/v1/users/refresh-token`,
                    { refreshToken }
                );

                localStorage.setItem("accessToken", data.accessToken);

                if (data.refreshToken) {
                    localStorage.setItem("refreshToken", data.refreshToken);
                }

                processQueue(null, data.accessToken);

                originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
                return axiosInstance(originalRequest);
            } catch (err) {
                processQueue(err, null);

                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                setUser(null);
                navigate("/login", { replace: true });

                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }
    );

    // Cleanup on unmount
    return () => axiosInstance.interceptors.response.eject(interceptor);
};

export default axiosInstance;