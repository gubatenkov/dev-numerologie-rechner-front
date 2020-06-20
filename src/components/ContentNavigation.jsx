import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { MOBILE_RESOLUTION_THRESHOLD } from "../utils/Constants";
import { useTranslation } from "react-i18next";

const ContentSidebar = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: 40px;

  /* margins in layout*/
  margin-left: 90px;
  margin-right: 74px;

  /* mobile phones */
  @media (max-width: ${MOBILE_RESOLUTION_THRESHOLD}px) {
    /* hiding whole sidebar on phones */
    display: none;
  }
`;

const ContentTitel = styled.div`
  font-size: 32px;
  font-weight: 500;
  line-height: 40px;

  /* margin to item container at the bottom*/
  margin-bottom: 20px;
  font-family: ${props => props.theme.fontFamily};
  color: ${props => props.theme.darkGrey};
`;

const ContentItemContainer = styled.div`
  /* one column aligned top right */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  /* gap between items */
  > * + * {
    margin-top: 24px;
  }
`;

const ContentItem = styled.div`
  font-size: 16px;
  line-height: 26px;
  font-weight: 500;
  color: ${props =>
    props.active ? props.theme.darkGrey : props.theme.lighterGrey};
  font-family: ${props => props.theme.fontFamily};

  cursor: pointer;
`;

const ContentNavigation = props => {
  const [
    lastActiveContentSectionIndex,
    setLastActiveContentSectionIndex
  ] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    const checkIfSectionInViewPort = stepAnchor => {
      const domElement = document.getElementById(stepAnchor);

      if (domElement) {
        const elementBottomPosition = domElement.getBoundingClientRect().bottom;

        return elementBottomPosition < window.innerHeight;
      }
      return false;
    };

    const updateSectionHighlighting = () => {
      const sectionAnchors = props.contentItems.map(item => item.name);

      const lastAnchorIndexInView = sectionAnchors
        .reverse()
        .findIndex(anchor => checkIfSectionInViewPort(anchor));

      if (lastAnchorIndexInView > -1) {
        setLastActiveContentSectionIndex(
          sectionAnchors.length - 1 - lastAnchorIndexInView
        );
      }
    };

    if (props.autoAdapt) {
      window.addEventListener("scroll", updateSectionHighlighting, false);
      window.addEventListener("resize", updateSectionHighlighting, false);
    }

    updateSectionHighlighting();

    return () => {
      if (props.autoAdapt) {
        window.removeEventListener("scroll", updateSectionHighlighting, false);
        window.removeEventListener("resize", updateSectionHighlighting, false);
      }
    };
  }, [props.autoAdapt, props.contentItems]);

  // NOTE!! container div is needed for position sticky to work
  return (
    <div>
      <ContentSidebar>
        <ContentTitel>{t("CONTENT")}</ContentTitel>
        <ContentItemContainer>
          {props.contentItems.map((contentSection, index) => (
            <ContentItem
              key={contentSection.name}
              active={index === lastActiveContentSectionIndex}
              onClick={() => props.onItemClick(contentSection.name)}
            >
              {contentSection.name}
            </ContentItem>
          ))}
        </ContentItemContainer>
      </ContentSidebar>
    </div>
  );
};

ContentNavigation.propTypes = {
  contentItems: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      titles: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string,
          anchor: PropTypes.string
        })
      )
    })
  ).isRequired,
  onItemClick: PropTypes.func
};

export default ContentNavigation;
