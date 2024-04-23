"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Firestore, doc, getFirestore, getDoc } from "firebase/firestore";
import firebase from "firebase/compat/app";
import { getDatabase, ref } from "firebase/database";

function ProfilePage() {
    const auth = getAuth();
    const db = getFirestore();
    const [userImage, setUserImage] = useState("/Avatar.jpg");
    const [userName, setUserName] = useState("");
    const [saved, setSaved] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const [profileUser, setProfileUser] = useState({
        name: "",
        phone: "",
        address: "",
        city: "",
        country: "",
        postnumber: "",
    });
    const HandleForm = async (e: { preventDefault: () => void }) => {
        setSaved(false);
        setIsSaving(true);
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
            setIsSaving(false);
            setSaved(true);
        } else {
            alert("Lỗi cập nhật");
        }
    };

    return (
        <>
            <div className="w-full relative pb-5">
                <div className="flex justify-center">
                    <h3 className="r-0">My Profile</h3>
                </div>
                {saved && (
                    <>
                        <h4 className="bg-green-400 mx-auto w-1/4 p-2 rounded-lg border border-green-300 text-white text-center">
                            Profile saved!
                        </h4>
                    </>
                )}
                {isSaving && (
                    <>
                        <h4 className="bg-blue-400 mx-auto w-1/4 p-2 rounded-lg border border-blue-300 text-white text-center">
                            Profile Saving.......
                        </h4>
                    </>
                )}

                <form
                    className="flex justify-center mx-auto w-full"
                    onSubmit={HandleForm}
                >
                    <div className="flex flex-col mx-auto items-center left-[15%]  top-[10%] absolute">
                        <div className="p-2 rounded-full drop-shadow-xl bg-white">
                            <Image
                                alt="Avatar"
                                className="rounded-full "
                                objectFit="cover"
                                width={200}
                                height={100}
                                src={userImage}
                            ></Image>
                        </div>
                        <label className="mt-3">
                            <span className=" cursor-pointer border p-2 rounded-xl border-white text-white">
                                Edit Avatar
                            </span>
                            <input type="file" className="hidden" />
                        </label>
                    </div>
                    <div className="flex flex-col items-center">
                        <input
                            className="w-[30%]"
                            value={userName}
                            type="text"
                            name="Name"
                            placeholder="Name"
                            onChange={(e) =>
                                setProfileUser({
                                    ...profileUser,
                                    name: e.target.value,
                                })
                            }
                        />

                        <input
                            className="w-[30%]"
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
                        <input
                            type="text"
                            placeholder="Post Number"
                            name="Post Number"
                            value={profileUser.postnumber}
                            onChange={(e) =>
                                setProfileUser({
                                    ...profileUser,
                                    postnumber: e.target.value,
                                })
                            }
                        />
                        <input
                            className="pl-2"
                            type="text"
                            placeholder="City"
                            name="City"
                            value={profileUser.city}
                            onChange={(e) =>
                                setProfileUser({
                                    ...profileUser,
                                    city: e.target.value,
                                })
                            }
                        />
                        <input
                            className="w-[30%]"
                            type="text"
                            placeholder="Country"
                            name="Country"
                            value={profileUser.country}
                            onChange={(e) =>
                                setProfileUser({
                                    ...profileUser,
                                    country: e.target.value,
                                })
                            }
                        />
                        <button className="mx-auto" type="submit">
                            Save
                        </button>
                    </div>
                </form>
                <div></div>
            </div>
        </>
    );
}

export default ProfilePage;
