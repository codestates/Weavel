import React, { useEffect, useState } from "react";
import Map from "./Map";
import { pathData } from "./MapData";
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
  };

  const [lenderMap, setLenderMap] = useState(areas[showArea]);

  useEffect(() => {
    if (nowWeather.length > 0 && Array.isArray(nowWeather[0])) {
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
    }
  }, [nowWeather]);

  useEffect(() => {
    return setLenderMap(areas[showArea]);
  }, []);

  return (
    <MapContainer>
      <Map
        weatherColor={weatherColor}
        lenderMap={lenderMap}
        pickMap={pickMap}
        showArea={showArea}
        pathData={pathData[showArea]}
      />
    </MapContainer>
  );
}

export default MapIndex;
