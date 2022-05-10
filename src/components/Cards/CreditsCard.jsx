import React from "react";

import "./index.scss";

const CreditsCard = ({ children, grey = false }) => {
  return (
    <div
      className={
        grey ? "creditscard__box creditscard__box--bgrey" : "creditscard__box"
      }
    >
      <div className="creditscard">
        <div className="creditscard__inner">{children}</div>
      </div>
    </div>
  );
};

CreditsCard.Title = ({ children = "Title" }) => (
  <h2 className="creditscard__title">{children}</h2>
);

CreditsCard.Divider = () => <hr className="creditscard__divider" />;

CreditsCard.Subtitle = ({ children }) => (
  <p className="creditscard__subtitle">{children}</p>
);

CreditsCard.PriceBlock = ({ price, numPages }) => (
  <div className="creditscard__price-wrap">
    <div className="creditscard__price">&euro;{price}</div>
    <div className="creditscard__note">from {numPages} pages</div>
  </div>
);

CreditsCard.ListHeading = ({ children }) => (
  <p className="creditscard__list-heading">{children}</p>
);

CreditsCard.List = ({ children }) => (
  <ul className="creditscard__list">{children}</ul>
);

CreditsCard.ListItem = ({ children }) => (
  <li className="creditscard__list-item">{children}</li>
);

export default CreditsCard;
