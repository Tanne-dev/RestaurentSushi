"use client";
import EditableImage from "../EditableImage/EditableImage";
import { useState } from "react";
interface AddProductProp {
    open: boolean;
    setPopup: React.Dispatch<React.SetStateAction<boolean>>;
}
const AddProduct: React.FC<AddProductProp> = ({ open, setPopup }) => {
    const [step, setStep] = useState(1);
    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[999]">
            <div className="bg-white p-8 rounded-lg shadow-lg w-4/5 max-w-4xl">
                <h2 className=" text-gray-700 font-bold mb-6">Add a product</h2>
                <div className="flex mb-6">
                    <div className="f w-2/3 pr-4">
                        <div className="flex  mb-4">
                            <div className="flex items-center mb-2 ">
                                <div
                                    className={`w-8 h-8 flex items-center justify-center rounded-full ${
                                        step === 1
                                            ? "bg-black text-white"
                                            : "bg-gray-300 text-black"
                                    }`}
                                >
                                    1
                                </div>
                                <div className="ml-2 font-mediums">
                                    Description
                                </div>
                            </div>
                            <div className="flex items-center mb-2 ml-8">
                                <div
                                    className={`w-8 h-8 flex items-center justify-center rounded-full ${
                                        step === 2
                                            ? "bg-black text-white"
                                            : "bg-gray-300 text-black"
                                    }`}
                                >
                                    2
                                </div>
                                <div className="ml-2 font-mediums">
                                    Contents
                                </div>
                            </div>
                            <div className="flex items-center mb-2 ml-8">
                                <div
                                    className={`w-8 h-8 flex items-center justify-center rounded-full ${
                                        step === 3
                                            ? "bg-black text-white"
                                            : "bg-gray-300 text-black"
                                    }`}
                                >
                                    3
                                </div>
                                <div className="ml-2 font-mediums">Sale</div>
                            </div>
                        </div>
                        <h3 className="text-xl text-gray-700 font-semibold mb-4">
                            Get started by describing your item
                        </h3>
                        <button className="mb-4 text-orange-500 px-4 border border-gray-300 rounded-md">
                            Upload image
                        </button>
                        <div className="mb-4">
                            <label className="block font-medium mb-1">
                                Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                className="w-full px-3 py-2  border-[2px]   border-gray-400 rounded-md"
                                placeholder="Item title..."
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-medium mb-1">
                                Description{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                className="w-full px-3 py-2 border rounded-md"
                                placeholder="Item description..."
                            ></textarea>
                        </div>
                        <div className="flex">
                            <button
                                onClick={prevStep}
                                className="px-4 font-medium bg-gray-300 rounded-md"
                            >
                                Previous
                            </button>
                            <button
                                onClick={nextStep}
                                className="px-4 font-medium bg-green-300 rounded-md"
                            >
                                Next
                            </button>
                            <button
                                onClick={() => {
                                    setPopup(!open);
                                }}
                                className="px-4 font-medium bg-red-300 rounded-md"
                            >
                                X
                            </button>
                        </div>
                    </div>
                    <div className="w-1/2 pl-4">
                        <h3 className="text-xl text-gray-700 font-semibold mb-4">
                            Product preview
                        </h3>
                        <div className="w-full h-32 bg-gray-200 flex items-center rounded-xl justify-center mb-4">
                            <div className="text-gray-500">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 mx-auto mb-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M14.752 11.168l-1.664 2.505a2.48 2.48 0 01-4.176 0l-1.664-2.505A2.48 2.48 0 015 9.727V7.73A2.48 2.48 0 017.742 5h8.516A2.48 2.48 0 0119 7.73v1.997a2.48 2.48 0 01-1.248 2.441z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 11v10M9 16h6"
                                    />
                                </svg>
                                Image
                            </div>
                        </div>
                        <div>
                            <h4 className="font-medium">Title</h4>
                            <p className="text-gray-700">Description</p>
                            <p className="text-gray-700">Price</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AddProduct;
