import React from "react";
import Menu from "../images/Menu.svg";
import styled from "styled-components";
import { useSidebar } from "../contexts/SidebarContext";

const Button = styled.button`
  outline: none !important;
  width: 36px;
  height: 36px;
  border-radius: 6px;
  background-image: url(${Menu});
  background-repeat: no-repeat;
  background-position: center;
  border-width: 1px;
  border-color: #01b2d4;
  position: absolute;
  top: 32px;
  left: 60px;
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
