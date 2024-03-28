import Link from "next/link";
import Cart from "@/components/icon/cart";
export default function registerPage() {
    return (
        <div className="flex flex-col items-center">
            <h2 className="text-white">Login</h2>
            <input type="email" placeholder="email"></input>
            <input type="password" placeholder="password"></input>
            <button>Login</button>
            <div className="text-white"> or login with provider</div>
            <button>
                <image />
                Login with google
            </button>
        </div>
    );
}
