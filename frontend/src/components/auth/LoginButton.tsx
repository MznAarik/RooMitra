"use client";

import { login } from "@/lib/auth";
import { useState } from "react";



export default function LoginButton() {
    type LoginResponse = {
        token: string;
        user: {
            email: string;
            name: string;
        };
    };
    const [data, setData] = useState<LoginResponse | null>(null);
    const handleLogin = async () => {
        try {
            const data = await login(
                "admin@gmail.com",
                "admin@gmail.com"
            );
            setData(data);
            console.log("SUCCESS:", data);
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.error(err.message);
            } else {
                console.error(err);
            }
        }

    };

    return (
        <>
            <div className="flex flex-col items-center justify-center mt-4 bg-amber-500">

                <label htmlFor="user">Logged In: {data ? data.user.email : "Not logged in"}</label>
                <br />
                <button
                    onClick={handleLogin}
                    className="px-4 py-2 ms-100 bg-blue-600 text-white rounded"
                >
                    Login
                </button>
            </div>
        </>
    );
}
