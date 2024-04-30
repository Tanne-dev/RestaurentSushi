"use client";
import { useState, useEffect, createContext, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/app/firebase/config";
import { Spin } from "antd";

export const AuthContext = createContext<{ user: any } | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState({});
    const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router: any = useRouter();
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

                // Kiểm tra nếu có redirectUrl, chuyển hướng người dùng đến đó
                if (redirectUrl) {
                    router.push(redirectUrl);
                    setRedirectUrl(null); // Đặt lại redirectUrl sau khi chuyển hướng
                }
            } else {
                setUser({});
                setIsLoading(false);
                // Nếu không có user, chuyển hướng đến trang đăng nhập và lưu trữ redirectUrl
                if (router.pathname !== "/login") {
                    setRedirectUrl(router.pathname);
                    router.push("/login");
                }
            }
        });

        return () => unsubscribe();
    }, [router, redirectUrl]); // Thêm redirectUrl vào dependency array
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
