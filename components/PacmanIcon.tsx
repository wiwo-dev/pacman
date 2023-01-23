import React from "react";

type Props = {
  state: number;
  size: number;
};

export default function PacmanIcon({ state, size }: Props) {
  if (state === 0) {
    return (
      <svg width={size} height={size} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M20.5 0H9.5V2H5V5H3V9H0.5V21H3V26H5V28H10V30H20V28H25V26H27V21H29V9H27V5H25V2H20.5V0Z"
          fill="#FFFF00"
        />
      </svg>
    );
  }

  if (state === 1 || state === 3) {
    return (
      <svg width={size} height={size} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.5 0H20.5V2H25V5H27V9H25V12H18V14H11V17H18V19H25V21H27V26H25V28H20V30H10V28H5V26H3V21H0.5V9H3V5H5V2H9.5V0Z"
          fill="#FFFF00"></path>
      </svg>
    );
  }

  if (state === 2) {
    return (
      <svg width={size} height={size} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.5 0H20.5V2H22V5H19V7H17V9H15V11H13V13V14H10V17H13V19H15V21H17V23H19V26H22V28H20V30H10V28H5V26H3V21H0.5V9H3V5H5V2H9.5V0Z"
          fill="#FFFF00"
        />
      </svg>
    );
  }

  return <div></div>;
}
