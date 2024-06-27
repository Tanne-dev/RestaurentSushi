import dbFireStore from "@/app/firebase/config";
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";

const crud = {
    fetchAll: async (collectionName: any) => {
        const colRef = collection(dbFireStore, "categories");
        const snapshot = await getDocs(colRef);
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    },
    create: async (collectionName: string, data: any) => {
        const colRef = collection(dbFireStore, "categories");
        const docRef = await addDoc(colRef, data);
        return docRef.id;
    },
    update: async (collectionName: string, id: string, data: any) => {
        const docRef = doc(dbFireStore, "categories", id);
        await updateDoc(docRef, data);
    },
    delete: async (collectionName: string, id: string) => {
        const docRef = doc(dbFireStore, "categories", id);
        await deleteDoc(docRef);
    },
};

export { crud };
