"use client";
import React, { useState } from "react";
import { getAuth } from "firebase/auth";
function ProfilePage() {
    const [profileUser, setProfileUser] = useState({
        name: "",
        phone: "",
        address: "",
    });
    const auth = getAuth();
    const HandleForm = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        const currentUser = auth.currentUser;
        if (!currentUser) {
            console.log("U need login first");
            return;
        }

        const UserDataWithUID = {
            ...profileUser,
            uid: auth.currentUser.uid,
        };
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userData: UserDataWithUID,
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
                    className="w-[30%]"
                    value={profileUser.name}
                    type="text"
                    name="Name"
                    placeholder="Name"
                    onChange={(e) =>
                        setProfileUser({ ...profileUser, name: e.target.value })
                    }
                />
                <input
                    className="w-[5rem]"
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
                    className="w-[30%]"
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

export default ProfilePage;
