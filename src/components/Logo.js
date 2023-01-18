import { Link } from "react-router-dom";
import logoSvg from "../assets/logo.svg";

const Logo = () => {
    return ( 
        <Link to="/" className="absolute top-[1.5rem] left-[1.5rem] [text-decoration: none] text-lg text-Pneon-50 flex items-center">
            <img src={logoSvg} alt="crypdave" />
            <span>CryptoDave</span>
        </Link>
     );
}
 
export default Logo;