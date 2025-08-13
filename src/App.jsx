import { RouterProvider } from "react-router-dom";
import Router from "./Routes/Routes";
import "./App.css";
import UserContextProvider from "./Contexts/UserContext";

function App() {
    return (
        <UserContextProvider>
            <RouterProvider router={Router} />
        </UserContextProvider>
    );
}

export default App;
