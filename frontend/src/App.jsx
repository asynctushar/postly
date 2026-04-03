import { Suspense } from "react";
import { Outlet } from "react-router";
import ErrorBoundary from "./components/shared/ErrorBoundary";
import Loader from "./components/shared/Loader";
import useAxiosInterceptors from "./hooks/useAxiosInterceptors";

const App = () => {
    useAxiosInterceptors();

    return (
        <ErrorBoundary>
            <Suspense fallback={<Loader />}>
                <Outlet />
            </Suspense>
        </ErrorBoundary>
    );
};

export default App;