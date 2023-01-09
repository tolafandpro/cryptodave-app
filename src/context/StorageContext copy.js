import { createContext, useLayoutEffect, useState } from "react";

// create context object
export const TrendingContext = createContext({});

// create the provider component
export const TrendingProvider = ({children}) => {
    const [trendData, setTrendData] = useState(); // This state get all data from the CoinGecko api and serves as the base api
    // const [searchData, setSearchData] = useState();
    // const [coinData, setCoinData] = useState();
 



    const getTrendData = async () => {
        
        try {
            const data = await fetch(`https://api.coingecko.com/api/v3/search/trending`)
            .then(res => res.json())
            .then(json => json);

            console.log(data);
            setTrendData(data.coins);

        } catch (error) {
            console.log(error)
        }
    }


    const resetTrendingResult = () =>{
        getTrendData();
    }

    useLayoutEffect(() => {
        getTrendData();
    }, [])

    return (
        <TrendingContext.Provider value={{ trendData, resetTrendingResult}}>
            {children}
        </TrendingContext.Provider>
    );
};