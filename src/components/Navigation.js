import { NavLink } from "react-router-dom";

const Navigation = () => {
    return ( 
        <nav className="w-[40%] mt-16 flex justify-around align-middle border border-Pneon-50 rounded-lg">

           <NavLink to="/" end className={
                ({isActive}) => {
                    return `w-full text-base text-center font-nunito m-2.5
                    ${isActive ? 'bg-Pneon-50 text-gray-300' : 'bg-gray-200 text-gray-100 hover:text-Pneon-50 active:bg-Pneon-50 active:text-gray-300'}
                    border-0 cursor-pointer rounded capitalize font-bold`
           }}
                >
                Crypto
            </NavLink>
           <NavLink to="/trending" className={
                ({isActive}) => {
                    return `w-full text-base text-center font-nunito m-2.5
                    ${isActive ? 'bg-Pneon-50 text-gray-300' : 'bg-gray-200 text-gray-100 hover:text-Pneon-50 active:bg-Pneon-50 active:text-gray-300'}
                    border-0 cursor-pointer rounded capitalize font-bold`
           }}
                >
                Trending
            </NavLink>
           <NavLink to="/saved" className={
                ({isActive}) => {
                    return `w-full text-base text-center font-nunito m-2.5
                    ${isActive ? 'bg-Pneon-50 text-gray-300' : 'bg-gray-200 text-gray-100 hover:text-Pneon-50 active:bg-Pneon-50 active:text-gray-300'}
                    border-0 cursor-pointer rounded capitalize font-bold`
           }}
                >
                Saved
            </NavLink>

        </nav>
     );
}
 
export default Navigation;