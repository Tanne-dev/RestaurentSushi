"use client";
import MenuItem from "./MenuItem";
export default function HomeMenu() {
    return (
        <section className="mt-[5rem]">
            <div className="flex flex-col items-center ">
                <span className="text-white">Our Menu</span>
                <h2 className="text-white">Choose & Taste What You Like</h2>
                <p className="text-white text-center">
                    A list of top Bangladeshi food including mains, drinks, and
                    deserts you must try <br /> while in Bangladesh, for an
                    authentic experience. Check now!
                </p>
            </div>
            <div className="mt-[4rem]">
                <MenuItem />
            </div>
        </section>
    );
}
