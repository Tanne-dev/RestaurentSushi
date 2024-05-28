"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useAuth from "@/hook/useAuth";
export default function UsersTab() {
    const path = usePathname();
    const { admin } = useAuth() ?? {};
    function showTabName() {
        const parts = path.split("/");
        return parts[parts.length - 1];
    }
    const ActiveName = showTabName();
    return (
        <>
            <h3 className="text-center capitalize">{ActiveName}</h3>
            <div className="tabs flex gap-2 mt-8 justify-center">
                <Link
                    className={path === "/profile" ? "active" : ""}
                    href={"/profile"}
                >
                    Profile
                </Link>
                {admin && (
                    <>
                        <Link
                            className={
                                path.includes("/catergories") ? "active" : ""
                            }
                            href={"/catergories"}
                        >
                            Catergories
                        </Link>

                        <Link
                            className={path.includes("/users") ? "active" : ""}
                            href={"/users"}
                        >
                            Users
                        </Link>
                    </>
                )}
                <Link
                    className={path === "/oder" ? "active" : ""}
                    href={"/oder"}
                >
                    Oder
                </Link>
            </div>
        </>
    );
}
