import React from 'react';
import ReactDOM from 'react-dom';
import AnalysisInput from './components/AnalysisInput';
import registerServiceWorker from './utils/registerServiceWorker';

import './styles/theme.css';
import './styles/bootstrap-extend.css';
import './styles/bootstrap.css';
import './styles/brand-icons/brand-icons.min.css';
import './styles/web-icons/web-icons.min.css';
import './styles/font-awesome/font-awesome.min.css';

ReactDOM.render(<AnalysisInput />, document.getElementById('root'));
registerServiceWorker();
