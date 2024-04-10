"use client";
import React, { useState } from "react";
import { auth } from "@/app/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";

import { useRouter } from "next/router";
import { signOut } from "firebase/auth";

const AdminPage: React.FC = () => {
    const [userInfo, setUserInfo] = useState({
        name: "John Doe",
        age: 30,
        fontInfo: "Arial, sans-serif",
    });
    const [newName, setNewName] = useState("");
    const [newAge, setNewAge] = useState("");

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewName(event.target.value);
    };

    const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewAge(event.target.value);
    };

    const handleUpdateInfo = () => {
        setUserInfo({
            ...userInfo,
            name: newName || userInfo.name,
            age: newAge ? parseInt(newAge) : userInfo.age,
        });
        setNewName("");
        setNewAge("");
    };
    const [user] = useAuthState(auth);
    const router = useRouter();
    if (!user) {
        router.push("/login");
    }

    return (
        <div className="container mx-auto mt-8">
            <button onClick={() => signOut(auth)} className="w-2/4 mx-auto">
                Logout
            </button>
            <h1 className="text-4xl font-bold text-white">Admin Page</h1>
            <div className="mt-4">
                <h2 className="text-2xl font-semibold text-white">
                    User Information
                </h2>
                <p className="text-white">Name: {userInfo.name}</p>
                <p className="text-white">Age: {userInfo.age}</p>
                <div className="mt-4">
                    <input
                        type="text"
                        placeholder="New Name"
                        value={newName}
                        onChange={handleNameChange}
                        className="rounded-md p-2 mr-2"
                    />
                    <input
                        type="number"
                        placeholder="New Age"
                        value={newAge}
                        onChange={handleAgeChange}
                        className="rounded-md p-2 mr-2"
                    />
                    <button
                        onClick={handleUpdateInfo}
                        className="bg-blue-500 text-white rounded-md px-4 py-2"
                    >
                        Update Info
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
