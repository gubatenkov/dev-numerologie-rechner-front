import React, { Component } from 'react';

import TitleBar from './TitleBar';
import NavigationBar from './NavigationBar';
import ContentNavigation from './ContentNavigation';
import Panel from './Panel';
import ResultTable from './ResultTable';

import '../styles/AnalysisResultPersonal.css';

import {
	calculateExpressionLevel,
	calculatePersonalLevel,
	calculateDevelopmentLevel,
	calculateSoulLevelNumbers,
	calculateTimeLevelNumbers
} from '../utils/NumerologyCalculations';

/**
 * result screen for personal analysis
 */
class AnalysisResultPersonal extends Component {
	constructor(props) {
		super(props);

		// faking call to server
		// TODO get firstname, lastName and date of birth from input
		const firstName = 'Christoph';
		const lastName = 'Hechenblaikner';
		const dateOfBirth = '18.04.1989';

		// setting initial state based on calculations
		this.state = {
			expressionLevel: calculateExpressionLevel(firstName, lastName, dateOfBirth),
			personalityLevel: calculatePersonalLevel(firstName, lastName, dateOfBirth),
			developmentLevel: calculateDevelopmentLevel(firstName, lastName, dateOfBirth),
			soulLevel: calculateSoulLevelNumbers(firstName, lastName, dateOfBirth),
			timeLevel: calculateTimeLevelNumbers(firstName, lastName, dateOfBirth)
		};
	}

	/**
	 * handles the navigation to a specific item
	 */
	navigateToElementHandler = (name, anchor) => {
		// scrolling to item if present in DOM
		const stepContentItem = document.getElementById(anchor);
		if (stepContentItem) {
			stepContentItem.scrollIntoView();
		}
	};

	/**
     * default render
     */
	render() {
		// render table, table shows spinner
		return (
			<div>
				<NavigationBar />
				<TitleBar
					title="Übersicht der Zahlen"
					backTitle="Zurück"
					backRoute="/analysisInput"
					primaryActionTitle="Speichern"
					badgeTitle="Kurztext"
					secondaryActionTitle="Drucken"
				/>
				<div className="ContentArea">
					<div className="ResultContentOverview">
						<ContentNavigation
							contentItems={[
								'Ausdrucksebene',
								'Persönlichkeitsebene',
								'Entfaltungspotential',
								'Seelische Ebene',
								'Zeitliche Ebene'
							]}
							contentItemAnchors={[
								'ExpressionResult',
								'PersonalityResult',
								'DevelopmentResult',
								'SoulResult',
								'TimeResult'
							]}
							onItemClick={this.navigateToElementHandler}
							autoAdapt={true}
						/>
					</div>
					<div className="ResultContent">
						<Panel title="Ausdrucksebene" id="ExpressionResult">
							<ResultTable data={this.state.expressionLevel} />
						</Panel>
						<Panel title="Persönlichkeitsebene" id="PersonalityResult">
							<ResultTable data={this.state.personalityLevel} />
						</Panel>
						<Panel title="Entfaltungspotential" id="DevelopmentResult">
							<ResultTable data={this.state.developmentLevel} />
						</Panel>
						<Panel title="Seelische Ebene" id="SoulResult">
							<ResultTable data={this.state.soulLevel} />
						</Panel>
						<Panel title="Zeitliche Ebene" id="TimeResult">
							<ResultTable data={this.state.timeLevel[0]} />
							<ResultTable data={this.state.timeLevel[1]} />
						</Panel>
					</div>
				</div>
			</div>
		);
	}
}

export default AnalysisResultPersonal;
