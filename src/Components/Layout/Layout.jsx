import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { Toaster } from "react-hot-toast";

function Layout() {
    return (
        <div className=" dark:bg-gray-950/85 dark:text-white bg-gray-100 text-gray-900/50 min-h-screen">
            <Navbar />
            <div className="md:w-2/4 mx-auto pt-8">
                <Toaster />
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;
