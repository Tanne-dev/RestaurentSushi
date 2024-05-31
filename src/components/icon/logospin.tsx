"use client";

const LogoSpin = () => (
    <div className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <img
            src={"/sushi-cute.png"}
            alt="Loading"
            className="w-24 h-24 animate-bounce "
        />
    </div>
);

export default LogoSpin;
