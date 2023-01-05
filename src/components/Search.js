import searchIcon from "../assets/search-icon.svg";
import { useState, useContext } from 'react';
import { CryptoContext } from './../context/CryptoContext';
import debounce from "lodash.debounce";


const SearchInput = ({handleResult}) => {
    const [searchText, setSearchText] = useState("");
    let {searchData, setCoinSearch, setSearchData} = useContext(CryptoContext);

    const handleSearch = (e) => {
        e.preventDefault();
        let query = e.target.value;
        setSearchText(query);
        handleResult(query);
    }

    const handleSearchSubmite = (e) => {
        e.preventDefault();
        handleSearchSubmite(searchText);
    }

    const selectCoin = (coin) => {
        setCoinSearch(coin);
        setSearchText("");
        setSearchData();
    }

    return (
    <>
        <form className="w-96 relative flex items-center ml-7 font-nunito" onSubmit={handleSearchSubmite}>
                    <input name="search" type="text" value={searchText} onChange={handleSearch} className="w-full rounded bg-gray-200 placeholder:text-gray pl-2 required outline-0 border border-transparent focus:border-Pneon-50" placeholder="Search here..." />
                    <button type="submit" className="absolute right-1">
                        <img src={searchIcon} alt="search" className="w-full h-auto" />
                    </button>
                </form>
                {
                    searchText.length > 0 ? (
                    <ul className="absolute top-11 right-0 w-96 h-96 rounded overflow-x-hidden py-2 bg-gray-200 bg-opacity-60 backdrop-blur-sm scrollbar-thin scrollbar-thumb-Pneon-100 scrollbar-track-gray-200">
                           {
                            searchData ? searchData.map((coin) => {return <li key={coin.id} onClick={() => selectCoin(coin.id)} className="flex ml-4 items-center my-2 cursor-pointer">
                                <img className="w-[1rem] h-[1rem] mx-1.5" src={coin.thumb} alt={coin.name} />
                                <span>{coin.name}</span> </li>  })
                                 :  <div className="w-full h-full flex justify-center items-center">
                                    <div className="w-8 h-8 border-4 border-Pneon-50 rounded-full border-t-gray-200 animate-spin" role="status"/> <span className="ml-3">Searching</span>
                                 </div> 
                                 
                           }
                    </ul>
                    )
                        : null
                }
    </>
    )
}

const Search = () => {
   
    const { getSearchResult } = useContext(CryptoContext);

    const debounceFunc = debounce(function(val){getSearchResult(val)}, 2000)
    
    return (
        <div className="relative">
            <SearchInput  handleResult={debounceFunc}/>
        </div>

    );
}

export default Search;