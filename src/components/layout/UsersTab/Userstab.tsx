"use client";
import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AuthContext } from "@/components/Context/AuthProvider";

export default function UsersTab() {
    const path = usePathname();
    const authContext = useContext(AuthContext);
    const admin = authContext?.isAdmin;
    return (
        <>
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
                            className={
                                path.includes("/menu-items") ? "active" : ""
                            }
                            href={"/menu-items"}
                        >
                            Menu Items
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
