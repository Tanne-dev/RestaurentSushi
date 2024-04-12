"use client";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userLogin, setUserlogin] = useState(false);
    const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
    const router = useRouter();

    const HandleSignInSubmit = async (ev: { preventDefault: () => void }) => {
        ev.preventDefault();

        try {
            const res = await signInWithEmailAndPassword(email, password);
            console.log({ res });
            if (res) {
                setTimeout(() => {
                    router.push("/profile");
                }, 3000);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setUserlogin(true);
        }
    };

    return (
        <section className="mt-8">
            <h1 className="text-center text-white">Login</h1>
            {userLogin && (
                <>
                    <p className="text-center my-4 text-white">
                        Login Success please wait few second will move to next
                        page{" "}
                    </p>
                </>
            )}
            {!userLogin && (
                <>
                    <p className="text-center my-4 text-white">
                        Please check your id and password again ^^
                    </p>
                </>
            )}
            <form
                onSubmit={HandleSignInSubmit}
                className="block max-w-xs mx-auto"
            >
                <input
                    type="email"
                    placeholder="email"
                    name="email"
                    value={email}
                    disabled={userLogin}
                    onChange={(ev) => setEmail(ev.target.value)}
                />
                <input
                    type="password"
                    placeholder="password"
                    name="password"
                    value={password}
                    disabled={userLogin}
                    onChange={(ev) => setPassword(ev.target.value)}
                />
                <button type="submit">Login</button>
            </form>
        </section>
    );
}
