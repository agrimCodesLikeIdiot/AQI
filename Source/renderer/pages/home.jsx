import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";

function Home() {
  const [city, setcity] = useState("Nairobi");
  const [temp, settemp] = useState(0);
  const [desc, setdesc] = useState("Never gonna give you up");
  const [wind, setwind] = useState(0);
  const [aqi, setaqi] = useState(0);
  const [forecast, setforecast] = useState(0);

  const d = new Date();
  const hrs = d.getHours();
  const mins = d.getMinutes();
  const date = d.getDate();
  const month = d.getMonth();
  const year = d.getFullYear();

  fetch(`https://goweather.herokuapp.com/weather/${city}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      settemp(data.temperature);
      setdesc(data.description);
      setwind(data.wind);
    });

  fetch(
    `http://api.waqi.info/feed/${city}/?token=ae9c4af948615477c4ed3f1f3d198191bfa72bf9`
  )
    .then((res) => res.json())
    .then((data) => {
      setaqi(data.data.aqi);
    });

  return (
    <React.Fragment>
      <Head>
        <title>AQI</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>
      <div className="w-[100vw] h-[100vh] bg-[#1F1F1F] text-white backdrop-filter-md">
        <nav className="flex justify-center p-2.5">
          <input
            value={city}
            onChange={(e) => setcity(e.target.value)}
            className="w-[240px] h-[40px] rounded-lg bg-[#282828] pl-2.5 focus:outline-none"
          />
        </nav>
        <br />
        <div className="flex space-x-2">
          <div>
            <h1 className="text-3xl font-semibold font-mono pl-2.5">{city}</h1>
            <h1 className="text-gray-500 pl-2.5">
              {hrs}:{mins <= 9 ? <span>0{mins}</span> : <span>{mins}</span>},{" "}
              {date}.{month}.{year}
            </h1>
          </div>
        </div>
        <br />
        <div className="flex justify-center">
          <div className="flex justify-center items-center w-[340px] h-[340px] rounded-3xl bg-gradient-to-r from-[#AC55A4] to-[#3562E7]">
            <div>
              <h1 className="tracking-wide font-semibold text-center">
                {desc}
              </h1>
              <h1 className="text-8xl font-bold font-serif">{temp}</h1>
            </div>
          </div>
        </div>
        <br />
        <div className="flex justify-center">
          <div className="w-[340px] h-[100px] rounded-lg bg-[#282828] flex justify-center p-2.5">
            <div>
              <div className="flex space-x-6">
                <h1 className="flex space-x-2">
                  <img src="https://img.icons8.com/dotty/24/FFFFFF/wind.png" />
                  <span className="font-bold">{wind}</span>
                </h1>
                <div className="absolute left-[85%] translate-x-[-85%] w-[80px] h-[25px] bg-[#1F1F1F] rounded-2xl flex space-x-1 font-bold items-center justify-center">
                  <img src="https://img.icons8.com/material-outlined/14/FFFFFF/leaf.png" />
                  <span>{aqi}</span>
                </div>
              </div>
              <button
                className="mt-[10px] w-[320px] h-[40px] rounded-lg bg-[#1F1F1F] font-bold flex space-x-2 justify-center items-center"
                onClick={() => {
                  window.open(
                    "https://www.iqair.com/in-en/world-air-quality-ranking"
                  );
                }}
              >
                <img src="https://img.icons8.com/material-outlined/24/40C057/leaf.png" />
                <span>Get air quality rankings</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Home;
