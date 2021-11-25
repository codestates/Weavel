import React, { useEffect, useState } from "react";
import Map01 from "./Map01";
import Map02 from "./Map02";
import Map03 from "./Map03";
import Map04 from "./Map04";
import Map05 from "./Map05";
import Map06 from "./Map06";
import Map07 from "./Map07";
import Map08 from "./Map08";
import Map09 from "./Map09";
import Map10 from "./Map10";
import Map11 from "./Map11";
import Map12 from "./Map12";
import Map13 from "./Map13";
import Map14 from "./Map14";
import Map15 from "./Map15";
import Map16 from "./Map16";
import Map17 from "./Map17";
import { MapContainer } from "./MapIndex.style";
import { areas } from "./MapData";

function MapIndex({
  nowWeather,
  showArea,
  searchWeatherHandle,
  changeAreaHandle,
  weatherColor,
}) {
  const pickMap = (pickArea, e) => {
    const idx = e.target.id;
    searchWeatherHandle(true);
    changeAreaHandle(
      areas[pickArea][idx].name,
      areas[pickArea][idx].x,
      areas[pickArea][idx].y
    );
    setTimeout(() => {
      window.scrollTo({ top: 900, behavior: "smooth" });
    });
    // console.log("nx: ", areas[pickArea][idx].x);
    // console.log("ny: ", areas[pickArea][idx].y);
    // console.log("어디?: ", areas[pickArea][idx].name);
    // console.log("색깔: ", areas[pickArea][idx].isShow);
  };

  const [lenderMap, setLenderMap] = useState(areas[showArea]);

  useEffect(() => {
    let city = {};
    nowWeather.map((coordinate) => {
      const [x, y] = coordinate;
      for (let area in lenderMap) {
        const mapArea = { ...lenderMap[area] };
        if (!city[area]) {
          city[area] = mapArea;
        }
        if (city[area]) {
          if (city[area].x === x && city[area].y === y) {
            city[area].isShow = false;
          }
        }
      }
      setLenderMap(city);
    });
  }, [nowWeather]);

  useEffect(() => {
    return setLenderMap(areas[showArea]);
  }, []);

  return (
    <MapContainer>
      {showArea === "01" ? (
        <Map01
          weatherColor={weatherColor}
          lenderMap={lenderMap}
          pickMap={pickMap}
        />
      ) : null}
      {showArea === "02" ? (
        <Map02
          weatherColor={weatherColor}
          lenderMap={lenderMap}
          pickMap={pickMap}
        />
      ) : null}
      {showArea === "03" ? (
        <Map03
          weatherColor={weatherColor}
          lenderMap={lenderMap}
          pickMap={pickMap}
        />
      ) : null}
      {showArea === "04" ? (
        <Map04
          weatherColor={weatherColor}
          lenderMap={lenderMap}
          pickMap={pickMap}
        />
      ) : null}
      {showArea === "05" ? (
        <Map05
          weatherColor={weatherColor}
          lenderMap={lenderMap}
          pickMap={pickMap}
        />
      ) : null}
      {showArea === "06" ? (
        <Map06
          weatherColor={weatherColor}
          lenderMap={lenderMap}
          pickMap={pickMap}
        />
      ) : null}
      {showArea === "07" ? (
        <Map07
          weatherColor={weatherColor}
          lenderMap={lenderMap}
          pickMap={pickMap}
        />
      ) : null}
      {showArea === "08" ? (
        <Map08
          weatherColor={weatherColor}
          lenderMap={lenderMap}
          pickMap={pickMap}
        />
      ) : null}
      {showArea === "09" ? (
        <Map09
          weatherColor={weatherColor}
          lenderMap={lenderMap}
          pickMap={pickMap}
        />
      ) : null}
      {showArea === "10" ? (
        <Map10
          weatherColor={weatherColor}
          lenderMap={lenderMap}
          pickMap={pickMap}
        />
      ) : null}
      {showArea === "11" ? (
        <Map11
          weatherColor={weatherColor}
          lenderMap={lenderMap}
          pickMap={pickMap}
        />
      ) : null}
      {showArea === "12" ? (
        <Map12
          weatherColor={weatherColor}
          lenderMap={lenderMap}
          pickMap={pickMap}
        />
      ) : null}
      {showArea === "13" ? (
        <Map13
          weatherColor={weatherColor}
          lenderMap={lenderMap}
          pickMap={pickMap}
        />
      ) : null}
      {showArea === "14" ? (
        <Map14
          weatherColor={weatherColor}
          lenderMap={lenderMap}
          pickMap={pickMap}
        />
      ) : null}
      {showArea === "15" ? (
        <Map15
          weatherColor={weatherColor}
          lenderMap={lenderMap}
          pickMap={pickMap}
        />
      ) : null}
      {showArea === "16" ? (
        <Map16
          weatherColor={weatherColor}
          lenderMap={lenderMap}
          pickMap={pickMap}
        />
      ) : null}
      {showArea === "17" ? (
        <Map17
          weatherColor={weatherColor}
          lenderMap={lenderMap}
          pickMap={pickMap}
        />
      ) : null}
    </MapContainer>
  );
}

export default MapIndex;
