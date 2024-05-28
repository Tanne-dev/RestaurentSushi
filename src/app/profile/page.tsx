"use client";

import React, { useState, useEffect } from "react";
import useAuth from "@/hook/useAuth";
import { database } from "../firebase/config";
import { ref as dbRef, set, onValue, off } from "firebase/database";
import EditableImage from "@/components/layout/EditableImage/EditableImage";
import { message } from "antd";
import UsersTab from "@/components/layout/UsersTab/Userstab";

function ProfilePage() {
    const { uid, user } = useAuth();
    const [saved, setSaved] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [profileUser, setProfileUser] = useState({
        name: "",
        phone: "",
        address: "",
        city: "",
        country: "",
        postnumber: "",
    });

    const addData = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        setSaved(false);
        setIsSaving(true);

        try {
            await set(dbRef(database, "Profiles/" + uid), {
                profileUser,
            });
            setIsSaving(false);
            setSaved(true);
            message.success("Profile Saved");
        } catch (error) {
            setIsSaving(false);
            alert("Unsuccessful");
            console.error(error);
        }
    };

    useEffect(() => {
        if (user && user.email) {
            setUserEmail(user.email);
        }
        const profileRef = dbRef(database, `Profiles/${uid}/profileUser`);
        const handleValueChange = (snapshot: { val: () => any }) => {
            const data = snapshot.val();
            if (data) {
                setProfileUser(data);
            }
        };
        onValue(profileRef, handleValueChange);

        return () => {
            off(profileRef);
        };
    }, [user, uid]);

    return (
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
    );
}

export default ProfilePage;
