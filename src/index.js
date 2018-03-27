import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Link } from 'react-router'
import { BrowserRouter, Route } from 'react-router-dom'
import './index.css';
import App from './App';
import Index from './pages/AnalysisDetail/index'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
    <BrowserRouter>
        <Route path="/" component={App}>

        </Route>
    </BrowserRouter>), document.getElementById('root')
);
registerServiceWorker();
