# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:


## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
## API configuration

- Development: Vite proxies requests from `/persons` to the backend defined in `vite.config.js`.
- Production: set `VITE_API_BASE` to your backend base URL (for example `https://api.example.com/persons`).

This project exposes a centralized axios instance at `src/configAxios/axios.create.js` which:

- Uses `import.meta.env.VITE_API_BASE || '/persons'` as `baseURL`.
- Adds a request header `X-Client-Timestamp` for debugging.
- Logs API errors to the console in development via a response interceptor.

To override the API base in production, create a `.env` file with:

VITE_API_BASE=https://api.example.com/persons
