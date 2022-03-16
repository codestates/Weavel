import React from "react";
import { Path } from "./MapIndex.style";
import { MapSVG } from "./MapNumber.style";

function Map({ pickMap, lenderMap, weatherColor, showArea, pathData }) {
  return (
    <MapSVG width="800px" height="600px" viewBox={pathData.view}>
      {pathData.path.map((data, idx) => {
        return (
          <Path
            weatherColor={weatherColor}
            lenderMap={lenderMap[idx].isShow}
            id={idx}
            outline={pathData.outline || ""}
            onClick={(e) => pickMap(showArea, e)}
            d={data}
          />
        );
      })}
      {pathData.text.map((textData, idx) => {
        return (
          <text
            id={textData.id}
            onClick={(e) => pickMap(showArea, e)}
            x={textData.x}
            y={textData.y}
            fill="#B0AFAF"
            fontSize={pathData.font}
          >
            {textData.name}
          </text>
        );
      })}
    </MapSVG>
  );
}

export default Map;
