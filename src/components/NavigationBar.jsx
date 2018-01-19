import React, { Component } from 'react';

import NavigationDropdownMenu from './NavigationDropdownMenu';
import NavigationDropdownMenuItem from './NavigationDropdownMenuItem';

import '../styles/NavigationBar.css';
import logo from '../logo.png';

/**
 * the navigation bar for the application on top
 */
class NavigationBar extends Component {
	/**
     * renders the navbar with brand, user name as dropdown and avatar
     */
	render() {
		return (
			<nav className="navbar navbar-inverse">
				<div className="container-fluid">
					<div className="navbar__brand">
						Akademie Bios
					</div>
					<div className="collapse navbar-collapse navbar-collapse-toolbar">
						<ul className="nav navbar-toolbar navbar-right">
							<NavigationDropdownMenu name={'Christoph Hechenblaikner'}>
								<NavigationDropdownMenuItem>Paket ändern</NavigationDropdownMenuItem>
								<NavigationDropdownMenuItem>Abmelden</NavigationDropdownMenuItem>
							</NavigationDropdownMenu>
							<li>
								<a className="nav-link navbar-avatar">
									<span className="avatar">
										<img src={logo} alt="..." />
									</span>
								</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		);
	}
}

export default NavigationBar;
