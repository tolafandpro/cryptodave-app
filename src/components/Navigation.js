import { NavLink } from "react-router-dom";

const Navigation = () => {
    return ( 
        <nav className="lg:w-[40%] sm:w-[80%] w-[90%] flex justify-around align-middle lg:mt-16 sm:mt-24 mt-20 border border-solid border-Pneon-50 sm:rounded-lg rounded-md">

           <NavLink to="/" end className={
                ({isActive}) => {
                    return `w-full md:text-base text-base text-center font-nunito m-2.5 sm:m-2.5
                    ${isActive ? 'bg-Pneon-50 text-gray-300' : 'bg-gray-200 text-gray-100 hover:text-Pneon-50 active:bg-Pneon-50 active:text-gray-300'}
                    border-0 cursor-pointer rounded capitalize font-bold`
           }}
                >
                Crypto
            </NavLink>
           <NavLink to="/trending" className={
                ({isActive}) => {
                    return `w-full md:text-base text-base text-center font-nunito m-2.5 sm:m-2.5
                    ${isActive ? 'bg-Pneon-50 text-gray-300' : 'bg-gray-200 text-gray-100 hover:text-Pneon-50 active:bg-Pneon-50 active:text-gray-300'}
                    border-0 cursor-pointer rounded capitalize font-bold`
           }}
                >
                Trending
            </NavLink>
           <NavLink to="/saved" className={
                ({isActive}) => {
                    return `w-full md:text-base text-base text-center font-nunito m-2.5 sm:m-2.5
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