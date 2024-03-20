export default function ButtonMenu() {
    return (
        <>
            <div>
                <ul className="flex justify-around">
                    {MenuListName.map((item) => (
                        <li
                            onClick={() => {
                                HandleActiveDisplay(item.name);
                            }}
                            key={item.id}
                        >
                            <button className="border-none text-white">
                                {item.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h3 className="text-white text-center p-5">{displayMenu}</h3>
                <div>
                    <MenuItem />
                </div>
            </div>
        </>
    );
}
