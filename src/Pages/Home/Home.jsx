import axios from "axios";
import { initFlowbite } from "flowbite";
import { useEffect, useState } from "react";

function Home() {
    let [posts, setPosts] = useState();
    async function getPosts() {
        let {
            data: { message, posts, paginationInfo },
        } = await axios.get(
            "https://linked-posts.routemisr.com/posts?limit=50&sort=created_at",
            {
                headers: {
                    token: localStorage.getItem("userToken"),
                },
            }
        );
        message == "success" ? setPosts(posts) : console.log(message);
        console.log(message);

        console.log(posts);
    }
    useEffect(() => {
        initFlowbite();
        getPosts();
    }, []);
    return (
        <>
            {posts ? (
                <ul className="space-y-4  mx-auto">
                    {posts.map(
                        ({
                            _id,
                            body,
                            image,
                            createdAt,
                            comments,
                            user: { name, photo },
                        }) => (
                            <li
                                key={_id}
                                role="status"
                                className="p-4 bg-white rounded-sm shadow-sm md:p-6 dark:bg-gray-500"
                            >
                                <div className="flex items-center mt-4 gap-y-2">
                                    {photo && name ? (
                                        <img
                                            className="w-12 h-12 rounded-full me-3 bg-gray-100 dark:bg-gray-700"
                                            src={photo}
                                            alt={name}
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
                                        <span className="font-bold">
                                            {name}
                                        </span>
                                        <p className="font-extralight">
                                            {new Date(
                                                createdAt
                                            ).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center h-96 mb-4 bg-gray-300 rounded-sm dark:bg-gray-700 mt-2">
                                    {image ? (
                                        <img
                                            className="w-full h-full object-contain rounded-sm"
                                            src={image}
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
                                </div>
                                {body ? (
                                    <p className="mb-4">{body}</p>
                                ) : (
                                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4 animate-pulse" />
                                )}
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-500 dark:text-gray-300">
                                        {comments.length} Comments
                                    </span>

                                    <button
                                        data-modal-target={'modal'+_id}
                                        data-modal-toggle={'modal'+_id}
                                        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        type="button"
                                    >
                                        View Comments
                                    </button>

                                    <div
                                        id={'modal'+_id}
                                        data-modal-backdrop="static"
                                        tabIndex={-1}
                                        aria-hidden="true"
                                        className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
                                    >
                                        <div className="relative p-4 w-full max-w-2xl max-h-full">
                                            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                                                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                                        Static modal
                                                    </h3>
                                                    <button
                                                        type="button"
                                                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                                        data-modal-hide={'modal'+_id}
                                                    >
                                                        <svg
                                                            className="w-3 h-3"
                                                            aria-hidden="true"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 14 14"
                                                        >
                                                            <path
                                                                stroke="currentColor"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                                            />
                                                        </svg>
                                                        <span className="sr-only">
                                                            Close modal
                                                        </span>
                                                    </button>
                                                </div>
                                                <div className="p-4 md:p-5 space-y-4">
                                                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                        With less than a month
                                                        to go before the
                                                        European Union enacts
                                                        new consumer privacy
                                                        laws for its citizens,
                                                        companies around the
                                                        world are updating their
                                                        terms of service
                                                        agreements to comply.
                                                    </p>
                                                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                        The European Union’s
                                                        General Data Protection
                                                        Regulation (G.D.P.R.)
                                                        goes into effect on May
                                                        25 and is meant to
                                                        ensure a common set of
                                                        data rights in the
                                                        European Union. It
                                                        requires organizations
                                                        to notify users as soon
                                                        as possible of high-risk
                                                        data breaches that could
                                                        personally affect them.
                                                    </p>
                                                </div>
                                                <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                                                    <button
                                                        data-modal-hide={'modal'+_id}
                                                        type="button"
                                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                    >
                                                        I accept
                                                    </button>
                                                    <button
                                                        data-modal-hide={'modal'+_id}
                                                        type="button"
                                                        className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                                    >
                                                        Decline
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        )
                    )}
                </ul>
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

export default Home;
