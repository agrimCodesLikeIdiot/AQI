import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";

function Home() {
  const [Lat, setLat] = useState("")
  const [Long, setLong] = useState("")
  const [Location, setLocation] = useState("Tokyo");
  const [Temp, setTemp] = useState("");
  const [WindSeed, setWindSeed] = useState("");
  const [Desc, setDesc] = useState("");
  const [Aqi, setAqi] = useState("");
  const [Idx, setIdx] = useState("");
  const [ICON, setICON] = useState("℃");
  const [Units, setUnits] = useState("metric");
  const [WindUnits, setWindUnits] = useState("m/s");
  const api_key = "38334a8188792417c8a04443ee8ffaa5";
  const d = new Date();
  let hrs = d.getHours();
  let mins = d.getMinutes();
  let date = d.getDate();
  let mont = d.getMonth();

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${Location}&appid=${api_key}&units=${Units}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      setTemp(Math.round(data.main.temp));
      setWindSeed(data.wind.speed);
      setDesc(Math.round(data.main.feels_like));
      setIdx(data.main.humidity);
    })
    .catch((err) => {
      console.log(err);
      setTemp("Error");
      setWindSeed("Error");
      setDesc("Error");
    });

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=Tokyo&appid=${api_key}&units=${Units}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      document.getElementById("tkyTemp").innerHTML = Math.round(data.main.temp) + ICON;
    })
    .catch((err) => console.log(err));

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=Beijing&appid=${api_key}&units=${Units}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      document.getElementById("bejTemp").innerHTML = Math.round(data.main.temp) + ICON;
    })
    .catch((err) => console.log(err));

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=new york&appid=${api_key}&units=${Units}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      document.getElementById("nyTemp").innerHTML = Math.round(data.main.temp) + ICON;
    })
    .catch((err) => console.log(err));

  fetch(
    `http://api.waqi.info/feed/${Location}/?token=ae9c4af948615477c4ed3f1f3d198191bfa72bf9`
  )
    .then((res) => res.json())
    .then((data) => {
      setAqi(data.data.aqi);
    })
    .catch((err) => console.log(err));

  return (
    <React.Fragment>
      <Head>
        <title>myweather</title>
        <script src="https://cdn.tailwindcss.com/"></script>
      </Head>
      <div
        id="m"
        className="w-[100vw] h-[100vh] bg-[#212121] text-white overflow-hidden"
      >
        <nav className="flex p-2.5">
          <div className="flex space-x-2 items-center">
            <img src="https://img.icons8.com/ios-filled/20/FFFFFF/place-marker--v1.png" />
            <h1 className="font-mono font-bold mt-[2px]">{Location}</h1>
          </div>
          <div className="absolute left-[50%] translate-x-[-50%]">
            <div className="flex items-center">
              <img
                className="absolute left-0 pl-1"
                src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/32/FFFFFF/external-magnifying-glass-interface-kiranshastry-lineal-kiranshastry.png"
              />
              <input
                type="text"
                className="bg-[#333333] w-[360px] h-[40px] rounded-3xl pl-10 focus:outline-none"
                placeholder="Your City's Name, ex: Raliegh"
                value={Location}
                onChange={(e) => {
                  setLocation(e.target.value);
                  localStorage.setItem("loc", `${e.target.value}`);
                }}
              ></input>
            </div>
          </div>
        </nav>
        <div className="flex space-x-10">
          <div className="mt-[60px] text-black ml-2.5 w-[320px] h-[220px] bg-blue-300 rounded-3xl">
            <div className="flex w-[320px] rounded-t-3xl bg-blue-400 h-[50px] items-center">
              <h1 className="text-2xl font-bold pl-2.5">
                {date}.{mont} | {hrs}:
                {mins <= 9 ? <span>0{mins}</span> : <span>{mins}</span>}
              </h1>
            </div>
            <div className="p-2.5">
              <h1 className="text-7xl font-bold font-sans" id="weather">
                {Temp}
                {ICON}
              </h1>
              <div className="flex space-x-2 items-center">
                <h1 className="text-gray-500">
                  Feels Like:{" "}
                  <span className="text-black font-bold">
                    {Desc}
                    {ICON}
                  </span>
                </h1>
              </div>
              <div className="flex space-x-2 items-center">
                <h1 className="text-gray-500">
                  Wind:{" "}
                  <span className="text-black font-bold">
                    {WindSeed}
                    {WindUnits}
                  </span>
                </h1>
              </div>
              <div className="flex space-x-2 items-center">
                <h1 className="text-gray-500">
                  Humidity: <span className="text-black font-bold">{Idx}%</span>
                </h1>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-20 mt-[80px]">
            <h1 className="text-3xl font-thin">
              <button onClick={() => setLocation(localStorage.getItem("loc"))}>
                Would you like to find the weather <br /> of last searched city
              </button>
            </h1>
            <div className="flex space-x-4 items-center">
              <div className="w-[80px] h-[25px] bg-[#333333] rounded-2xl flex space-x-1 font-bold items-center justify-center">
                <img src="https://img.icons8.com/material-outlined/14/FFFFFF/leaf.png" />
                <span>{Aqi}</span>
              </div>
              <div className="w-[220px] h-[40px] rounded-3xl bg-[#333333] flex items-center">
                <button
                  id="wBtn"
                  onClick={() => {
                    let aqiBtn = document.getElementById("aqiBtn");
                    let wBtn = document.getElementById("wBtn");

                    wBtn.classList.add("bg-blue-300");
                    aqiBtn.classList.remove("text-black");
                    wBtn.classList.add("text-black");
                    aqiBtn.classList.remove("bg-blue-300");

                    setICON("℃");
                    setUnits("metric");
                    setWindUnits("m/s");
                  }}
                  className="w-[110px] h-[38px] rounded-3xl bg-blue-300 text-black font-bold text-lg"
                >
                  Metric
                </button>
                <button
                  onClick={() => {
                    let aqiBtn = document.getElementById("aqiBtn");
                    let wBtn = document.getElementById("wBtn");

                    aqiBtn.classList.add("bg-blue-300");
                    aqiBtn.classList.remove("text-white");
                    aqiBtn.classList.add("text-black");
                    wBtn.classList.add("text-white");
                    wBtn.classList.remove("text-black");
                    wBtn.classList.remove("bg-blue-300");

                    setICON("℉");
                    setUnits("imperial");
                    setWindUnits("mph");
                  }}
                  id="aqiBtn"
                  className="w-[110px] h-[38px] rounded-3xl text-white font-bold text-lg"
                >
                  Imperial
                </button>
              </div>
            </div>
          </div>
          <div className="fixed right-20 mt-[60px]">
            <div className="flex flex-col space-y-2">
              <h1 className="text-3xl font-bold">Other large cities</h1>
              <div className="bg-[#333333] p-2.5 w-[350px] items-center h-[130px] rounded-3xl flex space-x-4">
                <div className="flex flex-col space-y-1">
                  <span className="text-gray-500">Tokyo, Japan</span>
                  <h1 className="text-3xl font-semibold">Tokyo</h1>
                </div>
                <h1 className="text-5xl font-extrabold absolute right-10" id="tkyTemp">
                  69
                </h1>
              </div>
              <div className="bg-[#333333] p-2.5 w-[350px] items-center h-[130px] rounded-3xl flex space-x-4">
                <div className="flex flex-col space-y-1">
                  <span className="text-gray-500">New York, United States</span>
                  <h1 className="text-3xl font-semibold">New York City</h1>
                </div>
                <h1 className="text-5xl font-extrabold absolute right-10" id="nyTemp">
                  69
                </h1>
              </div>
              <div className="bg-[#333333] p-2.5 w-[350px] items-center h-[130px] rounded-3xl flex space-x-4">
                <div className="flex flex-col space-y-1">
                  <span className="text-gray-500">Beijing, China</span>
                  <h1 className="text-3xl font-semibold">Beijing</h1>
                </div>
                <h1 className="text-5xl font-extrabold absolute right-10" id="bejTemp">
                  69
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-2 p-2.5 pt-[15px]">
          <h1 className="text-3xl font-bold">Wind Map by Windy</h1>
          <iframe
            width="900"
            height="270"
            src="https://embed.windy.com/embed2.html?lat=28.768&lon=81.870&detailLat=26.876&detailLon=80.911&width=650&height=450&zoom=5&level=surface&overlay=wind&product=ecmwf&menu=&message=true&marker=true&calendar=now&pressure=true&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1"
            frameborder="0"
            className="rounded-3xl"
          ></iframe>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Home;
