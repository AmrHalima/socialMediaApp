import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as Zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";

function Signup() {
        const useNav = useNavigate();
    const schema = Zod.object({
        name: Zod.string()
            .nonempty("Name is required")
            .trim()
            .max(20, "Name must be less than 20 characters")
            .min(3, "Name must be at least 3 characters"),
        email: Zod.string()
            .email("Invalid email address")
            .nonempty("Email is required")
            .trim(),
        password: Zod.string()
            .min(6, "Password must be at least 6 characters")
            .nonempty("Password is required"),
        rePassword: Zod.string().nonempty("rePassword is required"),
        dateOfBirth: Zod.coerce.date().refine((val) => {
            let nowDate = new Date().getFullYear();
            let birthDate = val.getFullYear();
            return nowDate - birthDate >= 18;
        }, "You must be at least 18 years old"),
        gender: Zod.enum(["male", "female"]),
    }).refine(
        (data) => {
            return data.password == data.rePassword;
        },
        { message: "Passwords do not match", path: ["rePassword"] }
    );
    const {
        handleSubmit,
        register,
        formState: { errors },
        watch,
    } = useForm({ resolver: zodResolver(schema) });
    const values = watch();

    const allFilled = Object.values(values).every((v) =>
        v instanceof FileList ? v.length > 0 : String(v).trim() !== ""
    );
    async function handleFormSubmit(data) {
        console.log(data);
        await axios
            .post("https://linked-posts.routemisr.com/users/signup", data)
            .then((response) => {
                toast.success("User signed up successfully");
                console.log("User signed up successfully:");
                useNav("/signin");
            })
            .catch((error) => {
                toast.error(`${error.response.data.error}`);
                console.error("There was an error signing up the user:", error);
            });
    }
    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                    <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Name
                    </label>
                    <input
                        {...register("name")}
                        type="text"
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="ex. John"
                        
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm">
                            {errors.name.message}
                        </p>
                    )}
                </div>
                <div>
                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Email address
                    </label>
                    <input
                        {...register("email")}
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="john.doe@company.com"
                        
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm">
                            {errors.email.message}
                        </p>
                    )}
                </div>
                <div>
                    <label
                        htmlFor="Date Of Birth"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Date Of Birth
                    </label>
                    <input
                        {...register("dateOfBirth")}
                        type="date"
                        id="Date Of Birth"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="YYYY-MM-DD"
                        
                    />
                    {errors.dateOfBirth && (
                        <p className="text-red-500 text-sm">
                            {errors.dateOfBirth.message}
                        </p>
                    )}
                </div>
                <div>
                    <label
                        htmlFor="gender"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Gender
                    </label>
                    <select
                        {...register("gender")}
                        id="gender"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option defaultValue value="male">
                            Male
                        </option>
                        <option value="female">Female</option>
                    </select>
                </div>
            </div>
            <div className="mb-6">
                <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Password
                </label>
                <input
                    {...register("password")}
                    type="password"
                    id="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="•••••••••"
                    
                />
                {errors.password && (
                    <p className="text-red-500 text-sm">
                        {errors.password.message}
                    </p>
                )}
            </div>
            <div className="mb-6">
                <label
                    htmlFor="confirm_password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Confirm password
                </label>
                <input
                    {...register("rePassword")}
                    type="password"
                    id="confirm_password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="•••••••••"
                    
                />
                {errors.rePassword && (
                    <p className="text-red-500 text-sm">
                        {errors.rePassword.message}
                    </p>
                )}
            </div>
            <button
            disabled={!allFilled}
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Submit
            </button>
        </form>
    );
}

export default Signup;
