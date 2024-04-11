import React, { useState } from "react";
import Link from "next/link";

const HamburgerMenu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav
            role="navigation"
            className="bg-gray-800 group p-4 lg:hidden overflow-visible"
        >
            <div
                id="menuToggle"
                className="relative flex justify-between items-center"
            >
                <div>
                    <input
                        type="checkbox"
                        className="absolute cursor-pointer opacity-0 z-20 h-8 w-8"
                        id="hamburger"
                        checked={isOpen}
                        onChange={(e) => setIsOpen(e.target.checked)}
                    />

                    <div className="flex flex-col space-y-2">
                        <span className="block w-8 h-1 bg-gray-300 transition-transform duration-500 peer-checked:bg-red-500 peer-checked:rotate-45 peer-checked:translate-y-2"></span>
                        <span className="block w-8 h-1 bg-gray-300 transition-all duration-500 peer-checked:opacity-0"></span>
                        <span className="block w-8 h-1 bg-gray-300 transition-transform duration-500 peer-checked:bg-red-500 peer-checked:-rotate-45 peer-checked:-translate-y-1"></span>
                    </div>
                </div>
                <button className=" w-2/4 h-[40px]  flex items-center justify-center  text-white">
                    Table Reservation
                </button>
                <ul
                    id="menu"
                    className={`absolute right-0 top-full w-full bg-gray-50 mt-4 text-gray-800 transform ${
                        isOpen ? "translate-x-0" : "-translate-x-[102%]"
                    } transition-transform duration-500 ease-in-out`}
                >
                    <li className="border-b border-gray-200">
                        <Link
                            href={"/"}
                            className="block p-4 transition-colors ease-linear duration-[0.3s] hover:bg-gray-100"
                        >
                            Home
                        </Link>
                    </li>
                    <li className="border-b border-gray-200">
                        <Link
                            href={"/"}
                            className="block p-4 transition-colors ease-linear duration-[0.3s] hover:bg-gray-100"
                        >
                            Menu
                        </Link>
                    </li>
                    <li className="border-b border-gray-200">
                        <Link
                            href={"/"}
                            className="block p-4 transition-colors ease-linear duration-[0.3s] hover:bg-gray-100"
                        >
                            Blog
                        </Link>
                    </li>
                    <li className="border-b border-gray-200">
                        <Link
                            href={"/"}
                            className="block p-4 transition-colors ease-linear duration-[0.3s] hover:bg-gray-100"
                        >
                            Pages
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={"/"}
                            target="_blank"
                            className="block p-4 transition-colors ease-linear duration-[0.3s] hover:bg-gray-100"
                        >
                            Work with us
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default HamburgerMenu;
