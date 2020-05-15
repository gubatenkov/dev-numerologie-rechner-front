import React from "react";
import styled from "styled-components";
import CloseButtonImage from "../images/Close.svg";

const CloseButtonStyled = styled.button`
  width: 36px;
  height: 36px;
  border: none;
  background-image: url(${CloseButtonImage});
  outline: none !important;
  background-color: transparent;
`;

export const CloseButton = props => {
  return <CloseButtonStyled {...props} />;
};
