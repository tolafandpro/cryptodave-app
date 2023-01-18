import { createContext, useLayoutEffect, useState } from "react";

// create context object
export const CryptoContext = createContext({});

// create the provider component
export const CryptoProvider = ({children}) => {
    const [cryptoData, setCryptoData] = useState(); // This state get all data from the CoinGecko api and serves as the base api
    const [searchData, setSearchData] = useState();
    const [coinData, setCoinData] = useState();
    const [coinSearch, setCoinSearch] = useState("");
    
    
    const [currency, setCurrency] = useState("ngn");
    const [sortBy, setSortBy] = useState("market_cap_desc");
    const [pagination, setPagination] = useState(1);
    const [totalPages, setTotalPages] = useState(250);
    const [perPage, setPerPage] = useState(10);


    const getCoinData = async (coinid) => {
        setCoinData();
        try {
            const data = await fetch(`https://api.coingecko.com/api/v3/coins/${coinid}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=true&sparkline=false`)
            .then(res => res.json())
            .then(json => json);

            console.log("CoinData", data);
            setCoinData(data);

        } catch (error) {
            console.log(error)
        }
    }

    const getCryptoData = async () => {
        setCryptoData();
        setTotalPages(13220); //Nuber of total coin gotten from CoinGecko  (the code below is ment to fetch list of coins from CoinGecko but was disable for perfomance purpose)
        // try {
        //     const data = await fetch(`https://api.coingecko.com/api/v3/coins/list`)
        //     .then(res => res.json())
        //     .then(json => json);

        //     setTotalPages(data.length);

        // } catch (error) {
        //     console.log(error);
        // }

        try {
            const data = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${coinSearch}&order=${sortBy}&per_page=${perPage}&page=${pagination}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`)
            .then(res => res.json())
            .then(json => json);

            setCryptoData(data);

        } catch (error) {
            console.log(error)
        }
    }

    const getSearchResult = async (query) => {
        try {
            const data = await fetch(`https://api.coingecko.com/api/v3/search?query=${query}`)
            .then(res => res.json())
            .then(json => json);

            console.log(data);
            setSearchData(data.coins);

        } catch (error) {
            console.log(error)
        }
    }

    const resetFunction = () =>{
        setPagination(1);
        setSearchData("");
    }

    useLayoutEffect(() => {
        getCryptoData();
    }, [coinSearch, currency, sortBy, pagination, perPage])

    return (
        <CryptoContext.Provider value={{cryptoData, searchData, getSearchResult, setCoinSearch, setSearchData, currency, setCurrency, sortBy, setSortBy, pagination, setPagination, totalPages, resetFunction, perPage, setPerPage, coinData, getCoinData}}>
            {children}
        </CryptoContext.Provider>
    );
};