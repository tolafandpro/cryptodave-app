import Search from "./Search";
import SubmitImg from "../assets/submit-icon.svg";
import selectIcon from "../assets/select-icon.svg";
import resetIcon from "../assets/reset.svg";
// import ResetIcon from "../assets/reset";
import { useContext, useRef } from "react";
import { CryptoContext } from "../context/CryptoContext";

const Filters = () => {
  let { setCurrency, setSortBy, resetFunction } = useContext(CryptoContext);
  const currencyRef = useRef(null);

  const handleCurrencySubmit = (e) => {
    e.preventDefault();
    let val = currencyRef.current.value;
    setCurrency(val);
    currencyRef.current.value = "";
  };

  const handleSort = (e) => {
    e.preventDefault();
    let val = e.target.value;
    setSortBy(val);
  };

  return (
    <div className="w-full lg:h-12 h-full lg:border-2 rounded-lg border-solid lg:border-gray-100 border-0 flex lg:flex-row flex-col lg:items-center lg:justify-between relative align-start justify-between">
      <Search />
      <div className="flex lg:mr-7 justify-between mt-4 lg:mt-0 sm:flex-row flex-col relative">
        <form
          className="relative flex items-center font-nunito md:mr-12 mr-1"
          onSubmit={handleCurrencySubmit}
        >
          <label
            htmlFor="currency"
            className="relative flex justify-center items-center mr-2 font-bold"
          >
            currency
          </label>
          <input
            ref={currencyRef}
            type="text"
            name="currency"
            placeholder="NGN"
            className="w-16 rounded bg-gray-200 placeholder:text-gray-100  placeholder:text-base required outline-0  border border-transparent focus:border-Pneon-50 leading-4  sm:text-base text-sm sm:p-0 sm:pl-2 p-1"
          />
          <button type="submit" className="ml-1 cursor-pointer">
            <img src={SubmitImg} alt="submite" className="w-full h-auto" />
          </button>
        </form>

        <label className="relative flex sm:justify-center justify-start items-center mt-4 sm:mt-0">
          <span className="mr-2 sm:font-bold font-medium sm:text-base text-sm w-16">Sort by:</span>
          <select
            onClick={handleSort}
            name="sortby"
            className="rounded bg-gray-200 sm:text-base text-sm pl-2 pr-10 py-1.5 focus:outline-0 text-transparent appearance-none capitalize leading-4 w-full sm:w-48"
          >
            <option value="market_cap_desc">market cap desc</option>
            <option value="market_cap_asc">market cap asc</option>
            <option value="volume_desc">volume desc</option>
            <option value="volume_asc">volume asc</option>
            <option value="gecko_desc">gecko desc</option>
            <option value="gecko_asc">gecko asc</option>
            <option value="id_desc">id desc</option>
            <option value="id_asc">id asc</option>
          </select>
          <img
            src={selectIcon}
            alt="submit"
            className="w-[1rem] h-auto absolute right-1 top-2 pointer-events-none"
          />
        </label>
        <button
          onClick={resetFunction}
          className="w-[2rem] ml-4 hover:scale-110 transition-all transition-ease absolute right-0 top-0 sm:relative"
        >
          {/* <ResetIcon className="w-200 h-200" /> */}
          <img className="w-full h-full" src={resetIcon} alt="reset" />
        </button>
      </div>
    </div>
  );
};

export default Filters;
