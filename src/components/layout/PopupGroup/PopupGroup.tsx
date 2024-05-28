export default function PopupGroup() {
    return (
        <>
            <div className="fixed top-0 left-0 flex flex-col items-center justify-center w-full h-full bg-black bg-opacity-60 backdrop-blur-md z-50">
                <div className="absolute top-2 overflow-y-auto w-full max-w-[500px] max-h-95 box-border bg-white rounded-lg p-6">
                    <h3 className="text-black font-semibold">
                        Create menu group
                    </h3>
                    <form>
                        <div>
                            <span className="font-normal">Menu group name</span>
                        </div>
                        <div>
                            <input
                                className="pl-2 pr-2  border-black border-[1px] rounded-lg bg-white text-black w-full min-w-0 box-border text-base h-9"
                                type="text"
                                name="name"
                                placeholder="Name"
                            ></input>
                        </div>
                        <div></div>
                        <div>
                            <button className="text-black">Cancel</button>
                            <button className="text-black">Create</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
