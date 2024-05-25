"use client";

import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { database } from "../firebase/config";
import { ref as dbRef, set, onValue, off } from "firebase/database";
import EditableImage from "@/components/layout/EditableImage/EditableImage";
import { message } from "antd";
import UsersTab from "@/components/layout/UsersTab/Userstab";

function ProfilePage() {
    const auth = getAuth();
    const [saved, setSaved] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [uid, setUid] = useState<string | null>(null); // Set the type to string | null
    const [profileUser, setProfileUser] = useState({
        name: "",
        phone: "",
        address: "",
        city: "",
        country: "",
        postnumber: "",
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedUid = localStorage.getItem("uid");
            setUid(storedUid);
        }
    }, []);

    const addData = async (e: { preventDefault: () => void }) => {
        setSaved(false);
        setIsSaving(true);
        e.preventDefault();

        if (uid) {
            set(dbRef(database, "Profiles/" + uid), {
                profileUser,
            })
                .then(() => {
                    setIsSaving(false);
                    setSaved(true);
                    message.success("Profile Saved");
                })
                .catch((error) => {
                    alert("Unsuccessful");
                    console.log(error);
                });
        } else {
            console.log("No UID found in localStorage");
        }
    };

    useEffect(() => {
        const currentUser = auth.currentUser;
        const userEmail = currentUser?.email ?? "";
        if (currentUser) {
            setUserEmail(userEmail);
        }

        if (uid) {
            const profileRef = dbRef(database, `Profiles/${uid}/profileUser`);
            onValue(profileRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    setProfileUser(data);
                }
            });

            return () => {
                off(profileRef);
            };
        }
    }, [auth.currentUser, uid]);

    return (
        <>
            <div className="w-full relative pb-5">
                {saved && (
                    <h4 className="bg-green-400 mx-auto w-1/4 p-2 rounded-lg border border-green-300 text-white text-center">
                        Profile saved!
                    </h4>
                )}
                {isSaving && (
                    <h4 className="bg-blue-400 mx-auto w-1/4 p-2 rounded-lg border border-blue-300 text-white text-center">
                        Profile Saving.......
                    </h4>
                )}
                <UsersTab />

                <form
                    className="flex justify-center mx-auto mt-5 w-full"
                    onSubmit={addData}
                >
                    <EditableImage />
                    <div className="flex flex-col items-center">
                        <input
                            className="w-[20rem]"
                            value={userEmail}
                            disabled
                            type="text"
                            name="Email"
                            placeholder="Email"
                        />
                        <input
                            className="w-[20rem]"
                            value={profileUser.name}
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
                            className="w-[20rem]"
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
                            className="w-[20rem]"
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
                            className="w-[20rem]"
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
                            className="pl-2 w-[20rem]"
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
                            className="w-[20rem]"
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
                        <div>
                            <button className="mx-auto" type="submit">
                                Save
                            </button>
                        </div>
                    </div>
                </form>
                <div></div>
            </div>
        </>
    );
}

export default ProfilePage;
