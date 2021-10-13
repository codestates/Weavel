import React, { useState } from "react";
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
  isShowWeatherInfo,
  showArea,
  searchWeatherHandle,
  changeAreaHandle,
  nowWeather,
}) {
  let showMap;
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

  const [showMap01, setShowMap01] = useState(area["01"]);
  const [showMap02, setShowMap02] = useState(area["02"]);
  const [showMap03, setShowMap03] = useState(area["03"]);
  const [showMap04, setShowMap04] = useState(area["04"]);
  const [showMap05, setShowMap05] = useState(area["05"]);
  const [showMap06, setShowMap06] = useState(area["06"]);
  const [showMap07, setShowMap07] = useState(area["07"]);
  const [showMap08, setShowMap08] = useState(area["08"]);
  const [showMap09, setShowMap09] = useState(area["09"]);
  const [showMap10, setShowMap10] = useState(area["10"]);
  const [showMap11, setShowMap11] = useState(area["11"]);
  const [showMap12, setShowMap12] = useState(area["12"]);
  const [showMap13, setShowMap13] = useState(area["13"]);
  const [showMap14, setShowMap14] = useState(area["14"]);
  const [showMap15, setShowMap15] = useState(area["15"]);
  const [showMap16, setShowMap16] = useState(area["16"]);
  const [showMap17, setShowMap17] = useState(area["17"]);

  console.log(showMap01);
  return (
    <MapContainer>
      {showArea === "01" ? <Map01 pickMap={pickMap} /> : null}
      {showArea === "02" ? <Map02 pickMap={pickMap} /> : null}
      {showArea === "03" ? <Map03 pickMap={pickMap} /> : null}
      {showArea === "04" ? <Map04 pickMap={pickMap} /> : null}
      {showArea === "05" ? <Map05 pickMap={pickMap} /> : null}
      {showArea === "06" ? <Map06 pickMap={pickMap} /> : null}
      {showArea === "07" ? <Map07 pickMap={pickMap} /> : null}
      {showArea === "08" ? <Map08 pickMap={pickMap} /> : null}
      {showArea === "09" ? <Map09 pickMap={pickMap} /> : null}
      {showArea === "10" ? <Map10 pickMap={pickMap} /> : null}
      {showArea === "11" ? <Map11 pickMap={pickMap} /> : null}
      {showArea === "12" ? <Map12 pickMap={pickMap} /> : null}
      {showArea === "13" ? <Map13 pickMap={pickMap} /> : null}
      {showArea === "14" ? <Map14 pickMap={pickMap} /> : null}
      {showArea === "15" ? <Map15 pickMap={pickMap} /> : null}
      {showArea === "16" ? <Map16 pickMap={pickMap} /> : null}
      {showArea === "17" ? <Map17 pickMap={pickMap} /> : null}
    </MapContainer>
  );
}

export default MapIndex;
