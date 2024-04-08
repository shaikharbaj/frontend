import Protected from "@/utils/Protected";
import Navbar from "../Components/Loader/Navbar/Navbar";

export default function RootLayout({ children }) {
    return (
        <>
            <Navbar/>
            <Protected>
                {children}
            </Protected>
        </>
    )
}