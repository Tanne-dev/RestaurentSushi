"use client";
import { useState } from "react";

interface ItemsProps {
    groupKey: string;
}
const Items: React.FC<ItemsProps> = ({ groupKey }) => {
    const [buttonStates, setButtonStates] = useState<Record<string, boolean>>(
        {}
    );
    const handleActiveItems = (key: string) => {
        setButtonStates((prevState) => ({
            ...prevState,
            [key]: !prevState[key],
        }));
    };

    return (
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
                        <span className="text-black">SEK 127</span>
                    </div>
                    <div key={groupKey}>
                        <div
                            onClick={() => handleActiveItems(groupKey)}
                            className="flex items-center cursor-pointer"
                        >
                            {buttonStates[groupKey] ? (
                                <>
                                    <div className="h-4 min-w-[16px] rounded-full flex justify-center items-center text-white bg-[#69ff84] px-1 border-2 border-white"></div>
                                    <span className="text-black">Yes</span>
                                </>
                            ) : (
                                <>
                                    <div className="h-4 min-w-[16px] rounded-full flex justify-center items-center text-white bg-[#f68f8f] px-1 border-2 border-white"></div>
                                    <span className="text-black">No</span>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Items;
