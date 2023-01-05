import React from "react";
import ReactDOM from "react-dom";
import { useNavigate, useParams } from "react-router-dom";
import { useLayoutEffect } from "react";
import { useContext } from "react";
import { CryptoContext } from "./../context/CryptoContext";

const CryptoDetalis = () => {
  let { coinId } = useParams();
  let navigate = useNavigate();
  let { getCoinData, coinData: data } = useContext(CryptoContext);

  useLayoutEffect(() => {
    getCoinData(coinId);
  }, [coinId]);

  const close = () => {
    navigate("..");
  };

  return ReactDOM.createPortal(
    <div
      onClick={close}
      className="fixed top-0 w-full h-full bg-gray-200 bg-opacity-30 backdrop-blur-sm flex items-center justify-center font-nunito"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[65%] h-[75%] bg-gray-300 bg-opacity-75 rounded-lg text-white relative"
      >
        {data ? (
          <div className="flex items-center justify-between h-full w-full p-4">
            <div className="flex flex-col w-[45%] h-full pr-2">
              <img src={data.image.large} />
              <h1>{data.name}</h1>
              <span>{data.symbol}</span>
            </div>
            <div className="flex flex-col w-[55%] h-full pr-3 bg-red">
              right
            </div>
          </div>
        ) : null}
      </div>
    </div>,
    document.getElementById("model")
  );
};

export default CryptoDetalis;
