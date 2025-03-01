import Navbar from "./Navbar";
import Properties from "./Properties";
import About from "./About";
import Footer from "./Footer";
import Services from "./Services";

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
        </>
     );
}
 
export default Landing;