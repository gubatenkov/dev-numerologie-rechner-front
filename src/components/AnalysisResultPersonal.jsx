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
				<div className="ContentArea">
					<div className="ResultContentOverview">
						<ContentNavigation />
					</div>
					<div className="ResultContent">
						<Panel title="Ausdrucksebene">

							<table className="table">
								<tbody>
									{this.state.results.map(item => {
										return (
											<tr key={item.id}>
												<td>{item.name}</td>
												<td>{item.id}</td>
												<td>{item.value}</td>
												<td>{item.description}</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</Panel>
						<Panel title="Persönlichkeitsebene">
							{this.state.results.map(item => {
								return <h6 key={item.id}>{item.name} ({item.id}) = {item.value}</h6>;
							})}
						</Panel>
						<Panel title="Entfaltungspotential">
							{this.state.results.map(item => {
								return <h6 key={item.id}>{item.name} ({item.id}) = {item.value}</h6>;
							})}
						</Panel>
						<Panel title="Seelische Ebene">
							{this.state.results.map(item => {
								return <h6 key={item.id}>{item.name} ({item.id}) = {item.value}</h6>;
							})}
						</Panel>
						<Panel title="Zeitliche Ebene">
							{this.state.results.map(item => {
								return <h6 key={item.id}>{item.name} ({item.id}) = {item.value}</h6>;
							})}
						</Panel>
					</div>
				</div>
			</div>
		);
	}
}

export default AnalysisResultPersonal;
