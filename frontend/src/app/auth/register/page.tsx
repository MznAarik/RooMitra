"use client";


import { login } from '@/lib/auth';
import React, { useState } from 'react'

const RegisterPage = () => {

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
            <div className="h-screen">
                <div className="flex flex-col items-center justify-center min-h-screen border-2 border-red-500">

                    <h1>Login</h1>
                    <label htmlFor="user">Logged In: {data ? data.user.name : "Not logged in"}</label>
                    <br />
                    <label htmlFor="email">Email:</label>
                    <input id="email" type="email" />
                    <br />
                    <label htmlFor="password">Password:</label>
                    <input id="password" type="password" />
                    <br />
                    <button
                        onClick={handleLogin}
                        className="px-4 py-2 ml-4 bg-blue-600 text-white rounded"
                    >
                        Login
                    </button>
                </div>
            </div>
        </>
    );
}

export default RegisterPage