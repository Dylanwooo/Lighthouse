import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import {  BrowserRouter as Router, Route } from 'react-router-dom'
import './index.css';
import App from './App';
import AnalysisDetail from './pages/AnalysisDetail/AnalysisDetail';
import PageLoadDistribution from './pages/AnalysisDetail/PageLoadDistribution'
import registerServiceWorker from './registerServiceWorker';

const store = configureStore();

ReactDOM.render((
    <Provider store={store}>
        <Router>
            <div>
                <Route exact path="/" component={App} />
                <Route path="/AnalysisDetail" component={AnalysisDetail} />
                <Route path="/AnalysisDetail/load" component={PageLoadDistribution}/>
            </div>
        </Router>
    </Provider>
    ), document.getElementById('root')
);
registerServiceWorker();
