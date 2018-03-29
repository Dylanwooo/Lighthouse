import React, { PureComponent } from 'react';
import Index from './pages/index/Index'
import './App.less';

export default class App extends PureComponent {




  render() {
    return (
      <div className="App" >
          <div className="inputWrapper">
              <Index />
          </div>
      </div>
    );
  }
}
