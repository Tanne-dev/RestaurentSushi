import Image from "next/image";
import Link from "next/link";

export default function Hero() {
    return (
        <section>
            <div className="mt-20 lg:mt-0 px-4 mx-auto">
                <div className=" h-full w-full mt-20 hidden lg:block lg:mt-0 ">
                    <Image
                        className="  absolute top-[165px] left-0"
                        src={"/Sushi_hero1.png"}
                        width={"424"}
                        height={"422"}
                        style={{ objectFit: "cover" }}
                        alt={"Sushi"}
                    ></Image>
                </div>
                <div className="mx-auto text-center lg:px-12">
                    <span className="text-[1rem] text-white ">
                        Welcome to Our Restaurant
                    </span>
                    <h1 className="text-4xl lg:text-7xl text-white mt-3">
                        The Best Sushi For <br /> The Best Moments
                    </h1>
                    <p className="text-[1rem] mt-3 lg:mt-0 text-orange-200 ">
                        We've got famous chefs and Tanne, Kenny Change, Hakim
                        <br className="hidden lg:block" /> Woolf—to thank for
                        some of the greatest food quotes of all time.
                    </p>
                    <div className="mt-10">
                        <Link
                            className="text-[1rem] underline text-orange-500"
                            href={"./"}
                        >
                            View More
                        </Link>
                    </div>
                </div>
                <div className="hidden lg:block lg:ml-5">
                    <Image
                        className="absolute  top-[120px] right-0 "
                        src={"/Sushi_hero1.png"}
                        width={"424"}
                        height={"422"}
                        style={{ objectFit: "cover" }}
                        alt={"Sushi"}
                    ></Image>
                </div>
            </div>
        </section>
    );
}
