"use client";
import { message } from "antd";
import React, { useState } from "react";
import dbFireStore from "@/app/firebase/config";
import { collection, addDoc } from "firebase/firestore";
interface PopupGroupProps {
    open: boolean;
    setPopup: React.Dispatch<React.SetStateAction<boolean>>;
}
const AddCatergory: React.FC<PopupGroupProps> = ({ open, setPopup }) => {
    const [listName, setListName] = useState<string>("");
    const addCatergories = async (name: string) => {
        try {
            await addDoc(collection(dbFireStore, "catergories"), { name });
            message.success(`Catergories ${name} Added Success`);
        } catch (error) {
            message.error(`${name} Failed`);
        }
    };
    const handleAddCatergories = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        if (listName.trim() !== "") {
            await addCatergories(listName);
            setListName("");
            setPopup(false);
        } else {
            message.error("Catergory name cannot be empty");
        }
    };

    return (
        <>
            <div className="fixed top-0 left-0 flex flex-col items-center justify-center w-full h-full bg-black bg-opacity-60 backdrop-blur-md z-50">
                <div className="absolute top-2 overflow-y-auto w-full max-w-[500px] max-h-95 box-border bg-white rounded-lg p-6 z-[999]">
                    <h3 className="text-black font-semibold">
                        Create menu group
                    </h3>
                    <form onSubmit={handleAddCatergories}>
                        <div>
                            <span className="font-normal">Menu group name</span>
                        </div>
                        <div>
                            <input
                                className="pl-2 pr-2  border-black border-[1px] rounded-lg bg-white text-black w-full min-w-0 box-border text-base h-9"
                                type="text"
                                name="name"
                                value={listName}
                                onChange={(e) => setListName(e.target.value)}
                                placeholder="Name"
                            ></input>
                        </div>
                        <div></div>
                        <div>
                            <button
                                onClick={(e) => {
                                    setPopup(!open);
                                }}
                                className="text-black"
                            >
                                Cancel
                            </button>
                            <button type="submit" className="text-black">
                                Create
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};
export default AddCatergory;
