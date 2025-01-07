import Home from "../Assets/Images/home.jpeg";
import Houses from "../Assets/Images/houses.jpeg";
import { FaMapMarkerAlt } from "react-icons/fa";

const Properties = () => 
{
  return (
    <div className="container py-2">
        <h4 className="text-center mb-2 tex-uppercase">Our Properties</h4>

        {/* Grid layout for the properties */}
        <div className="row">
            {/* Property 1 */}
            <div className="col-12 col-md-6 col-lg-3 mb-4">
                <div className="card h-100 border rounded shadow-sm">
                    <div className="flip-box">
                        <div className="flip-box-inner position-relative">
                            <div className="flip-box-front">
                                <img src={Home} className="card-img-top" alt="Home" />
                            </div>
                            <div className="flip-box-back position-absolute top-0 start-0 w-100 h-100 bg-light">
                                <img src={Houses} className="card-img-top" alt="Houses" />
                            </div>
                        </div>
                    </div>
                    <div className="card-body d-flex flex-column">
                        <p className="card-text">
                            This is a 2-bedroom master ensuite for rent in the suburbs of
                            Kiambu with ample parking space.
                        </p>
                        <p className="card-text">
                            Asking rent of Ksh. 54,000 plus Ksh. 6,000 service charge per
                            month. TOTAL = KSH. 60,000
                        </p>
                        <p className="text-muted d-flex align-items-center">
                            <FaMapMarkerAlt /> Kiambu Road, Kenya
                        </p>
                    </div>
                </div>
            </div>

            {/* Property 2 */}
            <div className="col-12 col-md-6 col-lg-3 mb-4">
                <div className="card h-100 border rounded shadow-sm">
                    <div className="flip-box">
                        <div className="flip-box-inner position-relative">
                            <div className="flip-box-front">
                                <img src={Home} className="card-img-top" alt="Home" />
                            </div>
                            <div className="flip-box-back position-absolute top-0 start-0 w-100 h-100 bg-light">
                                <img src={Houses} className="card-img-top" alt="Houses" />
                            </div>
                        </div>
                    </div>
                    <div className="card-body d-flex flex-column">
                        <p className="card-text">
                            This 4 bedroom master en-suite villa (maisonette) in a gated community.
                        </p>
                        <p className="card-text mt-4">
                            It is 5 minutes’ drive to the Ridgeways mall and 15 minutes’ drive to the UN.
                        </p>
                        <p className="text-muted d-flex align-items-center">
                            <FaMapMarkerAlt /> Kiambu Road, Kenya
                        </p>
                    </div>
                </div>
            </div>

            {/* Property 3 */}
            <div className="col-12 col-md-6 col-lg-3 mb-4">
                <div className="card h-100 border rounded shadow-sm">
                    <div className="flip-box">
                        <div className="flip-box-inner position-relative">
                            <div className="flip-box-front">
                                <img src={Home} className="card-img-top" alt="Home" />
                            </div>
                            <div className="flip-box-back position-absolute top-0 start-0 w-100 h-100 bg-light">
                                <img src={Houses} className="card-img-top" alt="Houses" />
                            </div>
                        </div>
                    </div>
                    <div className="card-body d-flex flex-column">
                        <p className="card-text">
                            This Bedsitter is walking distance to Kenyatta University.
                        </p>
                        <p className="card-text mt-4">
                            Garden, ample parking, water available throughout., CCTV & 24 hour security, manned gate, laundry area.
                        </p>
                        <p className="text-muted d-flex align-items-center">
                            <FaMapMarkerAlt /> Kahawa Wendani, Kiambu
                        </p>
                    </div>
                </div>
            </div>

            {/* Property 4 */}
            <div className="col-12 col-md-6 col-lg-3 mb-4">
                <div className="card h-100 border rounded shadow-sm">
                    <div className="flip-box">
                        <div className="flip-box-inner position-relative">
                            <div className="flip-box-front">
                                <img src={Home} className="card-img-top" alt="Home" />
                            </div>
                            <div className="flip-box-back position-absolute top-0 start-0 w-100 h-100 bg-light">
                                <img src={Houses} className="card-img-top" alt="Houses" />
                            </div>
                        </div>
                    </div>
                    <div className="card-body d-flex flex-column">
                        <p className="card-text">
                            Has 2-bedroom and 3-bedroom houses. Rent expected is 40K and 50K
                            respectively.
                        </p>
                        <p className="card-text">
                            Ample parking space, children playing space, and it is within a gated
                            community with good security.
                        </p>
                        <p className="text-muted d-flex align-items-center">
                            <FaMapMarkerAlt /> Kiambu, Kenya
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Properties;
