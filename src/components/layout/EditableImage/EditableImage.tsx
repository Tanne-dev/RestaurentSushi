import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ref as dbRef, off, onValue, set } from "firebase/database";
import { database, storage } from "@/app/firebase/config";
import { getDownloadURL, uploadBytes, ref as refSto } from "firebase/storage";
export default function EditableImage() {
    const [uploadAvatar, setUploadAvatar] = useState<any>(null);
    const [imageUrl, setImageUrl] = useState("");
    const [isFileSelected, setIsFileSelected] = useState(false);
    const uid = localStorage.getItem("uid");

    // Add image to firebase storage
    const handleUpdateAvatar = async (e: { target: { files: any } }) => {
        const files = e.target.files;
        if (files) {
            setUploadAvatar(files[0]);
            setIsFileSelected(true);
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
                            alert("update success");
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
                <div className="p-1 rounded-full drop-shadow-xl bg-white w-52 h-52 border border-[2px]">
                    <Image
                        alt={"No Avatar?"}
                        className="max-h-fit rounded-full max-w-full h-full"
                        objectFit="contain"
                        layout="fill"
                        src={imageUrl}
                    />
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
