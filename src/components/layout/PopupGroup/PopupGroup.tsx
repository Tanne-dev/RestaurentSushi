"use client";
import { message } from "antd";
import { useState } from "react";
import { ref as dbRef, set, get } from "firebase/database";
import { database } from "@/app/firebase/config";
interface PopupGroupProps {
    open: boolean;
    setPopup: React.Dispatch<React.SetStateAction<boolean>>;
}
const PopupGroup: React.FC<PopupGroupProps> = ({ open, setPopup }) => {
    const [listName, setListName] = useState<string>("");

    const addGroupMenu = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        setPopup(false);
        try {
            // Lấy danh sách nhóm từ cơ sở dữ liệu
            const groupListRef = dbRef(database, "GroupList/");
            const groupListSnapshot = await get(groupListRef);
            let newKey;

            // Kiểm tra xem snapshot có dữ liệu hay không
            if (groupListSnapshot.exists()) {
                // Lấy danh sách nhóm hiện có
                const existingGroupList = groupListSnapshot.val();
                const currentLenght = Object.keys(existingGroupList).length;
                newKey = currentLenght + 1;

                // Thêm mục mới vào danh sách nhóm
            } else {
                // Nếu danh sách nhóm chưa tồn tại, tạo mới và thêm mục vào
                newKey = 1;
            }
            const newGroup = {
                [newKey]: listName,
            };
            await set(dbRef(database, `GroupList/${newKey}`), listName);
            message.success("Group Menu Added Successful");
        } catch (error) {
            alert("Unsuccessful");
            message.error("Add Error");
        }
    };

    return (
        <>
            <div className="fixed top-0 left-0 flex flex-col items-center justify-center w-full h-full bg-black bg-opacity-60 backdrop-blur-md z-50">
                <div className="absolute top-2 overflow-y-auto w-full max-w-[500px] max-h-95 box-border bg-white rounded-lg p-6 z-[999]">
                    <h3 className="text-black font-semibold">
                        Create menu group
                    </h3>
                    <form onSubmit={addGroupMenu}>
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
export default PopupGroup;
