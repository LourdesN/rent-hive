import Navbar from "./Navbar";
import Properties from "./Properties";
import About from "./About";
import Footer from "./Footer";

const Landing = () => 
{
    return ( 
        <>
            <Navbar/>
            <div>
      <About />
    </div>
            <Properties/>
            <Footer/>
        </>
     );
}
 
export default Landing;