"use client";
import { SyntheticEvent, useState } from "react";
import Image from "next/image";

export default function registerPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleFormSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        fetch("/api/register", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" },
        });
    };
    return (
        <section className="mt-8">
            <h1 className="text-orange-300 text-center">Register</h1>
            <form
                onSubmit={handleFormSubmit}
                className="block max-w-sm mx-auto"
                action=""
            >
                <input
                    type="email"
                    value={email}
                    onChange={(ev) => {
                        setEmail(ev.target.value);
                    }}
                    placeholder="email"
                ></input>
                <input
                    type="password"
                    value={password}
                    placeholder="password"
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                ></input>
                <button type="submit">Register</button>
                <div className="text-white text-center my-4">
                    or login with provider
                </div>
                <button className="flex justify-center gap-4 items-center">
                    <Image
                        width={24}
                        height={24}
                        alt="Google"
                        src={"/google.png"}
                    />
                    Login with google
                </button>
                <button className="flex justify-center gap-4 mt-2 items-center">
                    <Image
                        width={24}
                        height={24}
                        alt="Google"
                        src={"/facebook.png"}
                    />
                    Login with Facebook
                </button>
            </form>
        </section>
    );
}
