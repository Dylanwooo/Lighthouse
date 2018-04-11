import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import {  BrowserRouter as Router, Route } from 'react-router-dom'
import './index.css';
import App from './App';
import AnalysisDetail from './pages/AnalysisDetail/AnalysisDetail';
import Proxy from './pages/Proxy'
import PageLoadDistribution from './pages/AnalysisDetail/PageLoadDistribution';
import ResourcesInfo from './pages/AnalysisDetail/ResourcesInfo'

import registerServiceWorker from './registerServiceWorker';

const store = configureStore();

ReactDOM.render((
    <Provider store={store}>
        <Router>
            <div>
                <Route exact path="/" component={App} />
                <Route path="/proxy" component={Proxy} />
                <Route path="/AnalysisDetail" component={AnalysisDetail} />
                <Route path="/AnalysisDetail/load" component={PageLoadDistribution}/>
                <Route path="/AnalysisDetail/resourse" component={ResourcesInfo}/>
            </div>
        </Router>
    </Provider>
    ), document.getElementById('root')
);
registerServiceWorker();
