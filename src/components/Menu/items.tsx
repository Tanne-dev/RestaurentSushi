export default function CatergoriesItems() {
    return (
        <>
            <div className="grid grid-cols-3 grid-rows-1 gap-x-4">
                <div className="grid-cols-1 flex ">
                    <div className="flex flex-col just items-start ml-6 gap-2">
                        <span className="text-black">#</span>
                        <span className="text-black">1</span>
                    </div>
                    <div className=" flex flex-col items-start ml-6 gap-2">
                        <span className="text-black">Item</span>
                        <span className="text-black font-bold">Sushi Futo</span>
                    </div>
                </div>
                <div className="grid-cols-2"></div>
                <div className="grid-cols-3 gap-10 flex justify-center">
                    <div className="flex flex-col items-center">
                        <span className="text-black">PRICE</span>
                        <span className="text-black">Sek 127</span>
                    </div>
                    <button className="flex flex-col items-center">
                        <span className="text-black">SELLING</span>
                        <div>
                            <span className="text-black">Yes</span>
                        </div>
                    </button>
                </div>
            </div>
        </>
    );
}
