"use client";
import Hero from "@/components/layout/Hero/Hero";
import Quickinfo from "@/components/layout/Hero/Quickinfo";
import Gallery from "@/components/Gallery";
import HomeMenu from "@/components/Menu/HomeMenu";

export default function Home() {
    return (
        <>
            <Hero></Hero>
            <Quickinfo></Quickinfo>
            <Gallery></Gallery>
            <HomeMenu></HomeMenu>
        </>
    );
}
