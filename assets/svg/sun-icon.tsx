import * as React from "react";
import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";
const SunIcon = (props: any) => (
  <Svg
    width={props?.size || 20}
    height={props?.size || 20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G clipPath="url(#clip0_302_1963)">
      <Path
        d="M9.99996 13.3334C11.8409 13.3334 13.3333 11.841 13.3333 10.0001C13.3333 8.15913 11.8409 6.66675 9.99996 6.66675C8.15901 6.66675 6.66663 8.15913 6.66663 10.0001C6.66663 11.841 8.15901 13.3334 9.99996 13.3334Z"
        stroke={props?.color || "#FFD6DD"}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5.25 14.75L4.66667 15.3333M2.5 10H3.33333H2.5ZM10 2.5V3.33333V2.5ZM16.6667 10H17.5H16.6667ZM10 16.6667V17.5V16.6667ZM4.66667 4.66667L5.25 5.25L4.66667 4.66667ZM15.3333 4.66667L14.75 5.25L15.3333 4.66667ZM14.75 14.75L15.3333 15.3333L14.75 14.75Z"
        stroke={props?.color || "#FFD6DD"}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_302_1963">
        <Rect width={20} height={20} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SunIcon;
