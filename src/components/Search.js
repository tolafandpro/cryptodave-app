import searchIcon from "../assets/search-icon.svg";
import { useState, useContext } from 'react';
import { CryptoContext } from './../context/CryptoContext';
import debounce from "lodash.debounce";


const SearchInput = ({handleResult}) => {
    const [searchText, setSearchText] = useState("");

    let {searchData} = useContext(CryptoContext);

    const handleSearch = (e) => {
        e.preventDefault();
        let query = e.target.value;
        setSearchText(query);
        handleResult(query);
    }
    console.log(searchText);

    return (
    <>
        <form className="w-96 relative flex items-center ml-7 font-nunito">
                    <input name="search" type="text" value={searchText} onChange={handleSearch} className="w-full rounded bg-gray-200 placeholder:text-gray pl-2 required outline-0 border border-transparent focus:border-cyan" placeholder="Search here..." />
                    <button type="submit" className="absolute right-1">
                        <img src={searchIcon} alt="search" className="w-full h-auto" />
                    </button>
                </form>
                {
                    searchText.length > 0 ?
                    <ul className="absolute top-11 right-0 w-full h-96 rounded overflow-x-hidden py-2 bg-gray-200 bg-opacity-60 backdrop-blur-sm">
                           {
                            searchData ? searchData.map((coin) => <li>{coin.id}</li>) : "Please wait feching data ...." 
                           }
                    </ul>
                        : null
                }
    </>
    )
}

const Search = () => {
   
    const { getSearchResult } = useContext(CryptoContext);

    const debounceFunc = debounce(function(val){getSearchResult(val)}, 2000)
    
    return (
        <>
            <SearchInput  handleResult={debounceFunc}/>
                01:42:00    
        </>

    );
}

export default Search;