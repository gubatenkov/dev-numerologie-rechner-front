import React from "react";
import { useHistory } from "react-router-dom";

import "./index.scss";

import placeholder from "../../images/userPlaceholder.svg";
import useHover from "../../utils/hooks/useHover";
import { useUser } from "../../contexts/UserContext";

const EmailWidget = ({ imgPath, email }) => {
  const User = useUser();
  const [ref, isHovered] = useHover();
  const history = useHistory();

  const menuItems = [
    { id: 1, text: "Analyses", handler: () => history.push("/userHome") },
    { id: 2, text: "Profile", handler: () => history.push("/userProfile") },
    { id: 3, text: "Logout", handler: () => User.logoutUser() }
  ];

  return (
    <div className="email-widget" ref={ref}>
      <div className="email-widget__logo">
        {imgPath ? (
          <img className="email-widget__img" src={imgPath} alt="user" />
        ) : (
          <img
            className="email-widget__placeholder"
            src={placeholder}
            alt="user"
          />
        )}
      </div>

      <p className="email-widget__text">{email}</p>
      <Menu items={menuItems} isActive={isHovered} />
    </div>
  );
};

const Menu = ({ items = [], isActive = false }) => {
  return (
    <div className={`email-widget__wrap ${isActive ? "opened" : ""}`}>
      <div className="email-widget__menu">
        <ul className="email-widget__list">
          {items.length ? (
            items.map(item => (
              // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
              <li
                className="email-widget__list-item"
                key={item.id}
                onClick={item.handler}
              >
                {item.text}
              </li>
            ))
          ) : (
            <li className="email-widget__list-item">No items</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default EmailWidget;
