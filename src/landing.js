function landing(){
    return(
        // <!-- Navbar-->
        <div className="navbar" id="mynav">
           <ul> 
            <a href="#home" className="logo">Rent Hive</a>
            <a href="#">Home</a>
            <a href="#Properties">Properties</a>
            <a href="#footer">List Property</a>
            <a href="#footer">Contact Us</a>
            <a href="javascript:void(0);" class="icon" onclick="myFunction()">
                <i className="fa fa-bars"></i>
              </a>
           </ul>
          </div>
          
    );
}
export default landing;