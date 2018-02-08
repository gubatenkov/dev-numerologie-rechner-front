import React, { Component } from 'react';

import '../styles/LightBoxDetailView.css';

import Panel from './Panel';
import Steps from './Steps';
import Step from './Step';

/**
 * lightbox style view to display texts and make
 * them navigateable
 */
class LightBoxDetailView extends Component {
  constructor(props) {
    super(props);

    /**
     * setting data elements
     */
    this.state = {
      currentSectionIndex: 0,
      currentElementIndex: 0,
      dataElements: [
        {
          section: 'Ausdrucksebene',
          contentElements: [
            {
              title: 'Ausdruckszahl (AZ) = 6',
              content: 'Lorem Ipsum...',
            },
            {
              title: 'Blazahl (BZ) = 5',
              content: 'Lorem Ipsum...',
            },
          ],
        },
        {
          section: 'Persönlichkeitsebene',
          contentElements: [
            {
              title: 'Ausdruckszahl (AZ) = 6',
              content: 'Lorem Ipsum...',
            },
            {
              title: 'Blazahl (BZ) = 5',
              content: 'Lorem Ipsum...',
            },
          ],
        },
      ],
    };
  }

  /**
   * default render
   */
  render() {
    // getting current element
    const currentElement = this.state.dataElements[
      this.state.currentSectionIndex
    ].contentElements[this.state.currentElementIndex];

    return (
      <div className="LightBoxDetailView__Container modal-backdrop">
        <div className="LightBoxDetailView__ContentOverview">
          <Steps>
            {this.state.dataElements.map(item => <Step name={item.section} />)}
          </Steps>
        </div>
        <div className="LightBoxDetailView__Content">
          <div className="LightBoxDetailView__ButtonArea">
            <button className="LightBoxDetailView__NavigationButton">
              <i className="icon wb-chevron-left" />
            </button>
          </div>
          <div className="col-10">
            <Panel title={currentElement.title}>{currentElement.content}</Panel>
          </div>
          <div className="LightBoxDetailView__ButtonArea">
            <button className="LightBoxDetailView__NavigationButton">
              <i className="icon wb-chevron-right" />
            </button>
          </div>
        </div>
        <div className="LightBoxDetailView__BottomActions">
          <button className="btn btn-default"> Schließen </button>
        </div>
      </div>
    );
  }
}

export default LightBoxDetailView;
