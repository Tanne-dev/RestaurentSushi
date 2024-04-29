"use client";
import { useState, useEffect, createContext, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/app/firebase/config";
import { Spin } from "antd";
import { truncateSync } from "fs";

export const AuthContext = createContext<{ user: any } | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                const { displayName, email, uid, photoURL } = user;
                setUser({
                    displayName,
                    email,
                    uid,
                    photoURL,
                });
                setIsLoading(false);
                alert("Chúc mừng bạn đã đăng nhập thành công");
            } else {
                setUser({});
                setIsLoading(false);
                router.push("/login");
            }
        });

        return () => unsubscribe();
    }, [router]);

    return (
        <AuthContext.Provider value={{ user }}>
            {isLoading ? (
                <Spin
                    style={{
                        position: "fixed",
                        inset: 0,
                        color: "white",
                    }}
                />
            ) : (
                children
            )}
        </AuthContext.Provider>
    );
}
