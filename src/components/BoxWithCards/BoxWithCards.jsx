import React from "react";

import "./index.scss";

import CreditsCard from "../Cards/CreditsCard";

const BoxWithCards = () => {
  return (
    <div className="creditscards-wrap">
      <CreditsCard>
        <CreditsCard.Title>Short version</CreditsCard.Title>
        <CreditsCard.Divider />
        <CreditsCard.Subtitle>
          Activate all the text of the <strong>standard</strong> version of your
          current calculation numeroscope for online reading.
        </CreditsCard.Subtitle>
        <CreditsCard.PriceBlock price={29} numPages={45} />
        <a
          className="creditscard__btn blue-btn"
          as="a"
          href="https://www.bios-shop.eu"
          target="_blank"
          rel="noopener noreferrer"
        >
          Buy
        </a>
        <CreditsCard.ListHeading>Content</CreditsCard.ListHeading>
        <CreditsCard.List>
          <CreditsCard.ListItem>
            Your life number with other sections: family theme family of origin,
            phases of life, and thought patterns and behavioral strategies
          </CreditsCard.ListItem>
          <CreditsCard.ListItem>Your root account</CreditsCard.ListItem>
          <CreditsCard.ListItem>
            At the soul level: the number of intensity and the number of
            initiation
          </CreditsCard.ListItem>
          <CreditsCard.ListItem>
            Aspects of personality: birth date grid (with present, missing and
            isolated numbers) and soul matrix with karmic lessons and soul
            balance number.
          </CreditsCard.ListItem>
          <CreditsCard.ListItem>
            All the trials of your life path: that is, all the vibrational
            cycles, challenges, and highlights, as well as a preview of the next
            year's personal year
          </CreditsCard.ListItem>
        </CreditsCard.List>
        <CreditsCard.ListHeading>Functions</CreditsCard.ListHeading>
        <CreditsCard.List>
          <CreditsCard.ListItem>
            Compare a person's different names (birth name, good name, etc.) to
            each other.
          </CreditsCard.ListItem>
        </CreditsCard.List>
      </CreditsCard>

      <CreditsCard grey>
        <CreditsCard.Title>Long version</CreditsCard.Title>
        <CreditsCard.Divider />
        <CreditsCard.Subtitle>
          Activate all the text of the <strong>extended</strong> version of your
          current calculation numeroscope for online reading.
        </CreditsCard.Subtitle>
        <CreditsCard.PriceBlock price={59} numPages={90} />
        <a
          className="creditscard__btn blue-btn"
          as="a"
          href="https://www.bios-shop.eu"
          target="_blank"
          rel="noopener noreferrer"
        >
          Buy
        </a>
        <CreditsCard.ListHeading>Content</CreditsCard.ListHeading>
        <CreditsCard.List>
          <CreditsCard.ListItem>
            Your life number with other sections: family theme family of origin,
            phases of life, and thought patterns and behavioral strategies
          </CreditsCard.ListItem>
          <CreditsCard.ListItem>Your root account</CreditsCard.ListItem>
          <CreditsCard.ListItem>
            At the soul level: the number of intensity and the number of
            initiation
          </CreditsCard.ListItem>
          <CreditsCard.ListItem>
            Aspects of personality: birth date grid (with present, missing and
            isolated numbers) and soul matrix with karmic lessons and soul
            balance number.
          </CreditsCard.ListItem>
          <CreditsCard.ListItem>
            All the trials of your life path: that is, all the vibrational
            cycles, challenges, and highlights, as well as a preview of the next
            year's personal year
          </CreditsCard.ListItem>
        </CreditsCard.List>
        <CreditsCard.ListHeading>Functions</CreditsCard.ListHeading>
        <CreditsCard.List>
          <CreditsCard.ListItem>
            Compare a person's different names (birth name, good name, etc.) to
            each other.
          </CreditsCard.ListItem>
        </CreditsCard.List>
      </CreditsCard>
    </div>
  );
};

export default BoxWithCards;
