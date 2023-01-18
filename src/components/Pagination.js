import paginationArrow from "../assets/pagination-arrow.svg";
import { useContext, useRef } from "react";
import { CryptoContext } from "../context/CryptoContext";
import SubmitImg from "../assets/submit-icon.svg";

const PerPage = () => {
  const { setPerPage } = useContext(CryptoContext);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    let val = inputRef.current.value;
    if (val !== 0) {
      setPerPage(val);
      inputRef.current.value = val;
    }
  };

  return (
    <form
      className="relative flex items-center font-nunito mr-12"
      onSubmit={handleSubmit}
    >
      <label
        htmlFor="perpage"
        className="relative flex justify-center items-center mr-2 font-bold"
      >
        Per page:
      </label>
      <input
        ref={inputRef}
        type="number"
        name="perpage"
        min={1}
        max={250}
        placeholder="10"
        className="w-16 rounded bg-gray-200 placeholder:text-gray-100 pl-2 required outline-0 border border-transparent focus:border-Pneon-50 leading-4"
      />
      <button type="submit" className="ml-1 cursor-pointer">
        <img src={SubmitImg} alt="submite" className="w-full h-auto" />
      </button>
    </form>
  );
};

const Pagination = () => {
  // const [pagination, setPagination] = useState(1);
  let { pagination, setPagination, totalPages, perPage, cryptoData } = useContext(CryptoContext);

  const TotalNumber = Math.ceil(totalPages / perPage);

  const next = () => {
    if (pagination === TotalNumber) {
      return null;
    } else {
      setPagination(pagination + 1);
    }
  };
  const previous = () => {
    if (pagination === 1) {
      return null;
    } else {
      setPagination(pagination - 1);
    }
  };

  const multiStepNext = () => {
    //<-- This is a multistep fuction selection {...} choose 3 steps forward
    if (pagination + 3 >= TotalNumber) {
      setPagination(TotalNumber - 1);
    } else {
      setPagination(pagination + 3);
    }
  };

  const multiStepPrev = () => {
    //<-- This is a multistep fuction selection {...} choose 3 steps backwards
    if (pagination - 3 <= 1) {
      setPagination(TotalNumber + 1);
    } else {
      setPagination(pagination - 2);
    }
  };

  if (cryptoData && cryptoData.length >= perPage) {
    // <-- This statement is to disable the pagination when the length of coin is equal to one/ or one coin selected on the screen
    return (
      <div className="flex items-center">
        <PerPage />
        <ul className="flex items-center justify-end text-sm">
          <li className="flex items-center">
            <button
              className="outline-0 hover:text-Pneon-50 w-8"
              onClick={previous}
            >
              <img
                className="w-full h-auto rotate-180"
                src={paginationArrow}
                alt="left"
              />
            </button>
          </li>
          <li>
            {pagination + 1 === TotalNumber || pagination === TotalNumber ? (
              <button
                onClick={multiStepPrev}
                className="outline-0 hover:text-Pneon-50 rounded-full w-8 h-8 flex items-center justify-center text-md"
              >
                ...
              </button>
            ) : null}
          </li>
          <li>
            {pagination - 1 !== 0 ? (
              <button
                onClick={previous}
                className="outline-0 hover:text-Pneon-50 rounded-full w-8 h-8 flex items-center justify-center text-md bg-gray-200 mx-1"
              >
                {pagination - 1}
              </button>
            ) : null}
          </li>
          <li>
            <button
              disabled
              className="outline-0 rounded-full w-8 h-8 flex items-center justify-center text-gray-300 bg-Pneon-50 mx-1"
            >
              {pagination}
            </button>
          </li>
          <li>
            {pagination + 1 !== TotalNumber && pagination !== TotalNumber ? (
              <button
                onClick={next}
                className="outline-0 hover:text-Pneon-50 rounded-full w-8 h-8 flex items-center justify-center text-md bg-gray-200 mx-1"
              >
                {pagination + 1}
              </button>
            ) : null}
          </li>
          <li>
            {pagination + 1 !== TotalNumber && pagination !== TotalNumber ? (
              <button
                onClick={multiStepNext}
                className="outline-0 hover:text-Pneon-50 rounded-full w-8 h-8 flex items-center justify-center text-lg"
              >
                ...
              </button>
            ) : null}
          </li>
          <li>
            {pagination !== TotalNumber ? (
              <button
                onClick={() => setPagination(TotalNumber)}
                className="outline-0 hover:text-Pneon-50 rounded-full w-8 h-8 flex items-center justify-center text-sm bg-gray-200 mx-1"
              >
                {TotalNumber}
              </button>
            ) : null}
          </li>
          <li>
            <button
              className="outline-0 hover:text-Pneon-50 w-8"
              onClick={next}
            >
              <img
                className="w-full h-auto"
                src={paginationArrow}
                alt="right"
              />
            </button>
          </li>
        </ul>
      </div>
    );
  } else {
    return null;
  }
};

export default Pagination;
