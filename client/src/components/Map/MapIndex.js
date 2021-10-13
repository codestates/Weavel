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
import { area } from "./MapData";

function MapIndex({
  nowWeather,
  isShowWeatherInfo,
  showArea,
  searchWeatherHandle,
  changeAreaHandle,
}) {
  let showMap;
  // const [nowWeather, setNowWeather] = useState([
  //   [61, 127],
  //   [62, 126],
  //   [59, 125],
  //   [59, 127],
  //   [62, 128],
  //   [60, 127],
  //   [58, 126],
  //   [98, 76],
  // ]);

  const pickMap = (pickArea, e) => {
    const idx = e.target.id;
    if (area[pickArea][idx].name === showMap) {
      searchWeatherHandle(!isShowWeatherInfo);
    } else {
      searchWeatherHandle(true);
    }
    showMap = area[pickArea][idx].name;
    changeAreaHandle(area[pickArea][idx].name, area[pickArea][idx].x, area[pickArea][idx].y);
    console.log("nx: ", area[pickArea][idx].x);
    console.log("ny: ", area[pickArea][idx].y);
    console.log("어디?: ", area[pickArea][idx].name);
  };

  const [lenderMap, setLenderMap] = useState(area[showArea]);

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
            city[area].isShow = true;
          }
        }
      }
      setLenderMap(city);
    });
  }, [nowWeather]);

  return (
    <MapContainer>
      {showArea === "01" ? <Map01 lenderMap={lenderMap} pickMap={pickMap} /> : null}
      {showArea === "02" ? <Map02 lenderMap={lenderMap} pickMap={pickMap} /> : null}
      {showArea === "03" ? <Map03 lenderMap={lenderMap} pickMap={pickMap} /> : null}
      {showArea === "04" ? <Map04 lenderMap={lenderMap} pickMap={pickMap} /> : null}
      {showArea === "05" ? <Map05 lenderMap={lenderMap} pickMap={pickMap} /> : null}
      {showArea === "06" ? <Map06 lenderMap={lenderMap} pickMap={pickMap} /> : null}
      {showArea === "07" ? <Map07 lenderMap={lenderMap} pickMap={pickMap} /> : null}
      {showArea === "08" ? <Map08 lenderMap={lenderMap} pickMap={pickMap} /> : null}
      {showArea === "09" ? <Map09 lenderMap={lenderMap} pickMap={pickMap} /> : null}
      {showArea === "10" ? <Map10 lenderMap={lenderMap} pickMap={pickMap} /> : null}
      {showArea === "11" ? <Map11 lenderMap={lenderMap} pickMap={pickMap} /> : null}
      {showArea === "12" ? <Map12 lenderMap={lenderMap} pickMap={pickMap} /> : null}
      {showArea === "13" ? <Map13 lenderMap={lenderMap} pickMap={pickMap} /> : null}
      {showArea === "14" ? <Map14 lenderMap={lenderMap} pickMap={pickMap} /> : null}
      {showArea === "15" ? <Map15 lenderMap={lenderMap} pickMap={pickMap} /> : null}
      {showArea === "16" ? <Map16 lenderMap={lenderMap} pickMap={pickMap} /> : null}
      {showArea === "17" ? <Map17 lenderMap={lenderMap} pickMap={pickMap} /> : null}
    </MapContainer>
  );
}

export default MapIndex;
