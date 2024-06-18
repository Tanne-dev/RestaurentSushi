"use client";

import dbFireStore from "@/app/firebase/config";
import { message } from "antd";
import {
    collection,
    addDoc,
    onSnapshot,
    deleteDoc,
    doc,
    query,
    where,
} from "firebase/firestore";

export const fetchCategories = async (setGetCategories: any) => {
    try {
        const unsub = onSnapshot(
            collection(dbFireStore, "catergories"), // Đảm bảo tên collection là 'categories'
            (snapshot) => {
                const docs: any = [];
                snapshot.forEach((doc: any) => {
                    docs.push({ ...doc.data(), id: doc.id });
                });
                setGetCategories(docs);
            }
        );
        return unsub;
    } catch (error) {
        console.error(error);
        setGetCategories([]);
    }
};

export const deleteCategory = async (id: string, name: string) => {
    try {
        //👇🏻 deletes the category
        await deleteDoc(doc(dbFireStore, "catergories", id));
        //👇🏻 delets the products within the category
        const q = query(
            collection(dbFireStore, "products"),
            where("category", "==", name)
        );
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((document) => {
                deleteDoc(doc(dbFireStore, "products", document.id));
            });
        });
    } catch (err) {
        console.log(err);
    }
};
