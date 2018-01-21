import React, { Component } from 'react';

import TitleBar from './TitleBar';
import NavigationBar from './NavigationBar';
import ContentNavigation from './ContentNavigation';
import Panel from './Panel';

import '../styles/AnalysisResultPersonal.css';

import calculateExpressionLevel from '../utils/NumerologyCalculations';

/**
 * result screen for personal analysis
 */
class AnalysisResultPersonal extends Component {
	constructor(props) {
		super(props);

		// faking call to server
		this.state = { results: calculateExpressionLevel(null, null, null) };
	}
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
				<div className="ResultContentOverview">
					<ContentNavigation />
				</div>
				<div className="ResultContent">
					<Panel>
						<h5>Result Content</h5>
						{this.state.results.map(item => {
							return <h6 key={item.id}>{item.name} ({item.id}) = {item.value}</h6>;
						})}
					</Panel>
				</div>

			</div>
		);
	}
}

export default AnalysisResultPersonal;
