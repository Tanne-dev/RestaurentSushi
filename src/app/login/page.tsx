"use client";
import Link from "next/link";
import Image from "next/image";
import Cart from "@/components/icon/cart";
import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
    const router = useRouter();
    const HandleSignInSubmit = async (ev: { preventDefault: () => void }) => {
        ev.preventDefault();
        try {
            const res = await signInWithEmailAndPassword(email, password);
            console.log({ res });
            setEmail("");
            setPassword("");
            router.push("/admin");
        } catch (e) {
            console.error("error");
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
                ></input>
                <input
                    type="password"
                    placeholder="password"
                    name="password"
                    value={password}
                    onChange={(ev) => setPassword(ev.target.value)}
                ></input>
                <button type="submit">Login</button>
                <div className="text-white my-4 text-center">
                    {" "}
                    or login with provider
                </div>
                <button className="flex gap-4 justify-center">
                    <Image
                        src={"/google.png"}
                        alt={""}
                        width={24}
                        height={24}
                    />
                    Login with google
                </button>
                <div className="text-center my-4 text-white border-t pt-4">
                    Are u forget the account?{" "}
                    <Link className="underline" href={"/login"}>
                        Click Here &raquo;
                    </Link>
                </div>
            </form>
        </section>
    );
}
