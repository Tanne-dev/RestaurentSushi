"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";

export default function Profile() {
    const [name, setName] = useState("");
    const [telefone, setTelefone] = useState("");
    const [adress, setAdress] = useState("");

    const handleSubmit = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        // Gửi dữ liệu form đi ở đây
        console.log("Submitted:", { name, telefone, password });
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
            <h1 className="text-2xl font-semibold my-4">Profile</h1>
            <div className="my-4">
                <label className="block text-white">First Name</label>
                <input
                    id="name"
                    type="text"
                    className="form-input py-2  rounded-xl block w-full"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="my-4">
                <label className="block text-white">Last Name</label>
                <input
                    id="name"
                    type="text"
                    className="form-input py-2  rounded-xl block w-full"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="my-4">
                <label className="block text-white">telefone</label>
                <input
                    id="telefone"
                    type="telefone"
                    className="form-input py-2  rounded-xl block w-full"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                />
            </div>
            <div className="my-4">
                <label className="block text-white">Adress</label>
                <input
                    id="adress"
                    type="adress"
                    className="form-input py-2  rounded-xl block w-full"
                    value={adress}
                    onChange={(e) => setAdress(e.target.value)}
                />
            </div>
            <div className="flex justify-end">
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Save
                </button>
            </div>
        </form>
    );
}
