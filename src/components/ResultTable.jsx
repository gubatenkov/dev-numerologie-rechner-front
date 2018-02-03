import React, { Component } from 'react';

import ResultTableRow from './ResultTableRow';
import '../styles/ResultTable.css';

/**
 * table capable of rendering calculation and number results
 * returned from the server
 */
class ResultTable extends Component {
	/**
     * default render method rendering content objects based on their type
     */
	render() {
		return [
			<table className="table table-striped ResultTable--non-selectable ResultTable--non-printable">
				{this.props.data.headings && this.renderHeadings(this.props.data.headings)}
				<tbody>
					{this.props.data.numbers.map((item, index) => {
						// returning row with content for each item
						return <ResultTableRow key={index} item={item} />;
					})}
				</tbody>
			</table>,
			<h3 className="ResultTable--printWatermark">Die Resultate können nur mit Druckpaket ausgedruckt werden.</h3>
		];
	}

	/**
	 * renders the heading of the table
	 */
	renderHeadings() {
		return (
			<thead>
				<tr>
					{this.props.data.headings.map((heading, index) => {
						return <th key={index}>{heading}</th>;
					})}
				</tr>
			</thead>
		);
	}
}

export default ResultTable;
