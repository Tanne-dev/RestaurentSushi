"use client";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/components/Context/AuthProvider";

const useAuth = () => {
    const authContext = useContext(AuthContext);
    const uid = authContext ? authContext.uid : null;
    const user = authContext ? authContext.user : null;
    const admin = authContext ? authContext.isAdmin : null;

    useEffect(() => {
        // Rerender too many times will fix later here
        // console.log("useAuthUid hook called");
    }, [uid, user, admin]);

    return { uid, user, admin };
};

export default useAuth;
