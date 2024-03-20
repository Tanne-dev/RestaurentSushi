const Quickinfo = () => {
    return (
        <div className=" w-full mt-20 lg:mt-32 bg-orange-500 rounded-xl">
            <div className="flex flex-col lg:flex-row gap-10 justify-evenly items-center p-10">
                <div className="flex flex-col items-center">
                    <h3 className="text-black font-medium">
                        <span>Our Online</span>
                    </h3>
                    <p className="text-[1.2rem] text-black font-medium">
                        0123-456-7890 <br /> 0123-654-7890
                    </p>
                </div>

                <div className="flex flex-col items-center">
                    <h3 className="text-black font-medium">Our Address</h3>
                    <p className="text-[1.2rem] text-black font-medium">
                        245-5 Waterview <br /> Lane New Mexico, 87120
                    </p>
                </div>
                <div className="flex flex-col items-center">
                    <h3 className="text-black font-medium">Our Hours</h3>
                    <p className="text-[1.2rem] text-black font-medium">
                        Mon - Fri 09:00 AM - 10:00 PM <br /> Sat - Sun 09:00 AM
                        - 10:00 PM
                    </p>
                </div>
            </div>
        </div>
    );
};
export default Quickinfo;
