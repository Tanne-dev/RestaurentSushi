"use client";
import Catergories from "@/app/catergories/page";
import dbFireStore from "@/app/firebase/config";
import { collection, getDocs, where, query } from "firebase/firestore";
import { useEffect, useState } from "react";

interface ItemsProps {
    groupKey: string;
    catergory: string;
}
interface Product {
    id: string;
    title: string;
    categories: string;
    urlphoto: string;
    price: number; // Assuming each category has a name. Adjust according to your actual data fields.
}
const Product: React.FC<ItemsProps> = ({ groupKey, catergory }) => {
    const [buttonStates, setButtonStates] = useState<Record<string, boolean>>(
        {}
    );
    const [products, setProducts] = useState<Product[]>([]);
    useEffect(() => {
        const fetchProductData = async () => {
            const productsQuery = query(
                collection(dbFireStore, "Product"),
                where("categories", "==", catergory) // Correct operator and use the catergory prop
            );
            const productSnapshot = await getDocs(productsQuery);
            const productData = productSnapshot.docs.map((doc) => ({
                ...(doc.data() as Product),
                id: doc.id,
            }));
            setProducts(productData);
        };

        fetchProductData();
    }, [catergory]);
    const handleActiveItems = (key: string) => {
        setButtonStates((prevState) => ({
            ...prevState,
            [key]: !prevState[key],
        }));
    };
    useEffect(() => {
        if (products.length > 0) {
            console.log("Products loaded", products);
        } else {
            console.log("Waiting for products to load...");
        }
    }, [products]);
    return (
        <div className="border-[1px] border-gray-300 p-2 rounded-lg">
            {products.map((product, key) => (
                <div
                    key={key}
                    className="grid grid-cols-3 grid-rows-1 mt-4 gap-x-4"
                >
                    <div className="grid-cols-1 flex items-center ml-4">
                        <div className="w-[55px] h-[55px] flex justify-center items-center relative">
                            <img
                                src={product.urlphoto}
                                alt="demo"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex flex-col items-start ml-6 gap-2">
                            <span className="text-black">{product.title}</span>
                        </div>
                    </div>
                    <div className="grid-cols-2"></div>
                    <div className="grid-cols-3 gap-10 flex items-center justify-center">
                        <div className="flex flex-col items-center">
                            <span className="text-black">
                                {product.price} SEK
                            </span>
                        </div>
                        <div key={groupKey}>
                            <div
                                onClick={() => handleActiveItems(groupKey)}
                                className="flex items-center cursor-pointer"
                            >
                                {buttonStates[groupKey] ? (
                                    <>
                                        <div className="h-4 min-w-[16px] rounded-full flex justify-center items-center text-white bg-[#69ff84] px-1 border-2 border-white"></div>
                                        <span className="text-black select-none">
                                            Yes
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <div className="h-4 min-w-[16px] rounded-full flex justify-center items-center text-white bg-[#f68f8f] px-1 border-2 border-white"></div>
                                        <span className="text-black select-none">
                                            No
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Product;
