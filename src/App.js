import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import './App.less';

/**
 * webpageTest API
 * 请求方式：http://www.webpagetest.org/runtest.php?url=目标网址&k=api_key
 */
const API_KEY = 'AIzaSyDJO37Cx7EyABWOXVZWDBou-wau3dIsYCQ';
const webpageTest_API = 'A.42f94b48a17054d80dd1c592a4e2d4d5';
const URL_TO_GET_RESULTS_FOR = 'http://www.4399.com';
const API_URL = 'https://www.googleapis.com/pagespeedonline/v4/runPagespeed?';
const webpageTest_URL = 'http://www.webpagetest.org/runtest.php?';
const query = [
  'url=' + URL_TO_GET_RESULTS_FOR,
  'key=' + API_KEY,
  'locale=zh',   //中文zh
].join('&');
const { Header, Sider, Content } = Layout;

const query2 = [
  'url=' + URL_TO_GET_RESULTS_FOR,
  'k=' + webpageTest_API,
].join('&');

class App extends Component {

  state = {
    collapsed: false,
  };


  componentDidMount() {
    //Google pageSpeed API
    fetch(webpageTest_URL+query2,{
      headers: {
          'Access-Control-Allow-Origin': '*',       
          'Content-type':'application/json',          
          'Accept':'application/json',
          'cache-control': 'max-age=604800'   //设置浏览器缓存7天
      }
    })
    // .then((response) => response.json())
    // .then(result => {
    //   console.log(result);
    // })

    //webpageTest API
    // fetch(webpageTest_URL+query2,{
    //   headers: {
    //     'Content-type':'application/json',
    //     'Accept':'application/json',
    //   }
    // })
    // .then((response) => response.json())
    // .then(result => {
    //   console.log(result)
    // })
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    return (
      <div className="App">
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
          className="sider"
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline">
            <Menu.Item key="1">
              <Icon type="pie-chart" />
              <span>1</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="pie-chart" />
              <span>2</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="pie-chart" />
              <span>3</span>
            </Menu.Item>
          </Menu>
        </Sider>
      </div>
    );
  }
}

export default App;
