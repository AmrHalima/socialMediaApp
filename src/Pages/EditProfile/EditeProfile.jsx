import { useForm } from "react-hook-form";
import { useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";
// import * as Zod from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import toast from "react-hot-toast";
// const schema = Zod.object({
//     photo: Zod.instanceof(File).refine((file) => file.size <= 4 * 1024 * 1024, {
//         message: "File size must be less than 4MB",
//     }),
// });
export default function EditeProfile() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm(
    //     {
    //     resolver: zodResolver(schema),
    // }
);
    const { fetchUserData } = useContext(UserContext);
    async function updateUserPhoto(val) {
        const formdata = new FormData();
        formdata.append("photo", val.photo[0]);
        console.log(val.photo[0]);
        let res = await axios.put(
            "https://linked-posts.routemisr.com/users/upload-photo",
            formdata,
            {
                timeout: 20000,
                headers: {
                    token: localStorage.getItem("userToken"),
                },
            }
        );
        if (res.data.message === "success") {
            toast.success("Photo updated successfully");
            fetchUserData(localStorage.getItem("userToken"));
        }else{
            toast.error(`Failed to update photo${res.data.message ? `: ${res.data.message}` : ''}`);
        }
    }
    return (
        <form
            className="flex flex-col items-center justify-center w-full group gap-2"
            onSubmit={handleSubmit(updateUserPhoto)}
        >
            <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
                <div className="flex flex-col items-center justify-center pt-5 pb-6 ">
                    <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400 group-hover:animate-bounce"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>
                        or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF (MAX. 4 MB)
                    </p>
                </div>
                <input
                    {...register("photo")}
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                />
            </label>
            <button
                    type="submit"
                    className=" w-full text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Upload Photo
                </button>
        </form>
    );
}
