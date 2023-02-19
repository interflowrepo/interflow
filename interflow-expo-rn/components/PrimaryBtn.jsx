import * as React from "react";
import Svg, { G, Rect, Defs, LinearGradient, Stop } from "react-native-svg";
import { View } from "react-native";
import PrimaryBtnTxt from "./PrimaryBtnTxt";
/* SVGR has dropped some elements not supported by react-native-svg: filter */

const PrimaryBtn = (props) => (
  <View
    style={{
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
    onPointerDown={props.onPointerDown}
  >
    <Svg
      width={props.width}
      height={94}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G filter="url(#a)">
        <Rect
          x={0}
          y={5}
          width={props.width}
          height={76}
          rx={38}
          fill="url(#b)"
        />
      </G>
      <Defs>
        <LinearGradient
          id="b"
          x1={326}
          y1={81}
          x2={448}
          y2={-163}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#141516" />
          <Stop offset={0.872} stopColor="#B6B6B6" />
          <Stop offset={1} stopColor="#36393A" />
        </LinearGradient>
      </Defs>
    </Svg>
    <PrimaryBtnTxt label={props.label}/>
  </View>
);

export default PrimaryBtn;
