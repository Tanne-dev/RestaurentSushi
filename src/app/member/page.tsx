"use client";
// pages/members/index.tsx
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";

const MembersPage: React.FC = () => {
    const [user, loading, error] = useAuthState(auth);
    const router = useRouter();

    // Kiểm tra xem người dùng đã đăng nhập hay chưa
    useEffect(() => {
        if (!loading && !user) {
            router.push("/login"); // Chuyển hướng đến trang đăng nhập nếu người dùng chưa đăng nhập
        }
    }, [user, loading]);

    // Nếu đang tải, hiển thị thông báo đang tải
    if (loading) {
        return <div>Loading...</div>;
    }

    // Nếu có lỗi, hiển thị thông báo lỗi
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h1>Welcome to the Members Page!</h1>
            <p className="text-white text-2xl">
                Hello, {user?.email || "Guest"}!
            </p>
            <button onClick={() => auth.signOut()}>Sign Out</button>
        </div>
    );
};

export default MembersPage;
