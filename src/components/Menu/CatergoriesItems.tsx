import { database } from "@/app/firebase/config";
import Ellipis from "@/components/icon/ellipsis";
import { message } from "antd";
import { ref as dbRef, off, onValue, remove } from "firebase/database";
import { useState, useEffect } from "react";
import Items from "./items";
interface visibleOption {
    [key: number]: boolean;
}
export default function CatergoriesItems() {
    const [groupName, setGroupName] = useState<Record<string, string>>({});
    const [visibleOption, setVisibleOption] = useState<visibleOption>({});

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

    const handleOptionGroup = (index: number) => {
        setVisibleOption((prevState) => ({
            ...prevState,
            [index]: !prevState[index],
        }));
    };
    const HandleDeteleDataItems = (key: string) => {
        const dataRef = dbRef(database, `GroupList/${key}`);
        remove(dataRef)
            .then(() => {
                message.success("Data deleted");
            })
            .catch((error) => {
                message.error("Error deleting data:", error);
            });
    };
    return (
        <>
            <ul className="flex flex-col ">
                {Object.keys(groupName).map((key, index: number) => (
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
                                {/*  */}
                                <div
                                    key={key}
                                    className="overflow-hidden flex items-center gap-3 "
                                >
                                    <div>
                                        <ul
                                            className={`flex gap-2  transition-all duration-400 rounded-lg ease-in-out ${
                                                visibleOption[index]
                                                    ? "opacity-100 translate-x-0"
                                                    : " opacity-0 translate-x-[100%] "
                                            }`}
                                        >
                                            <li>
                                                <button className="text-gray-800 font-medium">
                                                    Start to Selling All items
                                                </button>
                                            </li>
                                            <li>
                                                <button className="text-gray-800 font-medium">
                                                    Edit Menu Group
                                                </button>
                                            </li>
                                            <li>
                                                <button
                                                    onClick={() =>
                                                        HandleDeteleDataItems(
                                                            key
                                                        )
                                                    }
                                                    className="text-red-700 font-medium"
                                                >
                                                    Delete Menu Group
                                                </button>
                                            </li>
                                        </ul>
                                    </div>

                                    <button
                                        onClick={() => handleOptionGroup(index)}
                                        className="relative border-[2px] rounded-xl flex items-center gap-1 p-2  z-20"
                                    >
                                        <Ellipis />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <Items groupKey={key} />
                        {/* Menu Items */}
                    </li>
                ))}
            </ul>
        </>
    );
}
