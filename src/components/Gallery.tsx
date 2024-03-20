import Image from "next/image";
const Gallery = () => {
    return (
        <section className="mt-36">
            <div className="flex flex-col">
                <div className="flex flex-col justify-center px-60 items-center">
                    <span className="text-white">Our Gallery</span>
                    <h2 className="text-white">Try Our Special Dishes</h2>
                    <p className="text-white text-center">
                        A list of top Bangladeshi food including mains, drinks,
                        and deserts you must try while in Bangladesh, for an
                        authentic experience. Check now!
                    </p>
                </div>
                <div className="flex mt-14 h-[570px]">
                    <div className="h-full w-1/2 ">
                        <Image
                            className="top-[165px] left-0"
                            src={"/Sashimi.webp"}
                            width={"570"}
                            height={"570"}
                            objecfit={"contain"}
                            alt={"Sushi"}
                        ></Image>
                    </div>
                    <div className=" grid grid-rows-2 grid-flow-col gap-4">
                        <Image
                            width={"270"}
                            height={"270"}
                            src={"/Nigiri.webp"}
                            objecfit={"contain"}
                            alt="Image description"
                        />
                        <Image
                            width={"270"}
                            height={"270"}
                            src={"/Adamame.webp"}
                            objecfit={"contain"}
                            alt="Image description"
                        />
                        <Image
                            width={"270"}
                            height={"270"}
                            src={"/BiffShasimi.webp"}
                            objecfit={"contain"}
                            alt="Image description"
                        />
                        <Image
                            width={"270"}
                            height={"270"}
                            src={"/FireShirmp.png"}
                            objecfit={"contain"}
                            alt="Image description"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};
export default Gallery;
