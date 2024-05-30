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
                    <li className="flex justify-between hover:bg-slate-300 duration-200 transition-background ease-in-out py-4 bg-gray-100 mt-4 drop-shadow-lg rounded-lg">
                        <li key={key} className=" flex gap-4 ml-4 ">
                            <span className="text-black text-[1.5rem] ml-2">
                                {key}
                            </span>
                            <h4 className="text-black font-medium text-[1.5rem] ml-2">
                                {groupName[key]}
                            </h4>
                        </li>
                        <li className=" mr-8">
                            <div className="cursor-pointer hover:border-[0.5px] border-gray-700 rounded-md">
                                <Ellipis />
                            </div>
                        </li>
                    </li>
                ))}
            </ul>
        </>
    );
}
