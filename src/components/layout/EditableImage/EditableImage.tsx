"use client";

import Image from "next/image";
type EditableImageProps = {
    onAvatarUpload: (e: any) => Promise<void>;
};
export default function EditableImage({ onAvatarUpload }: EditableImageProps) {
    return (
        <>
            <div className="flex flex-col mx-auto items-center left-[10%]  top-[10%] absolute">
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
                <label className="mt-3 flex justify-center items-center">
                    <span className="block border border-gray-300 rounded-lg p-2 text-center text-white cursor-pointer">
                        Edit Avatar
                    </span>
                    <input
                        className="text-white hidden"
                        type="file"
                        onChange={onAvatarUpload}
                    />
                </label>
            </div>
        </>
    );
}
