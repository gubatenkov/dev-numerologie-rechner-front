import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import '../styles/LightBoxDetailView.css';

import Panel from './Panel';
import Steps from './Steps';
import Step from './Step';

/**
 * lightbox style view to display texts and make
 * them navigateable
 */
class LightBoxDetailView extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
      sectionName: PropTypes.string.isRequired,
      sectionElements: PropTypes.arrayOf(PropTypes.shape({
        elementTitle: PropTypes.string.isRequired,
        elementContent: PropTypes.string.isRequired,
      })),
    })).isRequired,
    compareData: PropTypes.arrayOf(PropTypes.shape({
      sectionName: PropTypes.string.isRequired,
      sectionElements: PropTypes.arrayOf(PropTypes.shape({
        elementTitle: PropTypes.string.isRequired,
        elementContent: PropTypes.string.isRequired,
      })),
    })),
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    sectionIndex: PropTypes.number,
    elementIndex: PropTypes.number,
  };

  static defaultProps = {
    sectionIndex: 0,
    elementIndex: 0,
  };

  /**
   * default constructor
   */
  constructor(props) {
    super(props);

    // initializing state based on props passed from server
    this.state = {
      currentSectionIndex: props.sectionIndex,
      currentElementIndex: props.elementIndex,
    };
  }

  /**
  * lifecycle method that updates internal state on prop update
  * @param nextProps the updated prop
  * @param {*} prevState the previous state of the component
  * @returns an object to pass to setState
  */
  getDerivedStateFromProps(nextProps, prevState) {
    // if props have been changed (index of section and element), updating state
    if (
      prevState.currentSectionIndex !== nextProps.sectionIndex
      || prevState.currentElementIndex !== nextProps.elementIndex
    ) {
      // returning object to update state
      return {
        currentSectionIndex: nextProps.sectionIndex,
        currentElementIndex: nextProps.elementIndex,
      };
    }

    return null;
  }

  /**
   * default lifecycle method that makes sure component
   * parameters are set upon display/hide
   */
  componentDidUpdate() {
    // updating body class of the site to prevent scrolling
    document.body.classList.toggle('noScroll', this.props.isOpen);

    // if modal is shown, getting forcus so key inputs work
    if (this.self && this.props.isOpen) {
      this.self.focus();
    }
  }

  /**
   * handles next click in the tour component
   */
  handleNextClick = () => {
    if (
      this.state.currentElementIndex <
      this.props.data[this.state.currentSectionIndex].sectionElements.length - 1
    ) {
      this.setState({
        currentElementIndex: this.state.currentElementIndex + 1,
      });
    } else if (this.state.currentSectionIndex < this.props.data.length - 1) {
      this.setState({
        currentSectionIndex: this.state.currentSectionIndex + 1,
        currentElementIndex: 0,
      });
    }
  };

  /**
   * handles back click in the tour component
   */
  handleBackClick = () => {
    if (this.state.currentElementIndex > 0) {
      this.setState({
        currentElementIndex: this.state.currentElementIndex - 1,
      });
    } else if (this.state.currentSectionIndex > 0) {
      this.setState({
        currentSectionIndex: this.state.currentSectionIndex - 1,
        currentElementIndex:
          this.props.data[this.state.currentSectionIndex - 1].sectionElements
            .length - 1,
      });
    }
  };

  /**
   * handles clicks on steps
   * @param sectionTitleClicked: the title of the step clicked
   */
  handleStepClick = (sectionTitleClicked) => {
    // getting index of section title clicked and setting it's index as current section index
    const index = this.props.data.findIndex(item => item.sectionName === sectionTitleClicked);
    if (index > -1) {
      this.setState({
        currentSectionIndex: index,
        currentElementIndex: 0,
      });
    }
  };

  /**
   * handle method for key strokes
   * @param event the key down event
   */
  handleKeyDown = (event) => {
    switch (event.key) {
      // determining which key was pressed
      case 'ArrowRight':
        this.handleNextClick();
        return;
      case 'ArrowLeft':
        this.handleBackClick();
        break;
      case 'Escape':
        this.props.onClose();
        break;
      default:
    }
  };

  /**
   * default render
   */
  render() {
    console.log('Lightbox Render');
    console.log(this.state);
    // if detail view not open -> not showing it
    if (this.props.isOpen === false) {
      return null;
    }

    // getting current element
    const currentElement = this.props.data[this.state.currentSectionIndex]
      .sectionElements[this.state.currentElementIndex];

    // getting current compare element if persent
    let currentCompareElement;
    if (this.props.compareData) {
      currentCompareElement = this.props.compareData[
        this.state.currentSectionIndex
      ].sectionElements[this.state.currentElementIndex];
    }

    // if for some reason, the current element is invalid > rendering nothing
    if (!currentElement || (this.props.compareData && !currentCompareElement)) {
      return null;
    }

    return (
      <div
        className="LightBoxDetailView__Container modal-backdrop"
        onKeyDown={this.handleKeyDown}
        role="link"
        tabIndex="0"
        ref={(root) => {
          this.self = root;
        }}
      >
        <div className="LightBoxDetailView__ContentOverview">
          <Steps horizontal>
            {this.props.data.map((item, index) => {
              // getting length of current section (only elements that have content)
              const currentSectionLength = item.sectionElements.length;

              // determining index to display for step
              let stepElementIndex = 0;
              if (index === this.state.currentSectionIndex) {
                stepElementIndex = this.state.currentElementIndex;
              } else if (index < this.state.currentSectionIndex) {
                stepElementIndex = currentSectionLength - 1;
              }

              // determining the name of the item to display
              // if if is the current section, an indication for
              // the element position in the current section is given
              let stepName = item.sectionName;
              if (index === this.state.currentSectionIndex) {
                stepName += ` (${stepElementIndex +
                  1}/${currentSectionLength})`;
              }

              return (
                <Step
                  key={item.sectionName}
                  name={stepName}
                  current={index === this.state.currentSectionIndex}
                  done={index < this.state.currentSectionIndex}
                  onStepClick={this.handleStepClick}
                  horizontal
                />
              );
            })}
          </Steps>
        </div>
        <div className="LightBoxDetailView__Content">
          <div className="LightBoxDetailView__ButtonArea">
            <button
              className="LightBoxDetailView__NavigationButton"
              onClick={this.handleBackClick}
            >
              <i className="icon wb-chevron-left" />
            </button>
          </div>
          <div className={this.props.compareData ? '' : ''}>
            <Panel
              className="LightBoxDetailView__Panel"
              title={currentElement.elementTitle}
            >
              <div
                className="LightBoxDetailView__text LightBoxDetailView--non-printable"
                dangerouslySetInnerHTML={{
                  __html: currentElement.elementContent,
                }}
              />
              <h3 className="LightBoxDetailView--printWatermark">
                Die Resultate können nur mit Druckpaket ausgedruckt werden.
              </h3>
            </Panel>
          </div>
          {this.props.compareData && (
            <div className="">
              <Panel
                className="LightBoxDetailView__Panel"
                title={currentCompareElement.elementTitle}
              >
                <div
                  className="LightBoxDetailView__text LightBoxDetailView--non-printable"
                  dangerouslySetInnerHTML={{
                    __html: _.isEqual(currentCompareElement, currentElement)
                      ? 'Gleich wie links.'
                      : currentCompareElement.elementContent,
                  }}
                />
                <h3 className="LightBoxDetailView--printWatermark">
                  Die Resultate können nur mit Druckpaket ausgedruckt werden.
                </h3>
              </Panel>
            </div>
          )}
          <div className="LightBoxDetailView__ButtonArea">
            <button
              className="LightBoxDetailView__NavigationButton"
              onClick={this.handleNextClick}
            >
              <i className="icon wb-chevron-right" />
            </button>
          </div>
        </div>
        <div className="LightBoxDetailView__BottomActions">
          <button className="btn btn-default" onClick={this.props.onClose}>
            Schließen
          </button>
        </div>
      </div>
    );
  }
}

export default LightBoxDetailView;
