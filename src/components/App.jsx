import React, { Component } from 'react';
import '../styles/App.css';

/* eslint-disable react/prefer-stateless-function */
class App extends Component {
  render() {
    return (
      <div className="col-md-4 col-md-offset-4">
        <div className="card">
          <div className="card-header">
            Akademie Bios Analyse
          </div>
          <div className="card-body">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">@</span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
