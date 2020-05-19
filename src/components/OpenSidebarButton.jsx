import React from "react";
import Menu from "../images/Menu.svg";
import styled from "styled-components";
import { useSidebar } from "../contexts/SidebarContext";

import { MOBILE_RESOLUTION_THRESHOLD } from "../utils/Constants";

const Button = styled.button`
  outline: none !important;
  border: none;
  width: 36px;
  height: 36px;
  background-image: url(${Menu});
  background-repeat: no-repeat;
  background-position: center;
  background-color: transparent;
  position: absolute;
  top: 32px;
  left: 60px;

  @media (max-width: ${MOBILE_RESOLUTION_THRESHOLD}px) {
    top: 32px;
    left: 32px;
  }
`;

export const OpenSidebarButton = props => {
  const Sidebar = useSidebar();
  return (
    <Button
      onClick={() => {
        Sidebar.setIsVisible(true);
      }}
    />
  );
};
