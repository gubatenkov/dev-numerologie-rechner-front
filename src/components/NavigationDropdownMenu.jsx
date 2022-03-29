import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import "../styles/NavigationDropdownMenu.css";

import { ReactComponent as IconAdd } from "../images/icon_add.svg";
import styled from "styled-components";

// const CustomToggleFactory = child =>
//   React.forwardRef(({ children, onClick }, ref) => (
//     <div
//       ref={ref}
//       onClick={e => {
//         e.preventDefault();
//         onClick(e);
//       }}
//     >
//       {children}
//       {child}
//     </div>
//   ));

const Div = styled.div`
  position: relative;
`;

const Menu = styled.div`
  width: fit-content;
  padding: 5px;
  position: absolute;
  top: calc(100% + 5px);
  right: 0;
  background: #fff;
  border-radius: 4px;
  border: 1px solid lightgrey;
  z-index: 10;
`;

const NavigationDropdownMenu = ({ customToggle, children }) => {
  const openElRef = useRef(null);
  const [isOpen, setOpen] = useState(false);

  const handleClick = e => setOpen(true);

  useEffect(() => {
    // define DOM mouse click listener
    const listener = e => {
      const clickedEl = e.target;
      if (openElRef.current && !openElRef.current.contains(clickedEl)) {
        setOpen(false);
      }
    };
    // add listener on mount
    window.addEventListener("click", listener);
    // remove on unmount
    return () => window.removeEventListener("click", listener, false);
  }, []);

  return (
    <Div onClick={handleClick} ref={openElRef}>
      {customToggle}
      {isOpen && <Menu>{children}</Menu>}
    </Div>
  );
};

NavigationDropdownMenu.propTypes = {
  children: PropTypes.node,
  customToggle: PropTypes.node
};

NavigationDropdownMenu.defaultProps = {
  children: null,
  customToggle: <IconAdd />
};

export default NavigationDropdownMenu;
