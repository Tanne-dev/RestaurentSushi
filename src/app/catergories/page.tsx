"use client";
import Search from "@/components/icon/search";
import UsersTab from "@/components/layout/UsersTab/Userstab";
import ChevronUp from "@/components/icon/chevronUp";
import ChevronDown from "@/components/icon/chevronDown";
import Setting from "@/components/icon/setting";
import PopupGroup from "@/components/layout/PopupGroup/PopupGroup";
import CatergoriesItems from "@/components/Menu/CatergoriesItems";
import { useState, useRef, useEffect, createContext } from "react";

export default function Catergories() {
    const [showEverythingOpen, setShowEverythingOpen] = useState(false);
    const [menuGroupOpen, setMenuGroupOpen] = useState(false);
    const [openPopup, setOpenPopup] = useState(false);
    const showEverythingRef = useRef<HTMLDivElement>(null);
    const menuGroupRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                showEverythingRef.current &&
                !showEverythingRef.current.contains(event.target as Node) &&
                menuGroupRef.current &&
                !menuGroupRef.current.contains(event.target as Node)
            ) {
                setShowEverythingOpen(false);
                setMenuGroupOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <section className="duration-200 ease-in-out transition-all ">
            <UsersTab />
            <div className="flex  items-center justify-between p-4">
                <div className="">
                    <h3>Your Catergories</h3>
                </div>
                <div className="gap-2 text-black flex h-10">
                    <label className="group flex items-center p-2 gap-1 justify-center ">
                        <Search />
                        <input
                            type="text"
                            placeholder="Search Item"
                            className="text-gray-500 w-[150px] focus:w-[250px] transition-all duration-200 ease-in-out"
                        />
                    </label>
                    <div className="flex flex-col" ref={showEverythingRef}>
                        <button
                            onClick={(e) => {
                                setShowEverythingOpen(!showEverythingOpen);
                                setMenuGroupOpen(false);
                            }}
                            type="button"
                            className="border-[2px] rounded-xl flex items-center gap-1 p-2 font-semibold"
                        >
                            <span>Show: Everything</span>
                            {showEverythingOpen ? (
                                <ChevronDown />
                            ) : (
                                <ChevronUp />
                            )}
                        </button>
                        <div
                            className={
                                showEverythingOpen
                                    ? "flex items-center flex-col w-full bg-gray-50 z-10 pt-1"
                                    : "hidden"
                            }
                        >
                            <span className="bg-gray hover:bg-slate-300 p-2 w-full rounded-xl font-semibold text-center text-gray-500">
                                Show Everything
                            </span>
                            <span className=" hover:bg-slate-300 p-2 w-full rounded-xl font-semibold text-center text-gray-500">
                                {" "}
                                Show Eatergories
                            </span>
                        </div>
                    </div>
                    <div className="z-[50]" ref={menuGroupRef}>
                        <button
                            onClick={(e) => {
                                setMenuGroupOpen(!menuGroupOpen);
                                setShowEverythingOpen(false);
                            }}
                            className="border-[2px] rounded-xl flex items-center gap-1 py-2 font-semibold"
                        >
                            <span>Short by: Menu groups</span>
                            {menuGroupOpen ? <ChevronDown /> : <ChevronUp />}
                        </button>
                        <div
                            className={
                                menuGroupOpen
                                    ? "flex items-center flex-col w-full bg-gray-50  pt-1"
                                    : "hidden"
                            }
                        >
                            <span className="bg-gray hover:bg-slate-300 p-2 w-full rounded-xl font-semibold text-center text-gray-500">
                                Title (A-Z)
                            </span>
                            <span className="bg-gray hover:bg-slate-300 p-2 w-full rounded-xl font-semibold text-center text-gray-500">
                                {" "}
                                Item created (Newest first)
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col group">
                        <button className=" relative  border-[2px] rounded-xl flex items-center gap-1 p-2 drop-shadow-lg">
                            <Setting></Setting>
                        </button>
                        <ul className=" group-hover:block  transition-all duration-200 rounded-lg ease-in-out hidden absolute  mt-10 translate-x-[-8rem] mx-auto z-[999] bg-slate-100">
                            <li className="text-black p-3 hover:bg-orange-300 cursor-pointer ">
                                Create New Item Menu
                            </li>
                            <li
                                onClick={() => {
                                    setOpenPopup(!openPopup);
                                }}
                                className="text-black p-3 hover:bg-orange-300 cursor-pointer "
                            >
                                Create New Item Group
                            </li>
                            <li className="text-black p-3 hover:bg-orange-300 cursor-pointer">
                                Import Menu From CSV
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/*  */}
            <div className="bg-gray-200 p-2 border-b-[1px] hover:drop-shadow-lg rounded-lg  border-t-gray-400">
                <div className="grid grid-cols-3 grid-rows-1 gap-x-4">
                    <div className="grid-cols-1 flex ">
                        <div className="flex flex-col just items-start ml-6 gap-2">
                            <span className="text-black">#</span>
                        </div>
                        <div className=" flex flex-col items-start ml-6 gap-2">
                            <span className="text-black">Item</span>
                        </div>
                    </div>
                    <div className="grid-cols-2"></div>
                    <div className="grid-cols-3 gap-10 flex justify-center">
                        <div className="flex flex-col items-center">
                            <span className="text-black">PRICE</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-black">SELLING</span>
                        </div>
                    </div>
                </div>
                <div>
                    <CatergoriesItems />
                </div>
            </div>
            {/* Popup Group Menu */}
            {openPopup && (
                <>
                    <PopupGroup
                        open={openPopup}
                        setPopup={setOpenPopup}
                    ></PopupGroup>
                </>
            )}
        </section>
    );
}
