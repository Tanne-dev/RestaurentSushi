import Link from "next/link";

import Image from "next/image";
export default function registerPage() {
    return (
        <section className="mt-8">
            <h1 className="text-orange-300 text-center">Register</h1>
            <form className="block max-w-sm mx-auto" action="">
                <input type="email" placeholder="email"></input>
                <input type="password" placeholder="password"></input>
                <button>Register</button>
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
