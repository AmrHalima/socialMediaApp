import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
export const UserContext = createContext();

export default function UserContextProvider({ children }) {
    let [user, setUser] = useState(null);
    async function fetchUserData(token) {
        try {
            let { data } = await axios.get(
                "https://linked-posts.routemisr.com/users/profile-data",
                {
                    headers: {
                        token,
                    },
                }
            );
            setUser(data.user);
        } catch (error) {
            console.error("Error fetching user data:", error.message);
        }
    }
    useEffect(() => {
        const token = localStorage.getItem("userToken");
        if (token) {
            fetchUserData(token);
        }
    }, []);
    return (
        <UserContext.Provider value={{ user, setUser, fetchUserData }}>
            {children}
        </UserContext.Provider>
    );
}
