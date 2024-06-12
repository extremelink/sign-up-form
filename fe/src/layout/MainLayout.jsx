import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import {motion} from "framer-motion"

const PageLayout = ({children}) => children; 

const pageVariants = {
    initial:{
        opacity:0
    },
    in:{
        opacity:1
    },
    out:{
        opacity:0
    }
}

const pageTransition = {
    type:"tween",
    ease:"linear",
    duration:0.5
}

const MainLayout =()=>{
    console.log(motion)
    const  {pathname} = useLocation
    return (
        <main>
            <Navbar />
            <PageLayout>
                <motion.div
                    key ={pathname}
                    initial="initial"
                    animate="in"
                    variants={pageVariants}
                    transition={pageTransition}
                    >
                    <Outlet />
                </motion.div>
            </PageLayout>
            <Footer />
        </main>
    )
}
export default MainLayout;