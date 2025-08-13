import axios from "axios";
import React, { useContext } from "react";
import { get, useForm } from "react-hook-form";
import * as Zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { UserContext } from "../../Contexts/UserContext";

function Signin() {
    const schema = Zod.object({
        email: Zod.string()
            .email("Invalid email address")
            .nonempty("Email is required")
            .trim(),
        password: Zod.string()
            .min(6, "Password must be at least 6 characters")
            .nonempty("Password is required")
            .trim(),
    });
    const { handleSubmit, register , formState : {errors} } = useForm(
        { resolver: zodResolver(schema) }
    );
    const useNav = useNavigate();
    const { fetchUserData } = useContext(UserContext);

    async function handleFormSubmit(data) {
        console.log(data);
        await axios
            .post("https://linked-posts.routemisr.com/users/signin", data)
            .then(async(response) => {
                console.log("Response data:", response.data);
                await fetchUserData(response.data.token);
                localStorage.setItem("userToken", response.data.token);
                toast.success("User signed in successfully");
                console.log("User signed in successfully:", response.data);
                useNav("/");
            })
            .catch((error) => {
                console.error("There was an error signing in the user:", error);
            });
    }
    return (
        <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="max-w-sm mx-auto mt-10"
        >
            <div className="mb-5">
                <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Your email
                </label>
                <input
                    {...register("email")}
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@flowbite.com"
                    
                />
                {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.email.message}
                    </p>
                )}
            </div>
            <div className="mb-5">
                <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Your password
                </label>
                <input
                    {...register("password")}
                    type="password"
                    id="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    
                />
                {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.password.message}
                    </p>
                )}
            </div>
            <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Submit
            </button>
        </form>
    );
}

export default Signin;
