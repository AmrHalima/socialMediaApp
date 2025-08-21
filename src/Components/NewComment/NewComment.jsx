import * as Zod from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import axios from "axios";

function NewComment({ postId }) {
    async function submitComment(vals) {
        const { data } = await axios.post(
            "https://linked-posts.routemisr.com/comments",
            {
                content: vals.content,
                post: postId,
            },
            {
                headers: {
                    token: localStorage.getItem("userToken"),
                },
            }
        );
        if (data.message === "success") {
            console.log("Post submitted successfully:", data);
            toast.success("Post submitted successfully");
        } else {
            console.error("Failed to submit post:", data.message);
            toast.error(`Failed to submit post: ${data.message}`);
        }
    }
    const schema = Zod.object({
        content: Zod.string().min(1, "post content is required").trim(),
    });
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    });
    return (
        <form
            onSubmit={handleSubmit(submitComment)}
            className="my-2 bg-white rounded-sm md:p-2 dark:bg-gray-500"
        >
            <div className="flex">
                <input
                    className=" bg-gray-100 dark:bg-gray-700 w-full me-2 p-2 rounded-md"
                    {...register("content")}
                    id="content"
                    placeholder="comment Something"
                />
                <button id={`send+${postId}`} className="hidden" type="submit"></button>
                <label htmlFor={`send+${postId}`} className="cursor-pointer">
                    <i className="fas fa-share-nodes fa-2x text-gray-100 dark:text-gray-700 w-full  rounded-md px-4"></i>
                </label>
            </div>
            {errors.content && (
                <p className="text-red-800 text-sm mt-1">
                    {"- " + errors.content.message}
                </p>
            )}
        </form>
    );
}

export default NewComment;
