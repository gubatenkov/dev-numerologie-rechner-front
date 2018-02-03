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
	}

	/**
	 * handler method for clicks on steps
	 */
	handleStepClick = clickedStepName => {
		// searching for step
		const stepIndex = this.props.contentItems.indexOf(clickedStepName);

		// if found in steps -> setting new index
		if (stepIndex > -1) {
			this.setState({
				currentIndex: stepIndex
			});

			// scrolling to item if present
			const stepContentItem = document.getElementById(clickedStepName);
			if (stepContentItem) {
				stepContentItem.scrollIntoView();
			}
		}
	};

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
									onStepClick={this.handleStepClick}
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
