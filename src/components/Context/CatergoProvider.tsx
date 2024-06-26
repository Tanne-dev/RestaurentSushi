"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";

interface CategoryContextProps {
    categories: string[];
    addCategory: (name: string) => void;
}

const CategoryContext = createContext<CategoryContextProps | undefined>(
    undefined
);

export const CategoryProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [categories, setCategories] = useState<string[]>([]);

    const addCategory = (name: string) => {
        setCategories((prevCategories) => [...prevCategories, name]);
    };

    return (
        <CategoryContext.Provider value={{ categories, addCategory }}>
            {children}
        </CategoryContext.Provider>
    );
};

export const useCategory = (): CategoryContextProps => {
    const context = useContext(CategoryContext);
    if (!context) {
        throw new Error("useCategory must be used within a CategoryProvider");
    }
    return context;
};
