import * as Zod from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import axios from "axios";

async function submitPost(vals) {
    const formdata = new FormData();
    formdata.append("body", vals.body);
    formdata.append("image", vals.image[0]);
    const { data } = await axios.post(
        "https://linked-posts.routemisr.com/posts",
        formdata,
        {
            headers: {
                token: localStorage.getItem("userToken"),
            },
        }
    );
    if (data.message === "success") {
        console.log("Post submitted successfully:", data);
        toast.success("Post submitted successfully");
    }else{
        console.error("Failed to submit post:", data.message);
        toast.error(`Failed to submit post: ${data.message}`);
    }
}
function NewPost() {
    const schema = Zod.object({
        body: Zod.string().min(1, "post content is required").trim(),
        image: Zod.instanceof(FileList).refine(
        (data) => {
            return data.length > 0;
        },
        { message: "photo is required"}
    )
    });
    const { handleSubmit, register, formState:{errors}} = useForm({
        resolver: zodResolver(schema),
    });
    return (
        <form
            onSubmit={handleSubmit(submitPost)}
            className="my-3 p-4 bg-white rounded-sm shadow-sm md:p-6 dark:bg-gray-500"
        >
            <p className="ps-2 pb-2 font-bold">Post Something ...</p>
            <div className="flex">
                <input
                    className=" bg-gray-100 dark:bg-gray-700 w-full me-2 p-2 rounded-md outline-sky-950"
                    {...register("body")}
                    id="body"
                    placeholder="Post Something"
                />
                <input
                    className="hidden"
                    type="file"
                    {...register("image")}
                    id="image"
                    accept="image/*"
                />
                <label htmlFor="image" className="cursor-pointer">
                    <i className="fas fa-photo-film fa-2x text-gray-100 dark:text-gray-700 w-full  rounded-md px-1"></i>
                </label>
                <button id="send" className="hidden" type="submit"></button>
                <label htmlFor="send" className="cursor-pointer">
                    <i className="fas fa-share-nodes fa-2x text-gray-100 dark:text-gray-700 w-full  rounded-md px-4"></i>
                </label>
            </div>
            {errors.body && (
                <p className="text-red-800 text-sm mt-1">
                    {"- " + errors.body.message}
                </p>
            )}
            {errors.image && (
                <p className="text-red-800 text-sm mt-1">
                    {"- " + errors.image.message}
                </p>
            )}
        </form>
    );
}

export default NewPost;
