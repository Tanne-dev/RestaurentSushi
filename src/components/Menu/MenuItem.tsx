import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
export default function MenuItem() {
    const [displayMenu, setDisplayMenu] = useState(0);

    type DataItems = {
        id: number;
        price: number;
        name: string;
        description: string;
        link: string;
    };
    const DataItems = [
        {
            name: "SUSHI MENYER",
            lists: [
                {
                    id: 1,
                    name: "Nigiri",
                    price: 69,
                    link: "/Nigiri.webp",
                    description: "1 TONFISK. 1 RÄKA. 1 AVOKADO. 3 LAX. 3 MAKI.",
                },
                {
                    id: 2,
                    name: "EBI",
                    price: 69,
                    link: "/Nigiri.webp",
                    description: "6 LAX. 4 LAX MAKI. 2 HOSO LAX.",
                },
                {
                    id: 3,
                    name: "BiffShasimi",
                    price: 69,
                    link: "/EBI.jpg",
                    description: "2 TONFISK. 1 RÄKA. 1 AVOKADO. 3 LAX. 3 MAKI.",
                },
            ],
        },
        {
            name: "HUSETRULLAR",
            lists: [
                {
                    id: 1,
                    name: "California",
                    price: 69,
                    link: "/CALIFORNIA.jpg",
                    description: "1 TONFISK. 1 RÄKA. 1 AVOKADO. 3 LAX. 3 MAKI.",
                },
                {
                    id: 2,
                    name: "CattlerPillar",
                    price: 69,
                    link: "/Catterpillar.png",
                    description:
                        "FRIT. RÄKOR. AVOKADO. VÅRLÖK. CHILIMAYO. LODDR",
                },
                {
                    id: 3,
                    name: "Earth Quake",
                    price: 69,
                    link: "/Nigiri.webp",
                    description: "LAX. GURKA. AVOKADO. CREAM CHEESE. SESAM.",
                },
            ],
        },
        {
            name: "Salad",
            lists: [
                {
                    id: 1,
                    name: "Biff Salad",
                    price: 69,
                    link: "/biff poke.jpg",
                    description: "LAX. GURKA. AVOKADO. CREAM CHEESE. SESAM.",
                },
                {
                    id: 1,
                    name: "Biff Salad",
                    price: 69,
                    link: "/biff poke.jpg",
                    description: "LAX. GURKA. AVOKADO. CREAM CHEESE. SESAM.",
                },
                {
                    id: 1,
                    name: "Biff Salad",
                    price: 69,
                    link: "/biff poke.jpg",
                    description: "LAX. GURKA. AVOKADO. CREAM CHEESE. SESAM.",
                },
                {
                    id: 2,
                    name: "Salmon Salad",
                    price: 69,
                    link: "/salmon poke.jpg",
                    description: "LAX. GURKA. AVOKADO. CREAM CHEESE. SESAM.",
                },
                {
                    id: 3,
                    name: "Shirmp Salad",
                    price: 69,
                    link: "/shirmpavo poke.jpg",
                    description: "LAX. GURKA. AVOKADO. CREAM CHEESE. SESAM.",
                },
            ],
        },
        {
            name: "catterplillar",
            lists: [
                {
                    id: 1,
                    name: "California",
                    price: 69,
                    link: "/Nigiri.webp",
                    description: "LAX. GURKA. AVOKADO. CREAM CHEESE. SESAM.",
                },
                {
                    id: 2,
                    name: "Shake Tataki",
                    price: 69,
                    link: "/Nigiri.webp",
                    description: "LAX. GURKA. AVOKADO. CREAM CHEESE. SESAM.",
                },
                {
                    id: 3,
                    name: "Earth Quake",
                    price: 69,
                    link: "/Nigiri.webp",
                    description: "LAX. GURKA. AVOKADO. CREAM CHEESE. SESAM.",
                },
            ],
        },
    ];

    return (
        <div>
            <div>
                {/* Menu List */}
                <ul className="flex justify-around">
                    {DataItems.map((item, index) => (
                        <li key={index}>
                            <button
                                onClick={() => {
                                    setDisplayMenu(index);
                                }}
                                className="border-none text-white"
                            >
                                {item.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h3 className="text-white text-center p-5">
                    {DataItems[displayMenu].name}
                </h3>
                <div>
                    <ul className="grid grid-cols-3 gap-4">
                        {/* MenuItem */}
                        {DataItems[displayMenu].lists.map((list) => (
                            <li
                                key={list.id}
                                className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl hover:scale-105 duration-300"
                            >
                                <div className="max-h-[360px] overflow-hidden object-cover">
                                    <Link href={"/"}>
                                        <Image
                                            className="object-cover"
                                            src={list.link}
                                            alt="Menu Item"
                                            width={"380"}
                                            height={"360"}
                                            objectFit="contain"
                                        />
                                    </Link>
                                </div>
                                <div className="flex flex-col p-4 space-y-2 border-b">
                                    <div className="absolute top-0 right-0 w-16 h-16">
                                        <div className="absolute bg-orange-400 right-[-36px] top-[40px] w-[185px] rotate-45 shadow-xl text-center text-md font-semibold py-1 bg-besmart-label-background text-besmart-label-text">
                                            {list.price} SEK
                                        </div>
                                    </div>
                                    <h3 className="text-left text-sm font-medium text-gray-900 truncate">
                                        <Link href={"/"}>{list.name}</Link>
                                    </h3>
                                    <p className="text-left text-sm text-gray-500 truncate">
                                        {list.description}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <div className="text-left">
                                            <label
                                                htmlFor="productQuantity"
                                                className="text-sm font-medium text-gray-900"
                                            >
                                                Quantity:
                                            </label>
                                        </div>
                                        <div>
                                            <div className="relative rounded-md shadow-sm px-1">
                                                <input
                                                    type="number"
                                                    min="1"
                                                    name="productQuantity"
                                                    id="productQuantity"
                                                    className="block w-full text-center rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-300 sm:text-sm"
                                                    aria-describedby="price-currency"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-4 p-4">
                                    <Link
                                        href={"/"}
                                        className="flex-1 flex items-center justify-center border border-transparent rounded-md py-2 text-sm font-medium text-besmart-button-text bg-besmart-button-background"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        type="button"
                                        className="flex-1 flex items-center justify-center border border-transparent rounded-md py-2 text-sm font-medium text-besmart-button-text bg-besmart-button-background"
                                    >
                                        Add
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
