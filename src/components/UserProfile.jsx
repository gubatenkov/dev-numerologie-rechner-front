import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import NavigationBar from './NavigationBar';

class UserProfile extends Component {
  render() {
    return (
      <div>
        <div>
          <NavigationBar />
        </div>
        <div>
          <h2>Personal Information</h2>
          <h5>Aktueller Name</h5>
          <input type="text" name="firstName" />
          <input type="text" name="lastName" />
          <h5>Email</h5>
          <input type="text" name="email" disabled={true} />
          <button type="submit">Save</button>
        </div>
      </div>
    );
  }
}

export default withRouter(UserProfile);
