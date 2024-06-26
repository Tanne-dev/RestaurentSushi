"use client";
import Catergories from "@/app/catergories/page";
import dbFireStore from "@/app/firebase/config";
import { message } from "antd";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

interface AddProductProp {
    open: boolean;
    setPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddProduct: React.FC<AddProductProp> = ({ open, setPopup }) => {
    const [dataProduct, setDataProduct] = useState({
        categories: "",
        urlphoto: "",
        title: "",
        description: "",
        price: 0,
    });
    const [originalPrice, setOriginalPrice] = useState("");
    const [vat, setVat] = useState("");

    const [categories, setCategories] = useState<any[]>([]);

    const fetchCategories = async () => {
        try {
            const unsub = await onSnapshot(
                collection(dbFireStore, "catergories"),
                (snapshot) => {
                    const docs: any = [];
                    snapshot.forEach((doc: any) => {
                        docs.push({
                            ...doc.data(),
                            id: doc.id,
                        });
                    });
                    setCategories(docs);
                }
            );
            return unsub;
        } catch (error) {
            console.error(error);
            setCategories([]);
        }
    };

    const addProduct = async (
        categories: string,
        urlphoto: string,
        title: string,
        description: string,
        price: number
    ) => {
        try {
            await addDoc(collection(dbFireStore, "Product"), {
                categories,
                urlphoto,
                title,
                description,
                price,
            });
            message.success(`Product ${title} added successfully`);
        } catch (error) {
            message.error(`Failed to add product ${title}`);
        }
    };

    const handleAddProduct = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (dataProduct.title && dataProduct.categories) {
            await addProduct(
                dataProduct.categories,
                dataProduct.urlphoto,
                dataProduct.title,
                dataProduct.description,
                dataProduct.price
            );
            setPopup(false);
        } else {
            message.error("Please fill in all required fields");
        }
    };

    useEffect(() => {
        const calculatePrice = () => {
            const price = parseFloat(originalPrice) || 0;
            const vatRate = parseFloat(vat) || 0;
            const total = price + (price * vatRate) / 100;
            setDataProduct((prevState) => ({
                ...prevState,
                price: parseFloat(total.toFixed(2)),
            }));
        };
        calculatePrice();
    }, [originalPrice, vat]);

    useEffect(() => {
        fetchCategories();
    }, []);

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
                <form onSubmit={handleAddProduct}>
                    <div className="flex mb-6">
                        <div className="w-2/3 pr-4">
                            <div className="flex mb-4">
                                {[1, 2].map((num) => (
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
                                            {num === 1 && "Description"}
                                            {num === 2 && "Sale"}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/* Product Description */}
                            <div
                                className={` ${
                                    step === 1 ? "block" : "hidden"
                                }`}
                            >
                                <h3 className="text-xl text-gray-700 font-medium mb-4">
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
                                        name="categories"
                                        className="block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-300 focus:border-orange-300 sm:text-sm p-2"
                                        value={dataProduct.categories}
                                        onChange={handleInputChange}
                                    >
                                        <option
                                            value=""
                                            disabled
                                            defaultValue={""}
                                        >
                                            Choose Group Menu
                                        </option>
                                        {categories.length === 0 ? (
                                            <option value="" disabled>
                                                No categories available
                                            </option>
                                        ) : (
                                            categories.map((item) => (
                                                <option
                                                    key={item.id}
                                                    value={item.name}
                                                >
                                                    {item.name}
                                                </option>
                                            ))
                                        )}
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-orange-600 mb-1">
                                        Title{" "}
                                        <span className="text-red-500">*</span>
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
                            </div>
                            {/* VAT price */}
                            <div
                                className={` ${
                                    step === 2 ? "block" : "hidden"
                                }`}
                            >
                                <div className="flex-1 mr-4">
                                    <h2 className="text-xl font-medium">
                                        Price
                                    </h2>
                                    <div className="flex items-center my-4">
                                        <div className="flex flex-col">
                                            <label
                                                className="text-orange-600 font-medium"
                                                htmlFor="original-price"
                                            >
                                                Original price
                                            </label>
                                            <input
                                                type="text"
                                                id="original-price"
                                                value={originalPrice}
                                                className="w-full p-2 border border-gray-300 rounded"
                                                placeholder="Original price"
                                                onChange={(e) =>
                                                    setOriginalPrice(
                                                        e.target.value
                                                    )
                                                }
                                                required
                                            />
                                        </div>
                                        <div className="flex flex-col ml-4">
                                            <span className="mb-2">VAT</span>
                                            <select
                                                value={vat}
                                                onChange={(e) =>
                                                    setVat(e.target.value)
                                                }
                                                className="p-1 border border-[1px] rounded-xl border-gray-300"
                                            >
                                                <option value="6">6%</option>
                                                <option value="12">12%</option>
                                                <option value="25">25%</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <span className="text-orange-600 font-medium">
                                            Total Price including VAT
                                        </span>
                                        <span className="font-medium text-">
                                            {dataProduct.price} Kr
                                        </span>
                                    </div>
                                    <div className=" my-4">
                                        <label
                                            htmlFor="made-to-order"
                                            className="block mb-2"
                                        >
                                            Made to order
                                        </label>
                                        <input
                                            type="checkbox"
                                            id="made-to-order"
                                            className="mr-2"
                                        />
                                        <label htmlFor="prep-time">
                                            Requires preparation time (8
                                            minutes)
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    className="px-4 font-medium bg-gray-300 rounded-md"
                                    disabled={step === 1}
                                >
                                    Previous
                                </button>
                                {step === 1 && (
                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        className="px-4 font-medium bg-green-300 rounded-md"
                                    >
                                        Next
                                    </button>
                                )}
                                {step === 2 && (
                                    <button
                                        type="submit"
                                        className="px-4 font-medium bg-green-300 rounded-md"
                                    >
                                        Save
                                    </button>
                                )}
                                <button
                                    type="button"
                                    onClick={() => setPopup(!open)}
                                    className="px-4 font-medium bg-red-300 rounded-md"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col w-1/3 pl-4">
                            <h3 className="text-xl text-gray-700 font-medium mb-4">
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
                                <h4 className="text-[1.2rem] font-medium text-orange-600 mb-2">
                                    Title
                                </h4>
                                <span className="text-[1.2rem] line-clamp-1 text-black block mb-4">
                                    {dataProduct.title || "No title provided"}
                                </span>
                                <p className="text-[1.2rem] text-orange-500 font-medium mb-2">
                                    Description
                                </p>
                                <span className="text-[1rem] line-clamp-4 text-black break-words block mb-4">
                                    {dataProduct.description ||
                                        "No description provided"}
                                </span>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
