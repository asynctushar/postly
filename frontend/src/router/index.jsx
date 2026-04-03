import { createBrowserRouter } from "react-router";
import App from "../App";
import authRoutes from "./auth.route";
import privateRoutes from "./private.route";
import NotFound from "../pages/NotFound";
import PrivateGuard from "../components/guard/Private.guard";
import AuthGuard from "../components/guard/Auth.guard";
import UserLayout from "../components/layout/UserLayout";

const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            // un-authenticated users only
            {
                element: <AuthGuard />,
                children: authRoutes
            },

            // Authenticated users only
            {
                element: <PrivateGuard />,
                children: [
                    {
                        element: <UserLayout />,
                        children: privateRoutes,
                    },
                ],
            },
            { path: "*", Component: NotFound },
        ],
    },
]);

export default router;
