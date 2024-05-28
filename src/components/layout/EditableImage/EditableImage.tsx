"use client";
import React, { useState, useEffect } from "react";
import { ref as dbRef, off, onValue, set } from "firebase/database";
import { database, storage } from "@/app/firebase/config";
import { getDownloadURL, uploadBytes, ref as refSto } from "firebase/storage";
import { Spin, message } from "antd";
import useAuth from "@/hook/useAuth";
import LogoSpin from "@/components/icon/logospin";
export default function EditableImage() {
    const { uid } = useAuth() ?? {};
    const [uploadAvatar, setUploadAvatar] = useState<any>(null);
    const [imageUrl, setImageUrl] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    // Add image to firebase storage
    const handleUpdateAvatar = async (e: { target: { files: any } }) => {
        const files = e.target.files;
        if (files) {
            setIsUploading(true);
            setUploadAvatar(files[0]);
            const ImageRef = refSto(storage, `images/${uid}`); // Sử dụng files[0] thay vì uploadAvatar
            uploadBytes(ImageRef, files[0])
                .then((snapshot) => {
                    getDownloadURL(snapshot.ref).then((url) => {
                        setImageUrl(url);

                        // Đặt url image cho bảng profile
                        const profileRef = dbRef(
                            database,
                            `Profiles/${uid}/profileUser/Url`
                        );
                        set(profileRef, url).then(() => {
                            setIsUploading(false);
                            message.success("Avatar updated successfully");
                            // Done update file image
                        });
                    });
                })
                .catch((error) => {
                    console.error("Error uploading file:", error);
                });
        }
    };

    // Update imageUrl when avatarUrl changes
    useEffect(() => {
        const profileRef = dbRef(database, `Profiles/${uid}/profileUser/Url`);
        onValue(profileRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setImageUrl(data);
            }
        });
        return () => {
            off(profileRef);
        };
    }, [uid]);
    return (
        <>
            <div className="flex flex-col mx-auto items-center left-[10%]  top-[20%] absolute">
                <div className="p-1 rounded-full drop-shadow-xl bg-white w-52 h-52 border-[2px]">
                    {isUploading ? (
                        <LogoSpin></LogoSpin>
                    ) : (
                        <img
                            alt="Avatar"
                            height={400}
                            width={400}
                            className="rounded-full max-w-full h-full"
                            src={imageUrl}
                        />
                    )}
                </div>

                {/* Control update image */}
                <label className="mt-3 flex justify-center items-center">
                    <span className="block border border-gray-300 rounded-lg p-2 text-center text-white cursor-pointer">
                        Edit Avatar
                    </span>
                    <input
                        className="text-white hidden"
                        type="file"
                        onChange={handleUpdateAvatar}
                    />
                </label>
            </div>
        </>
    );
}
