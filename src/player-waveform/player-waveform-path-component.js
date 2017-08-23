import React from "react";
import { ClipPath, G, Polygon } from "react-native-svg";

const serializer = ({ width, height, points }) =>
  points.reduce((memo, [x, y]) => `${memo} ${x * width},${y * height}`, "");

function WaveformPath(props) {
  return (
    <ClipPath id={props.id}>
      <G x="0">
        <Polygon
          x="0"
          y="0"
          width={props.width}
          height={props.height}
          points={`${serializer(props)} ${props.width},${props.height} 0,${props.height}`}
        />
      </G>
    </ClipPath>
  );
}

export default WaveformPath;
