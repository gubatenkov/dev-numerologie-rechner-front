import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../styles/NavigationTitleBar.css';

class NavigationTitleBar extends Component {
	render() {
		return (
			<div className="barContainer">
				<Link to={this.props.backRoute}>
					<button className="btn btn-default btn-block">Zurück </button>
				</Link>
				<h1 className="page-title">{this.props.title}</h1>
				<Link to="/dummy">
					<button className="btn btn-success btn-block">Weiter</button>
				</Link>
			</div>
		);
	}
}

export default NavigationTitleBar;
