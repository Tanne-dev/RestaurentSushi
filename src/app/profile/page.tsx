"use client";
import React, { useState } from "react";
import { db } from "@/app/firebase/config";
import { addDoc, collection } from "firebase/firestore";
import { headers } from "next/headers";

function ProfileForm() {
    const [profileUser, setProfileUser] = useState({
        name: "",
        phone: "",
        address: "",
    });
    const HandleForm = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                profileUser,
            }),
        };
        const res = await fetch(
            "https://restaurent-sushi-default-rtdb.firebaseio.com/UserData.json",
            options
        );
        console.log(res);
        if (res) {
            setProfileUser({
                name: "",
                phone: "",
                address: "",
            });
            alert("Đã cập nhật Thông tin thành công");
        } else {
            alert("Lỗi cập nhật");
        }
    };

    return (
        <>
            <form onSubmit={HandleForm}>
                <input
                    value={profileUser.name}
                    type="text"
                    name="Name"
                    placeholder="Name"
                    onChange={(e) =>
                        setProfileUser({ ...profileUser, name: e.target.value })
                    }
                />
                <input
                    value={profileUser.phone}
                    type="text"
                    name="Number"
                    placeholder="Phone Number"
                    onChange={(e) =>
                        setProfileUser({
                            ...profileUser,
                            phone: e.target.value,
                        })
                    }
                />

                <input
                    type="text"
                    placeholder="Address"
                    name="Address"
                    value={profileUser.address}
                    onChange={(e) =>
                        setProfileUser({
                            ...profileUser,
                            address: e.target.value,
                        })
                    }
                />
                <button type="submit">Submit Profile</button>
            </form>
        </>
    );
}

export default ProfileForm;
