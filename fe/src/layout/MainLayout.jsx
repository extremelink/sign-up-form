import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

const MainLayout =()=>{
    return (
        <main>
            <Navbar />
            <Outlet />
            <Footer />
        </main>
    )
}
export default MainLayout;