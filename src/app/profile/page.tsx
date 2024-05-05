"use client";

import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { database, storage } from "../firebase/config";
import { ref as dbRef, set, onValue, off } from "firebase/database";
import EditableImage from "@/components/layout/EditableImage/EditableImage";
import {
    getMetadata,
    uploadBytesResumable,
    ref as storageRef,
    uploadBytes,
} from "firebase/storage";
function ProfilePage() {
    const auth = getAuth();
    const [user, setUser] = useState(null);
    const [uploadAvatar, setUploadAvatar] = useState<any>(null);
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
    // Add image to firebase storage
    const handleUpdateAvatar = async (e: {
        preventDefault: () => void;
        target: { files: any };
    }) => {
        e.preventDefault();

        const files = e.target.files;
        if (files && files.length > 0) {
            setUploadAvatar(files[0]);
        }
        if (uploadAvatar == null) {
            return;
        }
        const ImageRef = storageRef(storage, `images/+${uploadAvatar + uid}`);

        uploadBytes(ImageRef, uploadAvatar)
            .then(() => {
                alert("updated success image");
            })
            .catch((error) => {
                // Xử lý khi có lỗi xảy ra trong quá trình tải lên (nếu cần)
                console.error("Error uploading file:", error);
            });
    };

    // Add data to firebase
    const uid = localStorage.getItem("uid");
    const addData = async (e: { preventDefault: () => void }) => {
        setSaved(false);
        setIsSaving(true);

        e.preventDefault();

        set(dbRef(database, "Profiles/" + uid), {
            profileUser,
        })
            .then(() => {
                setIsSaving(false);
                setSaved(true);
                alert("data added successfully");
            })
            .catch((error) => {
                alert("Unsuccessful");
                console.log(error);
            });
    };
    // Listen if anything change in state Profile and update
    useEffect(() => {
        const currentUser = auth.currentUser;
        if (!currentUser) {
            console.log("U need login first");
            return;
        }
        const profileRef = dbRef(database, "Profiles/" + uid);
        onValue(profileRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                // Nếu có dữ liệu, cập nhật trạng thái profileUser với dữ liệu mới
                setProfileUser(data.profileUser);
            }
        });
        // Cleanup function để ngăn chặn sự lắng nghe nhiều lần
        return () => {
            off(profileRef);
        };
    }, [auth.currentUser]);
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
                    onSubmit={addData}
                >
                    <EditableImage onAvatarUpload={handleUpdateAvatar} />

                    <div className="flex flex-col items-center">
                        <input
                            className="w-[30%]"
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
