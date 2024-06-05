import { database } from "@/app/firebase/config";
import Ellipis from "@/components/icon/ellipsis";
import { ref as dbRef, off, onValue } from "firebase/database";
import { useState, useEffect } from "react";

export default function CatergoriesItems() {
    const [groupName, setGroupName] = useState<Record<string, string>>({});
    const [buttonStates, setButtonStates] = useState<Record<string, boolean>>(
        {}
    );

    useEffect(() => {
        const GroupNameRef = dbRef(database, "GroupList/");
        const handleValueChange = (snapshot: { val: () => any }) => {
            const data = snapshot.val();
            if (data) {
                setGroupName(data);
            } else {
                setGroupName({});
                console.log("Không có dữ liệu");
            }
        };

        onValue(GroupNameRef, handleValueChange);

        return () => {
            off(GroupNameRef, "value", handleValueChange);
        };
    }, []);

    const handleButtonClick = (key: string) => {
        setButtonStates((prevState) => ({
            ...prevState,
            [key]: !prevState[key],
        }));
    };

    return (
        <>
            <ul className="flex flex-col ">
                {Object.keys(groupName).map((key, index) => (
                    <li key={key} className="px-2">
                        <div className="relative hover:bg-slate-300 p-4 z-0 bg-gray-100 my-4 drop-shadow-lg rounded-lg">
                            <div className=" flex justify-between items-center gap-4 ml-4">
                                <div className="flex ">
                                    <span className="text-black text-[1.5rem]">
                                        {key}
                                    </span>
                                    <h4 className="text-black font-medium text-[1.5rem] ml-2">
                                        {groupName[key]}
                                    </h4>
                                </div>
                                <div className=" flex items-center gap-3 ">
                                    <div>
                                        <ul className=" flex gap-2 transition-all duration-200 rounded-lg ease-in-out">
                                            <li className="text-black p-3  border-[1px] border-gray-400 rounded-xl hover:bg-orange-300 bg-slate-100 transition-all duration-200 cursor-pointer">
                                                Start to Selling All items
                                            </li>
                                            <li className="text-black p-3 border-[1px] border-gray-400 rounded-xl hover:bg-orange-300 bg-slate-100 transition-all duration-200 cursor-pointer">
                                                Edit Menu Group
                                            </li>
                                            <li className="text-red-700 p-3 border-[1px] border-gray-400 rounded-xl hover:bg-orange-300 bg-slate-100 transition-all duration-200 cursor-pointer">
                                                Delete Menu Group
                                            </li>
                                        </ul>
                                    </div>
                                    <button
                                        onClick={() => handleButtonClick(key)}
                                        className="relative border-[2px] rounded-xl flex items-center gap-1 p-2 drop-shadow-lg z-20"
                                    >
                                        <Ellipis />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Menu Items */}
                        <div className="border-[1px] border-gray-300 p-2 rounded-lg">
                            <div className="grid grid-cols-3 grid-rows-1 gap-x-4">
                                <div className="grid-cols-1 flex items-center ml-4">
                                    <div className="w-[55px] h-[55px] flex justify-center items-center relative">
                                        <img
                                            src={"/sten.jpg"}
                                            alt="demo"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex flex-col items-start ml-6 gap-2">
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
                                    <div key={key}>
                                        <div
                                            onClick={() =>
                                                handleButtonClick(key)
                                            }
                                            className="flex items-center cursor-pointer"
                                        >
                                            {buttonStates[key] ? (
                                                <>
                                                    <div className="h-4 min-w-[16px] rounded-full flex justify-center items-center text-white bg-[#69ff84] px-1 border-2 border-white"></div>
                                                    <span className="text-black">
                                                        Yes
                                                    </span>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="h-4 min-w-[16px] rounded-full flex justify-center items-center text-white bg-[#f68f8f] px-1 border-2 border-white"></div>
                                                    <span className="text-black">
                                                        No
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
}
