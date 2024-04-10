"use client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
    const router = useRouter();

    const HandleSignInSubmit = async (ev: { preventDefault: () => void }) => {
        ev.preventDefault();

        try {
            await signInWithEmailAndPassword(email, password);
            router.push("/admin");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <section className="mt-8">
            <h1 className="text-center text-white">Login</h1>
            <form
                onSubmit={HandleSignInSubmit}
                className="block max-w-xs mx-auto"
            >
                <input
                    type="email"
                    placeholder="email"
                    name="email"
                    value={email}
                    onChange={(ev) => setEmail(ev.target.value)}
                />
                <input
                    type="password"
                    placeholder="password"
                    name="password"
                    value={password}
                    onChange={(ev) => setPassword(ev.target.value)}
                />
                <button type="submit">Login</button>
            </form>
        </section>
    );
}
