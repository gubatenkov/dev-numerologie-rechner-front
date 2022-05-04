import React from "react";

const Sector = ({
  top = "unset",
  bottom = "unset",
  left = "unset",
  right = "unset",
  rotation = "0"
}) => {
  return (
    <svg
      width="120"
      height="120"
      viewBox="0 2 200 200"
      style={{
        position: "absolute",
        top,
        bottom,
        left,
        right,
        transform: `rotate(${rotation}deg)`
      }}
    >
      <g stroke="#c4c4c4" strokeWidth="1">
        <path d="M 0 0 L 101 0 A 100 100 0 0 1 0 100" fill="#fff" />
      </g>
    </svg>
  );
};

export default Sector;
