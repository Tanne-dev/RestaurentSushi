"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { database } from "../firebase/config";
import { ref as dbRef, set, onValue, off } from "firebase/database";
import {
    getStorage,
    uploadBytesResumable,
    ref as storageRef,
    getDownloadURL,
} from "firebase/storage";

function ProfilePage() {
    const auth = getAuth();
    const [saved, setSaved] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [profileUser, setProfileUser] = useState({
        name: "",
        phone: "",
        address: "",
        city: "",
        country: "",
        postnumber: "",
        // imageUrl: "",
    });
    // Check currentUser login or not
    const currentUser = auth.currentUser;
    if (!currentUser) {
        console.log("U need login first");
        return;
    }
    // Save Usercurrent UID to state
    const UserDataWithUID = {
        ...profileUser,
        uid: auth.currentUser.uid,
    };
    // Add data to firebase
    const addData = async (e: { preventDefault: () => void }) => {
        setSaved(false);
        setIsSaving(true);
        e.preventDefault();
        set(dbRef(database, "Profiles/" + UserDataWithUID.uid), {
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
        const profileRef = dbRef(database, "Profiles/" + UserDataWithUID.uid);
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
    }, [UserDataWithUID.uid]);
    // Handle update Image
    // const handleImgUpload = (e) => {
    //     const Storage = getStorage();
    //     const file = e.target.files[0];
    //     const storageRefIMG = storageRef(Storage, `images/${file.name}`);
    //     const uploadTask = uploadBytesResumable(storageRefIMG, file);
    //     uploadTask.on(
    //         "state_changed",
    //         (snapshot) => {
    //             // Xử lý tiến trình tải lên (nếu cần)
    //         },
    //         (error) => {
    //             console.error(error);
    //         },
    //         () => {
    //             // Tải lên thành công, lấy đường dẫn download và cập nhật trạng thái profileUser.imageUrl
    //             getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //                 setProfileUser((prevProfileUser) => ({
    //                     ...prevProfileUser,
    //                     imageUrl: downloadURL,
    //                 }));
    //             });
    //         }
    //     );
    // };

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
                    <div className="flex flex-col mx-auto items-center left-[15%]  top-[10%] absolute">
                        <div className="p-2 rounded-full drop-shadow-xl bg-white">
                            <Image
                                alt="Avatar"
                                className="rounded-full "
                                objectFit="cover"
                                width={200}
                                height={100}
                                src={"/Avatar.jpg"}
                            ></Image>
                        </div>
                        {/* Control update image */}
                        <label className="mt-3">
                            <span className=" cursor-pointer border p-2 rounded-xl border-white text-white">
                                Edit Avatar
                            </span>
                            <input
                                type="file"
                                name="Image"
                                // value={profileUser.imageUrl}
                                // onChange={handleImgUpload}
                                className="hidden"
                            />
                        </label>
                    </div>
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
