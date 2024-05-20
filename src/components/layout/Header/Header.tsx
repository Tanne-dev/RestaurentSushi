"use client";
import Link from "next/link";
import Image from "next/image";
import HamburgerMenu from "@/components/layout/Header/Humburger";
import Cart from "@/components/icon/cart";
import { auth } from "@/app/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Header() {
    const [user] = useAuthState(auth);
    const router = useRouter();

    return (
        <>
            <header className="hidden relative lg:flex justify-between items-center h-[10rem] px-4">
                <div className="flex">
                    <nav className="flex space-x-8">
                        <Link
                            className="text-[1rem] text-orange-400"
                            href={"/"}
                        >
                            HEM
                        </Link>
                        <Link className="text-[1rem] text-white" href={"/"}>
                            MENY
                        </Link>
                        <Link className="text-[1rem] text-white" href={"/"}>
                            BLOG
                        </Link>
                        <Link className="text-[1rem] text-white" href={"/"}>
                            PAGE
                        </Link>
                        <Link className="text-[1rem] text-white" href={"/"}>
                            KONTACKT
                        </Link>
                    </nav>
                </div>

                <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                    <Image
                        className="mx-auto"
                        style={{ objectFit: "cover" }}
                        width={180}
                        height={180}
                        src={"/LogoKiyora.png"}
                        alt="KIYORA"
                    />
                </div>

                <div className="flex items-center">
                    {user ? (
                        <div className="flex items-center">
                            <Link
                                href={"/profile"}
                                className="text-white whitespace-nowrap text-2xl flex-nowrap text-center"
                            >
                                Hej {user.displayName}
                            </Link>
                            <button
                                className="text-white ml-2 text-2xl text-center"
                                onClick={() => {
                                    signOut(auth);
                                    router.push("/");
                                }}
                            >
                                Log out
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-4">
                            <Link
                                href={"/register"}
                                className="text-[1rem] font-semibold text-white h-7 px-2 border-[2px] rounded-xl hover:shadow-2xl hover:scale-105 duration-300 transition-all hover:bg-orange-400"
                            >
                                Booking table
                            </Link>

                            <Link
                                href={"/login"}
                                className="text-[1rem] font-semibold text-white h-7 px-2 border-[2px] rounded-xl hover:shadow-2xl hover:scale-105 duration-300 transition-all hover:bg-orange-400"
                            >
                                Login
                            </Link>
                            <Link
                                href={"/register"}
                                className="text-[1rem] font-semibold text-white h-7 px-2 border-[2px] rounded-xl hover:shadow-2xl hover:scale-105 duration-300 transition-all hover:bg-orange-400"
                            >
                                Register
                            </Link>
                            <Cart />
                        </div>
                    )}
                </div>
            </header>
            <HamburgerMenu />
        </>
    );
}
