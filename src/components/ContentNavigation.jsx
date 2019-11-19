import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import '../styles/ContentNavigation.css';
import Panel from './Panel';

const ContentNavigation = (props) => {
  // keeping track of last section item current active
  const [
    lastActiveContentSectionIndex,
    setLastActiveContentSectionIndex,
  ] = useState(0);

  // adding and removing listeners to adapt section highlighting
  useEffect(() => {
    /**
     * checks if specific bottom of anchor is currently in viewport
     * @returns true if the bottom of the anchor is currently visible in the viewport, false else
     */
    const checkIfSectionInViewPort = (stepAnchor) => {
      // getting item from DOM
      const domElement = document.getElementById(stepAnchor);

      // if item is presnet, checkinf if in viewport
      if (domElement) {
        // in viewport = bottom is visible
        const elementBottomPosition = domElement.getBoundingClientRect().bottom;

        // calculating if in viewport
        return elementBottomPosition < window.innerHeight;
      }
      // section is not in view
      return false;
    };

    /**
     * checks for the last section currently visible and sets the state variable to reflect the index
     */
    const updateSectionHighlighting = () => {
      // assigning anchors
      const sectionAnchors = props.contentItems.map((item) => item.name);

      // finding last shown anchor of anchors in viewport from back to front
      const lastAnchorIndexInView = sectionAnchors
        .reverse()
        .findIndex((anchor) => checkIfSectionInViewPort(anchor));

      // if any anchor in view => updating index of last anchor in view
      if (lastAnchorIndexInView > -1) {
        // note: as used reverse before => we need to transform the index to: last index - found index
        setLastActiveContentSectionIndex(
          sectionAnchors.length - 1 - lastAnchorIndexInView,
        );
      }
    };

    // if component is supposed to self adapt to visible content -> adding scroll listener
    if (props.autoAdapt) {
      window.addEventListener('scroll', updateSectionHighlighting, false);
      window.addEventListener('resize', updateSectionHighlighting, false);
    }

    // calling initially
    updateSectionHighlighting();

    // returning cleanup code
    return () => {
      // if component is supposed to self adapt to visible content -> adding scroll listener
      if (props.autoAdapt) {
        window.removeEventListener('scroll', updateSectionHighlighting, false);
        window.removeEventListener('resize', updateSectionHighlighting, false);
      }
    };
  }, [props.autoAdapt, props.contentItems]);

  // returning list of sections with nested list of items
  return (
    <div className="ContentNavigation">
      <Panel title="Inhalt">
        <ul>
          {props.contentItems.map((contentSection, index) => (
            <li key={contentSection.name}>
              <div
                className={
                  index === lastActiveContentSectionIndex
                    ? 'ContentNavigation--activeSection'
                    : ''
                }
              >
                {contentSection.name}
              </div>
              {contentSection.titles.length > 0 && (
                <ul>
                  {contentSection.titles.map((title) => (
                    <li key={title.title}>
                      <button onClick={() => props.onItemClick(title.anchor)}>
                        {title.title}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
};

// adding proptypes
ContentNavigation.propTypes = {
  contentItems: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      titles: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string,
          anchor: PropTypes.string,
        }),
      ),
    }),
  ).isRequired,
  onItemClick: PropTypes.func,
};

export default ContentNavigation;
