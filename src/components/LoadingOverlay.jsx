import React from "react";
import styled from "styled-components";
import Spinner from "react-bootstrap/Spinner";
import { useLoadingOverlay } from "../contexts/LoadingOverlayContext";

const LoadingOverlayContainer = styled.div`
  padding-top: 10em;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ffffff;
  opacity: 1;
  z-index: 10000;
`;

const LoadingOverlayText = styled.h4`
  font-family: ${props => props.theme.fontFamily};
  font-size: 18px;
  margin-top: 20px;
  font-weight: 500;
`;

const LoadingOverlay = props => {
  const LoadingOverlay = useLoadingOverlay();

  return (
    LoadingOverlay.isShowing && (
      <LoadingOverlayContainer>
        <Spinner animation="border" role="status" variant="dark" />
        <LoadingOverlayText className="LoadingOverlay__text">
          {LoadingOverlay.text}
        </LoadingOverlayText>
      </LoadingOverlayContainer>
    )
  );
};

export default LoadingOverlay;
