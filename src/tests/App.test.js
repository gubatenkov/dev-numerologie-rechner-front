import React from 'react';
import ReactDOM from 'react-dom';
import AnalysisInput from '../components/AnalysisInput';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AnalysisInput />, div);
});
