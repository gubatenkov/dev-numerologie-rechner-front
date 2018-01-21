import React, { Component } from 'react';

import Panel from './Panel';
import Steps from './Steps';
import Step from './Step';

/**
 * the content navigation item to display the content of the result and help navigate
 * TODO: Replace with real fetch
 */
class ContentNaviation extends Component {
	constructor(props) {
		// calling super constructor
		super(props);

		// setting initial state
		// TODO fetch thispanel-title
		this.state = {
			steps: [
				'Ausdrucksebene',
				'Persönlichkeitsebene',
				'Entfaltungspotential',
				'Seelische Ebene',
				'Zeitliche Ebene'
			],
			currentIndex: 0
		};
	}

	/**
	 * handler method for clicks on steps
	 */
	handleStepClick = clickedStep => {
		// searching for step
		const stepIndex = this.state.steps.indexOf(clickedStep);

		// if found in steps -> setting new index
		if (stepIndex > -1) {
			this.setState({
				currentIndex: stepIndex
			});

			// scrolling to item if present
			const stepContentItem = document.getElementById(clickedStep);
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
			<Panel title="Inhalt">
				<Steps>
					{this.state.steps.map((item, index) => {
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
		);
	}
}

export default ContentNaviation;
