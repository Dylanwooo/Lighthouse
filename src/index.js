import React from 'react';
import ReactDOM from 'react-dom';
import {  BrowserRouter as Router, Route } from 'react-router-dom'
import './index.css';
import App from './App';
import Index from './pages/AnalysisDetail/AnalysisDetail';
import PageLoadDistribution from './pages/AnalysisDetail/PageLoadDistribution'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
    <Router>
        <div>
            <Route exact path="/" component={App} />
            <Route path="/index" component={Index} />
            {/*<Route path="/index/load" component={PageLoadDistribution}/>*/}
        </div>
    </Router>
    ), document.getElementById('root')
);
registerServiceWorker();
