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
            <div>
      <About />
    </div>
    <Services/>
            <Properties/>
            <Footer/>
        </>
     );
}
 
export default Landing;