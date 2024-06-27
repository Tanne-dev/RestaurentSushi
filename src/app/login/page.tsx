"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { Spin } from "antd";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [stateLogin, setStateLogin] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [userLogin, setUserLogin] = useState("wellcome");
    const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
    const router = useRouter();

    const HandleSignInSubmit = async (ev: { preventDefault: () => void }) => {
        ev.preventDefault();

        try {
            const res = await signInWithEmailAndPassword(email, password);

            if (res) {
                setUserLogin("success");
                setTimeout(() => {
                    router.push("/");
                }, 1000);
                setStateLogin(true);
                setIsLoading(true);
            } else {
                setUserLogin("failed");
                setStateLogin(false);
                setIsLoading(false);
            }
        } catch (error) {
            setUserLogin("failed");
        }
    };

    return (
        <section className="mt-8 pb-4 ">
            <h1 className="text-center text-white">Login</h1>

            {userLogin === "wellcome" && (
                <>
                    <p className="text-center my-4 text-white">
                        Wellcome to Kiyora , please login your account under.
                    </p>
                </>
            )}
            {userLogin === "success" && (
                <>
                    <p className="text-center my-4 text-white">
                        Login Success please wait few second will move to next
                        page{" "}
                    </p>
                </>
            )}
            {userLogin === "failed" && (
                <>
                    <p className="text-center my-4 text-white">
                        Oops something went wrong please check again ^^
                    </p>
                </>
            )}
            <form
                onSubmit={HandleSignInSubmit}
                className=" w-full flex flex-col items-center"
            >
                <input
                    className="w-[20rem]"
                    onKeyDown={() => {
                        setUserLogin("wellcome");
                    }}
                    type="email"
                    placeholder="email"
                    name="email"
                    disabled={stateLogin}
                    value={email}
                    onChange={(ev) => setEmail(ev.target.value)}
                />
                <input
                    className="w-[20rem]"
                    onKeyDown={() => {
                        setUserLogin("wellcome");
                    }}
                    type="password"
                    placeholder="password"
                    name="password"
                    value={password}
                    disabled={stateLogin}
                    onChange={(ev) => setPassword(ev.target.value)}
                />
                <button className="w-[20rem]" type="submit">
                    {isLoading ? <Spin /> : "Login"}
                </button>
            </form>
        </section>
    );
}
