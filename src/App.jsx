import { RouterProvider } from "react-router-dom";
import Router from "./Routes/Routes";
import "./App.css";
import UserContextProvider from "./Contexts/UserContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
export const queryClient = new QueryClient();
function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <UserContextProvider>
                <RouterProvider router={Router} />
            </UserContextProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}

export default App;
