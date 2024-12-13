import { useState } from "react";

const Landing = ({fullName}) => 
{
    return ( 
        <>
            <h1 className="text-uppercase fs-2 fw-bold text-center">Welcome back, {fullName}</h1>
        </>
    );
}
 
export default Landing;