import React, { Component } from 'react';

import '../styles/ResultTable.css';

const TYPE_ID_NUMBER = 'number';
const TYPE_ID_LIST = 'list';
const TYPE_ID_MATRIX = 'matrix';

/**
 * table capable of rendering calculation and number results
 * returned from the server
 */
class ResultTable extends Component {
	/**
     * default render method rendering content objects based on their type
     */
	render() {
		return (
			<table className="table table-striped">
				<tbody>
					{this.props.data.map(item => {
						// rendering content based on type
						let contentColumn;
						if (item.result.type === TYPE_ID_NUMBER) {
							contentColumn = item.result.value;
						} else if (item.result.type === TYPE_ID_LIST) {
							contentColumn = item.result.values.map(item => ' ' + item);
						} else if (item.result.type === TYPE_ID_MATRIX) {
							contentColumn = this.renderResultMatrix(item);
						}

						return (
							<tr key={item.id}>
								<td className="table--bold">{item.name}</td>
								<td>{item.id}</td>
								<td className="table--bold">{contentColumn}</td>
								<td className="text-right">{item.textShort}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		);
	}

	/**
     * renders a readable represetnation of the list result item type
     * @param {*} resultItem the received result item of type list
     */
	renderResultList(resultItem) {
		return resultItem.result.values.map(item => ' ' + item);
	}

	/**
     * renders a result matrix as content of the table
     * @param {} item the item of type 'matrix'
     */
	renderResultMatrix(resultItem) {
		// extracting dimensions
		const matrixDimensions = resultItem.result.dimensions;

		// rendering and returning matrix
		return (
			<table className="table table-bordered">
				<tbody>
					{[...Array(matrixDimensions.rows)].map((rowItem, rowIndex) => {
						return (
							<tr>
								{[...Array(matrixDimensions.cols)].map((colItem, colIndex) => {
									// determining current index composed of cols and rows
									const currentIndex = rowIndex * matrixDimensions.cols + colIndex;

									// checking if index is highlighted
									const highlighted = resultItem.result.highlighted.indexOf(currentIndex) > -1;
									console.log(highlighted);

									// returning cell for element
									return (
										<td className={highlighted ? 'ResultTable--highlighted' : ''}>
											{resultItem.result.values[currentIndex]}
										</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
		);
	}
}

export default ResultTable;
