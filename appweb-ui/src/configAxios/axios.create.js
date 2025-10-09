import axios from "axios";

let base = import.meta.env.VITE_API_BASE || "";

const instance = axios.create({
  baseURL: base,
  headers: {
    "Content-Type": "application/json",
  },
});


instance.interceptors.request.use(
  (config) => {
   config.headers['X-Client-Timestamp'] = new Date().toISOString();
    if (import.meta.env.DEV) {
      console.debug('[API REQ]', { fullUrl: `${config.baseURL || ''}${config.url || ''}`, method: config.method });
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (import.meta.env.DEV) {
      console.error('[API ERROR]', {
        url: error.config?.url,
        method: error.config?.method,
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
    }
    return Promise.reject(error);
  }
);
export default instance;
