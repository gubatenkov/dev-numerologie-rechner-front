import React, { Component } from 'react';

import '../styles/ContentNavigation.css';
import Stickyfill from 'stickyfilljs';

import Panel from './Panel';
import Steps from './Steps';
import Step from './Step';

/**
 * the content navigation item to display the content of the result and help navigate
 */
class ContentNaviation extends Component {
	constructor(props) {
		// calling super constructor
		super(props);
		// setting initial state
		// TODO fetch thispanel-title
		this.state = {
			currentIndex: 0
		};
	}

	/**
	 * default react lifecylce
	 */
	componentDidMount() {
		// adding polyfill for browsers not yet supporting position: sticky
		// https://github.com/wilddeer/stickyfill
		Stickyfill.add(this.self);

		// if component is supposed to self adapt to visible content -> adding scroll listener
		if (this.props.autoAdapt) {
			window.addEventListener('scroll', this.checkContentVisibility, false);
			window.addEventListener('resize', this.checkContentVisibility, false);
		}
	}

	/**
	 * default react lifecylce
	 */
	componentWillUnmount() {
		// if component is supposed to self adapt to visible content -> adding scroll listener
		if (this.props.autoAdapt) {
			window.removeEventListener('scroll', this.checkContentVisibility, false);
			window.removeEventListener('resize', this.checkContentVisibility, false);
		}
	}

	/**
	 * handler method for clicks on steps
	 */
	handleStepChange = clickedStepName => {
		// searching for step
		const stepIndex = this.props.contentItems.indexOf(clickedStepName);

		// if found in steps -> setting new index
		if (stepIndex > -1) {
			this.setState({
				currentIndex: stepIndex
			});
		}

		// if handler is present, invoking now
		if (this.props.onItemClick) {
			this.props.onItemClick(clickedStepName, this.props.contentItemAnchors[stepIndex]);
		}
	};

	/**
	 * 
	 */
	checkContentVisibility = () => {
		// assigning anchors
		const anchors = this.props.contentItemAnchors;

		// finding last index of anchor in viewport
		let lastIndex = -1;
		for (let index = anchors.length - 1; index >= 0; index--) {
			if (this.checkStepInViewport(anchors[index])) {
				lastIndex = index;
				break;
			}
		}

		// if index is found -> updating current step
		if (lastIndex > -1) {
			this.setState({
				currentIndex: lastIndex
			});
		}

		// calling delegate methods
		if (this.props.onItemChange) {
			this.props.onItemChange(this.props.contentItems[lastIndex], this.props.contentItems[lastIndex]);
		}
	};

	/**
	 * checks if specific bottom of anchor is currently in viewport
	 * @returns true if the bottom of the anchor is currently visible in the viewport
	 */
	checkStepInViewport(stepAnchor) {
		// getting item from DOM
		const stepContentItem = document.getElementById(stepAnchor);

		// if item is presnet, checkinf if in viewport
		if (stepContentItem) {
			// in viewport = bottom is visible
			const itemBottomPosition = stepContentItem.getBoundingClientRect().bottom;

			// calculating if in viewport
			return itemBottomPosition < window.innerHeight;
		} else {
			return false;
		}
	}

	/**
	 * default render that renders all steps with their proper attributes
	 */
	render() {
		return (
			<div className="ContentNavigation" ref={element => this.self = element}>
				<Panel title="Inhalt">
					<Steps>
						{this.props.contentItems.map((item, index) => {
							return (
								<Step
									name={item}
									current={this.state.currentIndex === index}
									done={index < this.state.currentIndex}
									onStepClick={this.handleStepChange}
									key={index}
								/>
							);
						})}
					</Steps>
				</Panel>
			</div>
		);
	}
}

export default ContentNaviation;
