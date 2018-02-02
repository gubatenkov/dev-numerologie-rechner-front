import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Panel from './Panel';
import InputField from './InputField';

import logo from '../logo.png';
import '../styles/AnalysisInput.css';

/* eslint-disable react/prefer-stateless-function */
class AnalysisInput extends Component {
	/**
	 * default constructor
	 */
	constructor(props) {
		// calling super class constructor
		super(props);

		// setting values for members
		this.firstNames = null;
		this.lastNames = null;
		this.dateOfBirth = null;
	}

	render() {
		return (
			<div className="page-register-v3 layout-full">
				<div className="page vertical-align">
					<div className="page-content">
						<div className="text-center">
							<img className="brand-img logo" height="150" src={logo} alt="logo" />
						</div>
						<div className="row justify-content-md-center">
							<div className="col-lg-6">
								<Panel title="Akademie Bios Analyse">
									<InputField
										icon="wb-user"
										fieldName="Vorname(n)"
										onChange={this.handleFirstNamesValueChanged}
									/>
									<InputField
										icon="wb-user"
										fieldName="Nachname"
										onChange={this.handleLastNameValueChanged}
									/>
									<InputField
										icon="wb-calendar"
										fieldName="Geburtsdatum"
										onChange={this.handleDateOfBirthChange}
									/>
									<Link to="/resultPersonal">
										<button className="btn btn-primary btn-block" onClick={this.startAnalysis}>
											Starten
										</button>
									</Link>
								</Panel>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	/**
	 * handles changes to the first name field
	 */
	handleFirstNamesValueChanged = event => {
		// storing change
		this.firstNames = event.target.value;
	};

	/**
	 * handles changes to the last name field
	 */
	handleLastNameValueChanged = event => {
		this.lastNames = event.target.value;
	};

	/**
	 * handes changes of the date of birth
	 */
	handleDateOfBirthChange = event => {
		this.dateOfBirth = event.target.value;
	};

	/**
	 * starts the analysis upon button click
	 */
	startAnalysis = () => {
		// console.log(`Start anallysis with ${this.firstNames}, ${this.lastNames}, ${this.dateOfBirth}`);
	};
}

export default AnalysisInput;
