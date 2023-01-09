import React, { useLayoutEffect, useContext, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { CryptoContext } from "./../context/CryptoContext";

// const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400},{name: 'Page B', uv: 100, pv: 2100, amt: 2100} ];

function CustomTooltip({ payload, label, active, currency = "usd" }) {
  if (active && payload && payload.length > 0) {
    return (
      <div className="custom-tooltip">
        <p className="label text-sm text-cyan">{`${label} : ${new Intl.NumberFormat(
          "en-NG",
          {
            style: "currency",
            currency,
            minimumFractionDigits: 5,
          }
        ).format(payload[0].value)}`}</p>
        {/* <p className="intro">{getIntroOfPage(label)}</p> */}
        {/* <p className="desc">Anything you want can be displayed here.</p> */}
      </div>
    );
  }

  return null;
}

const ChartComponent = ({ data, currency, type }) => {
  return (
    <ResponsiveContainer height={"90%"}>
      <LineChart width={400} height={400} data={data}>
        <Line
          type="monotone"
          dataKey={type}
          stroke="#9200cb"
          strokeWidth={"3px"}
        />
        <CartesianGrid stroke="#323232" />
        <XAxis dataKey="date" hide />
        <YAxis dataKey={type} hide domain={["auto", "auto"]} />
        <Tooltip
          content={<CustomTooltip />}
          currency={currency}
          cursor={false}
          wrapperStyle={{ outline: "none" }}
        />
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  );
};

const Chart = ({ id }) => {
  const [chartData, setChartData] = useState();
  let { currency } = useContext(CryptoContext);
  const [type, setType] = useState("prices");
  const [days, setDays] = useState(7);

  useLayoutEffect(() => {
    const getChartData = async (id) => {
      try {
        const data = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`
        )
          .then((res) => res.json())
          .then((json) => json);

        console.log("chart-data", data);

        let convertedData = data[type].map((item) => {
          return {
            date: new Date(item[0]).toLocaleDateString(),
            prices: item[1],
          };
        });

        console.log(convertedData);
        setChartData(convertedData);
      } catch (error) {
        console.log(error);
      }
    };
    getChartData(id);
  }, [id, type, days]);

  return (
    <div className="w-full h-[60%]">
      <ChartComponent data={chartData} currency={currency} type={type} />
      <div className="flex">
        <button
          className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${
            type === "prices"
              ? "bg-Pneon-100 text-Pneon-50"
              : "bg-gray-200 text-gray-100"
          }`}
          onClick={() => setType("prices")}
        >
          Price
        </button>
        <button
          className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${
            type === "market_caps"
              ? "bg-Pneon-100 text-Pneon-50"
              : "bg-gray-200 text-gray-100"
          }`}
          onClick={() => setType("market_cap")}
        >
          Market Cap
        </button>
        <button
          className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${
            type === "total_volumes"
              ? "bg-Pneon-100 text-Pneon-50"
              : "bg-gray-200 text-gray-100"
          }`}
          onClick={() => setType("total_volumes")}
        >
          Total Volumes
        </button>

        <button
          className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${
            days === 7
              ? "bg-Pneon-100 text-Pneon-50"
              : "bg-gray-200 text-gray-100"
          }`}
          onClick={() => setDays(7)}
        >
          7d
        </button>
        <button
          className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${
            days === 14
              ? "bg-Pneon-100 text-Pneon-50"
              : "bg-gray-200 text-gray-100"
          }`}
          onClick={() => setDays(14)}
        >
          14d
        </button>
        <button
          className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${
            days === 30
              ? "bg-Pneon-100 text-Pneon-50"
              : "bg-gray-200 text-gray-100"
          }`}
          onClick={() => setDays(30)}
        >
          30d
        </button>
      </div>
    </div>
  );
};

export default Chart;
