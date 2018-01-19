import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import NavigationTitleBar from './NavigationTitleBar';
import NavigationBar from './NavigationBar';

import calculateExpressionLevel from '../utils/NumerologyCalculations';

/**
 * result screen for personal analysis
 */
class AnalysisResultPersonal extends Component {
	constructor(props) {
		super(props);

		// faking call to server
		this.results = calculateExpressionLevel(null, null, null);
	}
	/**
     * default render
     */
	render() {
		// render table, table shows spinner
		return (
			<div>
				<NavigationBar />
				<NavigationTitleBar title="Ergebnis" backRoute="/analysisInput" />
				{this.results.map(item => {
					return <h5 key={item.id}>{item.name} ({item.id}) = {item.value}</h5>;
				})}
			</div>
		);
	}
}

export default AnalysisResultPersonal;
