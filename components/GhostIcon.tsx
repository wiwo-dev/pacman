import { GhostStatus } from "@/pacman";
import React from "react";

type Props = {
  status: GhostStatus;
  size: number;
  animationStep: 1 | 2;
  color: string;
};

export default function GhostIcon({ status, animationStep, size, color }: Props) {
  switch (status) {
    case "EATEN":
      if (animationStep === 1) {
        return (
          <svg width={size} height={size} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12V10H23V12H25V18H23V20H19V18H17V12H19Z" fill="#E0DDFF" />
            <path d="M6 12V10H10V12H12V18H10V20H6V18H4V12H6Z" fill="#E0DDFF" />
            <path d="M21 18H25V14H21V18Z" fill="#2121FF" />
            <path d="M8 18H12V14H8V18Z" fill="#2121FF" />
          </svg>
        );
      } else {
        return (
          <svg width={size} height={size} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12V10H23V12H25V18H23V20H19V18H17V12H19Z" fill="#E0DDFF" />
            <path d="M6 12V10H10V12H12V18H10V20H6V18H4V12H6Z" fill="#E0DDFF" />
            <path d="M17 18H21V14H17V18Z" fill="#2121FF" />
            <path d="M4 18H8V14H4V18Z" fill="#2121FF" />
          </svg>
        );
      }
    case "ENERGIZER":
      return (
        <svg width={size} height={size} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M11 2V0H19V2H23V4H26V6H28V9V13H30V30H28V28H26V26H23V28H21V30H17V26H13V30H8V28H6V26H4V28H2V30H0V13H2V6H4V4H6V2H11Z"
            fill={animationStep === 1 ? "#E0DDFF" : "#2121FF"}
          />
          <path d="M9 13V9H13V13H9Z" fill={animationStep === 1 ? "#FF0000" : "#FFBEB5"} />
          <path d="M17 13V9H21V13H17Z" fill={animationStep === 1 ? "#FF0000" : "#FFBEB5"} />
          <path d="M3 21V19H5V21H3Z" fill={animationStep === 1 ? "#FF0000" : "#FFBEB5"} />
          <path d="M25 21V19H27V21H25Z" fill={animationStep === 1 ? "#FF0000" : "#FFBEB5"} />
          <path d="M5 19V17H9V19H5Z" fill={animationStep === 1 ? "#FF0000" : "#FFBEB5"} />
          <path d="M9 21V19H13V21H9Z" fill={animationStep === 1 ? "#FF0000" : "#FFBEB5"} />
          <path d="M13 19V17H17V19H13Z" fill={animationStep === 1 ? "#FF0000" : "#FFBEB5"} />
          <path d="M17 21V19H21V21H17Z" fill={animationStep === 1 ? "#FF0000" : "#FFBEB5"} />
          <path d="M21 19V17H25V19H21Z" fill={animationStep === 1 ? "#FF0000" : "#FFBEB5"} />
        </svg>
      );

    default: //alive
      if (animationStep === 1) {
        return (
          <svg
            width={size}
            height={size}
            viewBox="0 0 30 30"
            preserveAspectRatio="xMidYMid meet"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M11 2V0H19V2H23V4H26V6H28V9V13H30V30H28V28H26V26H23V28H21V30H17V26H13V30H8V28H6V26H4V28H2V30H0V13H2V6H4V4H6V2H11Z"
              fill={color}
            />
            <path d="M8 8H6V15H8V17H13V15H15V8H13V6H8V8Z" fill="#E0DDFF" />
            <path d="M21 8H19V15H21V17H26V15H28V8H26V6H21V8Z" fill="#E0DDFF" />
            <path d="M11 15V11H15V15H11Z" fill="#2121FF" />
            <path d="M24 15V11H28V15H24Z" fill="#2121FF" />
          </svg>
        );
      } else {
        return (
          <svg
            width={size}
            height={size}
            viewBox="0 0 30 30"
            preserveAspectRatio="xMidYMid meet"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M11 2V0H19V2H23V4H26V6H28V9V13H30V30H28V28H26V26H23V28H21V30H17V26H13V30H8V28H6V26H4V28H2V30H0V13H2V6H4V4H6V2H11Z"
              fill={color}
            />
            <path d="M4 8H2V15H4V17H9V15H11V8H9V6H4V8Z" fill="#E0DDFF" />
            <path d="M17 8H15V15H17V17H22V15H24V8H22V6H17V8Z" fill="#E0DDFF" />
            <path d="M2 15V11H6V15H2Z" fill="#2121FF" />
            <path d="M15 15V11H19V15H15Z" fill="#2121FF" />
          </svg>
        );
      }
  }
}
