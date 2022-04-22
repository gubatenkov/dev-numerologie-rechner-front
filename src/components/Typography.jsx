import React from "react";
import styled from "styled-components";

const Text = ({ children, as: Tag = "p", ...restProps }) => {
  return <Tag {...restProps}>{children}</Tag>;
};

const Typography = styled(Text)`
  margin: ${props => props.m | "0"};
  padding: ${props => props.p | "0"};
  font-size: ${props => props.fs || "18px"};
  font-family: "Inter", sans-serif;
  line-height: ${props => props.lh || "25.2px"};
  color: ${props => props.color || "inherit"};
  font-weight: ${props => props.fw || "400"};
  text-transform: ${props => {
    if (props.capitalize) {
      return "capitalize";
    } else if (props.upperCase) {
      return "uppercase";
    } else {
      return "none";
    }
  }};
  opacity: ${props => (props.opacity ? props.opacity : "1")};
`;

export default Typography;
