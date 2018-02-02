import React, { Component } from 'react';

import '../styles/ResultTableRow.css';

// identifiers for row types
const ROW_TYPE_ID_CUSTOM = 'customRow';

// identifiers for results
const TYPE_ID_NUMBER = 'number';
const TYPE_ID_LIST = 'list';
const TYPE_ID_MATRIX = 'matrix';

/**
 * row rendering a single row item of an analysis result
 */
class ResultTableRow extends Component {
	render() {
		// getting item from passed props
		const item = this.props.item;

		// render custom or default row based on type
		if (item.type === ROW_TYPE_ID_CUSTOM) {
			return this.renderCustomRow(item);
		} else {
			return this.renderDefaultRow(item);
		}
	}

	/**
	 * renders the cells of a custom item
	 */
	renderCustomRow(rowItem) {
		// determining last element to right align
		const lastIndex = rowItem.values.length - 1;
		return (
			<tr key={rowItem.name} className={rowItem.highlighted ? 'tableRow--highlighted' : ''}>
				{rowItem.values.map((value, index) => {
					// defining style of cell
					let cellStyle = '';
					if (index === lastIndex) {
						cellStyle += 'text-right';
					}
					if (index === 0) {
						cellStyle += 'tableRow__name';
					}
					return <td className={cellStyle} key={value}>{value}</td>;
				})}
			</tr>
		);
	}

	/**
	 * renders a default cell
	 */
	renderDefaultRow(rowItem) {
		// rendering content based on number type
		let contentColumn;
		if (rowItem.result.type === TYPE_ID_NUMBER) {
			contentColumn = rowItem.result.value;
		} else if (rowItem.result.type === TYPE_ID_LIST) {
			contentColumn = this.renderResultList(rowItem);
		} else if (rowItem.result.type === TYPE_ID_MATRIX) {
			contentColumn = this.renderResultMatrix(rowItem);
		}

		return (
			<tr key={rowItem.id} className={rowItem.highlighted ? 'tableRow--highlighted' : ''}>
				<td className="table--bold tableRow__name">{rowItem.name}</td>
				<td>{rowItem.id}</td>
				<td className="table--bold">{contentColumn}</td>
				<td className="text-right">{rowItem.textShort}</td>
			</tr>
		);
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
							<tr key={resultItem.name + rowIndex}>
								{[...Array(matrixDimensions.cols)].map((colItem, colIndex) => {
									// determining current index composed of cols and rows
									const currentIndex = rowIndex * matrixDimensions.cols + colIndex;

									// checking if index is highlighted
									const highlighted = resultItem.result.highlighted.indexOf(currentIndex) > -1;

									// returning cell for element
									return (
										<td
											key={resultItem.name + currentIndex}
											className={highlighted ? 'ResultTable--highlighted' : ''}
										>
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

	/**
     * renders a readable represetnation of the list result item type
     * @param {*} resultItem the received result item of type list
     */
	renderResultList(resultItem) {
		return resultItem.result.values.map(item => ' ' + item);
	}
}

export default ResultTableRow;
