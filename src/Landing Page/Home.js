import Navbar from "./Navbar";
import Properties from "./Properties";
import About from "./About";
import Footer from "./Footer";
import Services from "./Services";

import ScrollToTop from "react-scroll-to-top";

const Landing = () => 
{
    return ( 
        <>
            <Navbar/>
            <div id="about">
                <About />
            </div>
            <div id="services">
                <Services/>
            </div>
            <div id="properties">
                <Properties/>
            </div>
            <div id="contact">
                <Footer/>
            </div>
            <ScrollToTop smooth top={40} color="#6f00ff"/>
        </>
     );
}
 
export default Landing;