import Ellipis from "@/components/icon/ellipsis";
export default function CatergoriesItems() {
    return (
        <>
            <div className="grid grid-cols-3 p-4 gap-x-4 bg-gray-100">
                <div className="flex items-start ml-6 gap-4">
                    <span className="text-black text-[1.5rem]">1</span>
                    <h4 className="text-black font-medium text-[1.5rem]">
                        Sushi Futo
                    </h4>
                </div>
                <div className="flex items-center justify-center"></div>
                <div className="flex items-center justify-end mr-8">
                    <div className="cursor-pointer hover:border-[0.5px]  border-gray-700 rounded-md">
                        <Ellipis />
                    </div>
                </div>
            </div>
        </>
    );
}
