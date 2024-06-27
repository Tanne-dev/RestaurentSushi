"use client";
import { message } from "antd";
import { useState, useEffect } from "react";

import { ref as dbRef, remove } from "firebase/database";
import dbFireStore from "@/app/firebase/config";
import Ellipsis from "@/components/icon/ellipsis";
import Product from "./Product";
import { collection, onSnapshot } from "firebase/firestore";
import { deleteCategory } from "@/api/catergoriesService";
interface CategoriesItemsProps {}
interface VisibleOption {
    [key: number]: boolean;
}

const CategoriesItems: React.FC<CategoriesItemsProps> = () => {
    const [getCategories, setGetCategories] = useState<any[]>([]);
    const [visibleOption, setVisibleOption] = useState<VisibleOption>({});
    const fetchCategories = async (setGetCategories: any) => {
        try {
            const unsub = onSnapshot(
                collection(dbFireStore, "catergories"), // Đảm bảo tên collection là 'categories'
                (snapshot) => {
                    const docs: any = [];
                    snapshot.forEach((doc: any) => {
                        docs.push({ ...doc.data(), id: doc.id });
                    });
                    setGetCategories(docs);
                }
            );
            return unsub;
        } catch (error) {
            console.error(error);
            setGetCategories([]);
        }
    };
    useEffect(() => {
        fetchCategories(setGetCategories);
    }, []);

    const handleOptionGroup = (index: number) => {
        setVisibleOption((prevState) => ({
            ...prevState,
            [index]: !prevState[index],
        }));
    };

    const handleDeleteCatergories = async (id: string, name: string) => {
        try {
            const catergories = getCategories.find(
                (cat) => cat.id === id && cat.name === name
            );
            if (!catergories) {
                throw new Error("Catergory not found the name");
            }
            await deleteCategory(id, name);
            message.success(`🎉🎉🎉 ${name} deleted 🎉🎉🎉`);
        } catch (error) {
            message.error("Error deleting data Ooops.");
        }
    };

    return (
        <ul className="flex flex-col">
            {getCategories.map((item, index: number) => (
                <li className="px-2" key={item.id}>
                    <div className="relative hover:bg-slate-300  duration-200 transition-all  p-4 z-0 bg-gray-100 my-4 drop-shadow-lg rounded-lg">
                        <div className="flex justify-between items-center gap-4 ml-4">
                            <div className="flex items-center">
                                <span className="text-black text-[1.2rem]">
                                    {index + 1}
                                </span>
                                <h4 className="text-black font-medium text-[1.5rem] ml-2">
                                    {item.name}
                                </h4>
                            </div>
                            <div className="overflow-hidden flex items-center gap-3">
                                <ul
                                    className={`flex gap-2 transition-all duration-400 rounded-lg ease-in-out ${
                                        visibleOption[index]
                                            ? "opacity-100 translate-x-0"
                                            : "opacity-0 translate-x-[100%]"
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
                                                handleDeleteCatergories(
                                                    item.id,
                                                    item.name
                                                )
                                            }
                                            className="text-red-700 font-medium"
                                        >
                                            Delete Menu Group
                                        </button>
                                    </li>
                                </ul>

                                <button
                                    onClick={() => handleOptionGroup(index)}
                                    className="relative border-[2px] rounded-xl flex items-center gap-1 p-2 z-20"
                                >
                                    <Ellipsis />
                                </button>
                            </div>
                        </div>
                    </div>
                    <Product groupKey={item.id} catergory={item.name} />
                </li>
            ))}
        </ul>
    );
};

export default CategoriesItems;
