"use client";
import { useState } from "react";

interface AddProductProp {
    open: boolean;
    setPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddProduct: React.FC<AddProductProp> = ({ open, setPopup }) => {
    const [dataProduct, setDataProduct] = useState({
        urlphoto: "",
        title: "",
        description: "",
        price: "",
    });
    const [step, setStep] = useState(1);

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files;
        if (fileList) {
            const file = fileList[0];
            const imageURL = URL.createObjectURL(file);
            setDataProduct((prevState) => ({
                ...prevState,
                urlphoto: imageURL,
            }));
        }
    };

    const handleInputChange = (e: { target: { name: string; value: any } }) => {
        const { name, value } = e.target;
        setDataProduct((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[999]">
            <div className="bg-white p-8 rounded-lg shadow-lg w-4/5 max-w-4xl">
                <h2 className="text-gray-700 font-bold mb-6">Add a product</h2>
                <div className="flex mb-6">
                    <div className="w-2/3 pr-4">
                        <div className="flex mb-4">
                            {[1, 2, 3].map((num) => (
                                <div
                                    key={num}
                                    className="flex items-center mb-2 ml-8"
                                >
                                    <div
                                        className={`w-8 h-8 flex items-center justify-center rounded-full ${
                                            step === num
                                                ? "bg-black text-white"
                                                : "bg-gray-300 text-black"
                                        }`}
                                    >
                                        {num}
                                    </div>
                                    <div className="ml-2 font-medium">
                                        {num === 1
                                            ? "Description"
                                            : num === 2
                                            ? "Contents"
                                            : "Sale"}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <h3 className="text-xl text-gray-700 font-semibold mb-4">
                            Get started by describing your item
                        </h3>
                        <div className="mb-4">
                            <label className="cursor-pointer hover:bg-orange-500 hover:text-white text-orange-500 px-4 py-2 border border-gray-300 rounded-md">
                                <span>Upload image</span>
                                <input
                                    className="hidden"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleUploadImage}
                                />
                            </label>
                        </div>
                        <div className="mb-4">
                            <label className="block font-medium mb-1">
                                Group Menu{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="fruit"
                                className="block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-300 focus:border-orange-300 sm:text-sm p-2"
                            >
                                <option value="" disabled selected>
                                    Choose Group Menu
                                </option>
                                <option value="apple" className="p-2">
                                    Ura Maki
                                </option>
                                <option value="banana" className="p-2">
                                    Futo Maki
                                </option>
                                <option value="orange" className="p-2">
                                    Salad
                                </option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block font-medium mb-1">
                                Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={dataProduct.title}
                                className="w-full px-3 py-2 border-2 focus:outline-none focus:ring-orange-300 focus:border-orange-300 border-gray-400 rounded-md"
                                placeholder="Item title..."
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-medium mb-1">
                                Description
                                <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="description"
                                value={dataProduct.description}
                                className="w-full px-3 py-2 border-2 focus:outline-none focus:ring-orange-300 focus:border-orange-300 border-gray-400 rounded-md"
                                placeholder="Item description..."
                                onChange={handleInputChange}
                            ></textarea>
                        </div>

                        <div className="flex justify-between">
                            <button
                                onClick={prevStep}
                                className="px-4  font-medium bg-gray-300 rounded-md"
                                disabled={step === 1}
                            >
                                Previous
                            </button>
                            <button
                                onClick={nextStep}
                                className="px-4  font-medium bg-green-300 rounded-md"
                                disabled={step === 3}
                            >
                                Next
                            </button>
                            <button
                                onClick={() => setPopup(!open)}
                                className="px-4  font-medium bg-red-300 rounded-md"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col w-1/3 pl-4">
                        <h3 className="text-xl text-gray-700 font-semibold mb-4">
                            Product preview
                        </h3>
                        <div className="flex border-gray-400 drop-shadow-xl rounded-xl mb-4">
                            <div className="p-1 bg-white w-full h-40 border-2">
                                {dataProduct.urlphoto ? (
                                    <img
                                        alt="Product Preview"
                                        className="w-full h-full object-cover rounded-xl"
                                        src={dataProduct.urlphoto}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                                        No image selected
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex-1 p-4 bg-white rounded-lg shadow-md">
                            <h4 className="text-[1.2rem]  text-orange-500 font-medium mb-2">
                                Title
                            </h4>
                            <span className="text-[1.2rem] line-clamp-1 text-black block mb-4">
                                {dataProduct.title || "No title provided"}
                            </span>
                            <p className="text-[1.2rem] text-orange-500 font-medium mb-2">
                                Description
                            </p>
                            <span className="text-[1rem] line-clamp-4  text-black break-words block mb-4">
                                {dataProduct.description ||
                                    "No description provided"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
