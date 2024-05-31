import { database } from "@/app/firebase/config";
import Ellipis from "@/components/icon/ellipsis";
import { ref as dbRef, get, off, onValue } from "firebase/database";
import { useState, useEffect } from "react";

export default function CatergoriesItems() {
    const [groupName, setGroupName] = useState<Record<string, string>>({});

    useEffect(() => {
        const GroupNameRef = dbRef(database, "GroupList/");
        const handleValueChange = (snapshot: { val: () => any }) => {
            const data = snapshot.val();
            if (data) {
                setGroupName(data);
            } else {
                setGroupName({});
                console.log("Khong co du lieu");
            }
        };

        onValue(GroupNameRef, handleValueChange);

        return () => {
            off(GroupNameRef, "value", handleValueChange);
        };
    }, []);
    console.log(groupName);
    return (
        <>
            <ul className="flex flex-col list-none z-[100]">
                {Object.keys(groupName).map((key, index) => (
                    <li>
                        <li
                            key={key}
                            className="flex justify-between hover:bg-slate-300 duration-200 transition-background ease-in-out py-4 bg-gray-100 my-4 drop-shadow-lg rounded-lg"
                        >
                            <div className=" flex gap-4 ml-4 ">
                                <span className="text-black text-[1.5rem] ml-2">
                                    {key}
                                </span>
                                <h4 className="text-black font-medium text-[1.5rem] ml-2">
                                    {groupName[key]}
                                </h4>
                            </div>
                            <div className=" mr-8">
                                <div className="cursor-pointer hover:border-[0.5px] border-gray-700 rounded-md">
                                    <Ellipis />
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="grid grid-cols-3 grid-rows-1 gap-x-4 ">
                                <div className="grid-cols-1 flex items-center ">
                                    <div className="w-[55px] h-[55px] flex justify-center items-center relative">
                                        <img
                                            src={"/sten.jpg"}
                                            alt="demo"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className=" flex flex-col items-start ml-6 gap-2">
                                        <span className="text-black">
                                            Sten Lax Posse 14 Bitar
                                        </span>
                                    </div>
                                </div>
                                <div className="grid-cols-2"></div>
                                <div className="grid-cols-3 gap-10 flex items-center justify-center">
                                    <div className="flex flex-col items-center">
                                        <span className="text-black">
                                            SEK 127
                                        </span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <span className="text-black">No</span>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </li>
                ))}
            </ul>
        </>
    );
}
