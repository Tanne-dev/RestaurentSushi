// "use client";
// import { useState, createContext, ReactNode } from "react";
// interface CaterType {
//     openPopup: boolean;
//     setOpenPopup: React.Dispatch<React.SetStateAction<boolean>>;
// }
// const CaterContext = createContext<CaterType>({
//     openPopup: false,
//     setOpenPopup: () => {},
// });

// const CatergoProvider = ({ children }: { children: ReactNode }) => {
//     const [openPopup, setOpenPopup] = useState<boolean>(false);

//     return (
//         <CaterContext.Provider value={{ openPopup, setOpenPopup }}>
//             {children}
//         </CaterContext.Provider>
//     );
// };
// export { CaterContext, CatergoProvider };
// //
