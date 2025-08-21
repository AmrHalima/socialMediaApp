import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
function PostDetails() {
    const params = useParams();
    const postId = params.id;
    const { isLoading, data, error, isError } = useQuery({
        queryKey: ["postDetails", postId],
        queryFn: getPostDetails,
    });
    async function getPostDetails() {
        let res = await axios.get(
            `https://linked-posts.routemisr.com/posts/${postId}`,
            {
                headers: {
                    token: localStorage.getItem("userToken"),
                },
            }
        );
        return res.data.post;
    }
    return (
        <>
            <nav className="flex" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                    <li className="inline-flex items-center">
                        <Link
                            to="/"
                            className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                        >
                            <svg
                                className="w-3 h-3 me-2.5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                            </svg>
                            Home
                        </Link>
                    </li>
                    <li aria-current="page">
                        <div className="flex items-center">
                            <svg
                                className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 6 10"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="m1 9 4-4-4-4"
                                />
                            </svg>
                            <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400 py-1">
                                {data?.user?.name && `${data.user.name}'s post`}
                            </span>
                        </div>
                    </li>
                </ol>
            </nav>

            {!isLoading && data?.user ? (
                <div className="p-4 bg-white rounded-sm shadow-sm md:p-6 dark:bg-gray-500">
                    <div className="flex items-center mt-4 gap-y-2">
                        {data?.user?.photo && data?.user?.name ? (
                            <img
                                className="w-12 h-12 rounded-full me-3 bg-gray-100 dark:bg-gray-700"
                                src={data.user.photo}
                                alt={data.user.name}
                            />
                        ) : (
                            <svg
                                className="w-10 h-10 me-3 text-gray-200 dark:text-gray-700 animate-pulse"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                            </svg>
                        )}
                        <div>
                            <span className="font-bold">{data.user.name}</span>
                            <p className="font-extralight">
                                {new Date(data.createdAt).toLocaleString()}
                            </p>
                        </div>
                    </div>
                    <figure className="flex items-center justify-center h-96 mb-4 bg-gray-300 rounded-sm dark:bg-gray-700 mt-2">
                        {data.image ? (
                            <img
                                className="w-full h-full object-contain rounded-sm"
                                src={data.image}
                            />
                        ) : (
                            <>
                                <svg
                                    className="w-10 h-10 text-gray-200 dark:text-gray-600 animate-bounce"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 16 20"
                                >
                                    <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                                    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                                </svg>
                                <p className="ps-2  text-gray-200 dark:text-gray-600 animate-bounce font-extrabold">
                                    No Image
                                </p>
                            </>
                        )}
                    </figure>
                    {data.body ? (
                        <figcaption className="mb-4">{data.body}</figcaption>
                    ) : (
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4 animate-pulse" />
                    )}
                    {data.comments.length > 0 && (
                        <>
                            <p className="text-gray-500 dark:text-gray-300">
                                {data.comments.length} Comments
                            </p>
                            {data.comments.map((comment) => {
                                let {
                                    _id,
                                    commentCreator: { photo, name },
                                    createdAt,
                                    content,
                                } = comment;
                                return (
                                    <div
                                        key={_id}
                                        className="flex items-start gap-2.5 mt-2"
                                    >
                                        {photo &&
                                        !photo.endsWith("undefined") ? (
                                            <img
                                                className="w-8 h-8 rounded-full"
                                                src={photo}
                                                alt={name}
                                            />
                                        ) : (
                                            <svg
                                                className="w-10 h-10 me-3 text-gray-200 dark:text-gray-700"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                                            </svg>
                                        )}
                                        <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                                            <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                                    {name}
                                                </span>
                                                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                                    {new Date(
                                                        createdAt
                                                    ).toLocaleTimeString(
                                                        "en-US",
                                                        {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        }
                                                    )}
                                                </span>
                                            </div>
                                            <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
                                                {content}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </>
                    )}
                </div>
            ) : (
                <div
                    role="status"
                    className="p-4 border border-gray-200 rounded-sm shadow-sm animate-pulse md:p-6 dark:border-gray-700"
                >
                    <div className="flex items-center mt-4 gap-y-2">
                        <svg
                            className="w-10 h-10 me-3 text-gray-200 dark:text-gray-700"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                        </svg>
                        <div>
                            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 my-2" />
                            <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2" />
                        </div>
                    </div>
                    <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded-sm dark:bg-gray-700 mt-2">
                        <svg
                            className="w-10 h-10 text-gray-200 dark:text-gray-600"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 16 20"
                        >
                            <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                            <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                        </svg>
                    </div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
                    <span className="sr-only">Loading...</span>
                </div>
            )}
        </>
    );
}

export default PostDetails;
