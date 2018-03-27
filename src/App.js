import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import Background from './asserts/Lighthouse.jpg';
import Index from './pages/index/Index'
import './App.less';

const { Header, Footer, Sider, Content } = Layout;

// const sectionStyle = {
//   backgroundImage: `url(${Background})`,
//     width: "100%",
//     height: "100%",
// };

class App extends Component {

  state = {
    collapsed: false,
  };

  
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <div className="App" >
          <div className="inputWrapper">
              <Index />
          </div>
        {/*<Layout>*/}
          {/*<Sider*/}
              {/*trigger={null}*/}
              {/*collapsible*/}
              {/*collapsed={this.state.collapsed}*/}
              {/*className="sider"*/}
            {/*>*/}
              {/*<div className="logo" />*/}
              {/*<Menu theme="dark" mode="inline">*/}
                {/*<Menu.Item key="1">*/}
                  {/*<Icon type="pie-chart" />*/}
                  {/*<span>1</span>*/}
                {/*</Menu.Item>*/}
                {/*<Menu.Item key="2">*/}
                  {/*<Icon type="pie-chart" />*/}
                  {/*<span>2</span>*/}
                {/*</Menu.Item>*/}
                {/*<Menu.Item key="3">*/}
                  {/*<Icon type="pie-chart" />*/}
                  {/*<span>3</span>*/}
                {/*</Menu.Item>*/}
              {/*</Menu>*/}
            {/*</Sider>*/}
            {/*<Layout>*/}
              {/*<Header>*/}
              {/*<Icon*/}
                {/*className="trigger"*/}
                {/*type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}*/}
                {/*onClick={this.toggle}*/}
              {/*/>*/}
                {/**/}
              {/*</Header>*/}
              {/*<Content>*/}
                {/*<Index />*/}
              {/*</Content>*/}
              {/*<Footer>@Dylanwoo</Footer>*/}
            {/*</Layout>*/}
        {/*</Layout>        */}
      </div>
    );
  }
}

export default App;
