import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";
import { set } from "zod";
function Navbar() {
    const { user , setUser} = useContext(UserContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900 shadow">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link
                    to="/"
                    className="flex items-center space-x-3 rtl:space-x-reverse"
                >
                    <img
                        src="https://flowbite.com/docs/images/logo.svg"
                        className="h-8"
                        alt="Flowbite Logo"
                    />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                        Social Media App
                    </span>
                </Link>
                <button
                    data-collapse-toggle="navbar-default"
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-controls="navbar-default"
                    aria-expanded="false"
                >
                    <span className="sr-only">Open main menu</span>
                    <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 17 14"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M1 1h15M1 7h15M1 13h15"
                        />
                    </svg>
                </button>
                <div
                    className="hidden w-full md:block md:w-auto"
                    id="navbar-default"
                >
                    {user ? (
                        <>
                            <div className="relative">
                                {user.photo ? (
                                    <img
                                        id="avatarButton"
                                        type="button"
                                        className="w-10 h-10 rounded-full cursor-pointer"
                                        src={user.photo}
                                        alt="User dropdown"
                                        onClick={() =>
                                            setDropdownOpen((open) => !open)
                                        }
                                    />
                                ) : (
                                    <div
                                        id="avatarButton"
                                        type="button"
                                        className="w-10 h-10 rounded-full cursor-pointer"
                                        onClick={() =>
                                            setDropdownOpen((open) => !open)
                                        }
                                    >
                                        <svg
                                            className="absolute w-12 h-12 text-gray-400 -left-1"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                    </div>
                                )}

                                {dropdownOpen && (
                                    <div
                                        id="userDropdown"
                                        className="absolute right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600"
                                        onMouseLeave={() =>
                                            setDropdownOpen(false)
                                        }
                                    >
                                        <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                            <div>{user.name}</div>
                                            <div className="font-medium truncate">
                                                {user.email}
                                            </div>
                                        </div>
                                        <ul
                                            className="py-2 text-sm text-gray-700 dark:text-gray-200"
                                            aria-labelledby="avatarButton"
                                        >
                                            <li>
                                                <NavLink
                                                    to="/"
                                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                >
                                                    Home
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink
                                                    to="edit-profile"
                                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                >
                                                    Edit Profile Photo
                                                </NavLink>
                                            </li>
                                        </ul>
                                        <div className="py-1">
                                            <button className=" w-full block pe-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-red-500" onClick={() => {
                                                setDropdownOpen(false);
                                                setUser(null);
                                                localStorage.removeItem("userToken");
                                            }}>
                                                <i className="fas fa-sign-out pe-2"></i>
                                                <span>Sign Out</span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <NavLink
                                    to="signin"
                                    className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                >
                                    Sign In
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="signup"
                                    className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                >
                                    Sign Up
                                </NavLink>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
