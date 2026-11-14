18. Running & Connecting to ASP.NET Core 10 Web API

1.  Install and start locally:
    npm install
    cp .env.example .env
    npm run dev
2.  Switch from Mock Data to your ASP.NET Core 10 API:
      - Set VITE_USE_MOCK_DATA=false and
        VITE_API_BASE_URL=https://localhost:7001/api in .env.
      - Update route paths in src/shared/api/apiEndpoints.ts (or via VITE_EP_*
        environment variables) to match your ASP.NET Core controllers.
      -src/shared/api/axiosInstance.ts automatically attaches Authorization: Bearer
        <token> on every request and handles 401 token cleanup cleanly.