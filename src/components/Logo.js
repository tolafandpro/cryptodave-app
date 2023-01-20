import { Link } from "react-router-dom";
import logoSvg from "../assets/dlogo.svg";

const Logo = () => {
    return ( 
        <Link to="/" className="absolute sm:top-[1.5rem] top-[1rem] sm:left-[10rem] left-[1rem] [text-decoration:none]  text-Pneon-50 cursor-pointer flex items-center sm:text-lg text-md">
            <img src={logoSvg} alt="crypdave" />
            <span>CryptoDave</span>
        </Link>
     );
}
 
export default Logo;