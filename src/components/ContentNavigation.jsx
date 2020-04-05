import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

// importing threshold to switch to mobile optimized layout
import { MOBILE_RESOLUTION_THRESHOLD } from "../utils/Constants"

// container for navigation
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
`

// title of the sidebar
const ContentTitel = styled.div`
  font-size: 32px;
  font-weight: 500;
  line-height: 40px;

  /* margin to item container at the bottom*/
  margin-bottom: 20px;
  font-family: ${props => props.theme.fontFamily};
  color: ${props => props.theme.darkGrey};
`

// container for items
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
`

// an content item shown in the sidebar
const ContentItem = styled.div`
  font-size: 16px;
  line-height: 26px;
  font-weight: 500;
  color: ${props =>
    props.active ? props.theme.darkGrey : props.theme.lighterGrey};
  font-family: ${props => props.theme.fontFamily};

  cursor: pointer;
`

// component displaying table of contents and navigation at the left hand side
const ContentNavigation = props => {
  // keeping track of last section item current active
  const [
    lastActiveContentSectionIndex,
    setLastActiveContentSectionIndex
  ] = useState(0)

  // adding and removing listeners to adapt section highlighting
  useEffect(() => {
    /**
     * checks if specific bottom of anchor is currently in viewport
     * @returns true if the bottom of the anchor is currently visible in the viewport, false else
     */
    const checkIfSectionInViewPort = stepAnchor => {
      // getting item from DOM
      const domElement = document.getElementById(stepAnchor)

      // if item is presnet, checkinf if in viewport
      if (domElement) {
        // in viewport = bottom is visible
        const elementBottomPosition = domElement.getBoundingClientRect().bottom

        // calculating if in viewport
        return elementBottomPosition < window.innerHeight
      }
      // section is not in view
      return false
    }

    /**
     * checks for the last section currently visible and sets the state variable to reflect the index
     */
    const updateSectionHighlighting = () => {
      // assigning anchors
      const sectionAnchors = props.contentItems.map(item => item.name)

      // finding last shown anchor of anchors in viewport from back to front
      const lastAnchorIndexInView = sectionAnchors
        .reverse()
        .findIndex(anchor => checkIfSectionInViewPort(anchor))

      // if any anchor in view => updating index of last anchor in view
      if (lastAnchorIndexInView > -1) {
        // note: as used reverse before => we need to transform the index to: last index - found index
        setLastActiveContentSectionIndex(
          sectionAnchors.length - 1 - lastAnchorIndexInView
        )
      }
    }

    // if component is supposed to self adapt to visible content -> adding scroll listener
    if (props.autoAdapt) {
      window.addEventListener("scroll", updateSectionHighlighting, false)
      window.addEventListener("resize", updateSectionHighlighting, false)
    }

    // calling initially
    updateSectionHighlighting()

    // returning cleanup code
    return () => {
      // if component is supposed to self adapt to visible content -> adding scroll listener
      if (props.autoAdapt) {
        window.removeEventListener("scroll", updateSectionHighlighting, false)
        window.removeEventListener("resize", updateSectionHighlighting, false)
      }
    }
  }, [props.autoAdapt, props.contentItems])

  // returning list of sections with nested list of items
  // NOTE!! container div is needed for positio sticky to work
  return (
    <div>
      <ContentSidebar>
        <ContentTitel>Inhalt</ContentTitel>
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
  )
}

// adding proptypes
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
}

export default ContentNavigation
