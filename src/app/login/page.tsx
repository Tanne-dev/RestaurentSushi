"use client";
import Link from "next/link";
import Image from "next/image";
import Cart from "@/components/icon/cart";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginProgess, setLoginProgess] = useState(false);
    async function HandleOnSubmit(ev: { preventDefault: () => void }) {
        ev.preventDefault();
        setLoginProgess(true);
        await signIn("credentials", { email, password, callbackUrl: "/" });

        setLoginProgess(false);
    }
    return (
        <section className="mt-8">
            <h1 className="text-center text-white">Login</h1>
            <form className="block max-w-xs mx-auto" onSubmit={HandleOnSubmit}>
                <input
                    type="email"
                    placeholder="email"
                    name="email"
                    value={email}
                    disabled={loginProgess}
                    onChange={(ev) => setEmail(ev.target.value)}
                ></input>
                <input
                    type="password"
                    placeholder="password"
                    name="password"
                    value={password}
                    disabled={loginProgess}
                    onChange={(ev) => setPassword(ev.target.value)}
                ></input>
                <button disabled={loginProgess} type="submit">
                    Login
                </button>
                <div className="text-white my-4 text-center">
                    {" "}
                    or login with provider
                </div>
                <button
                    disabled={loginProgess}
                    className="flex gap-4 justify-center"
                >
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
