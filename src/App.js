import React, { Component } from 'react';
import { Button } from 'antd';
import './App.css';

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

// const query2 = [
//   'url=' + URL_TO_GET_RESULTS_FOR,
//   'key=' + webpageTest_API,
// ]
class App extends Component {

  state = {
    image: null
  }
  componentDidMount() {
    //Google pageSpeed API
    fetch(API_URL+query,{
      headers: {
          'Content-type':'application/json',
          'Accept':'application/json',
          'cache-control': 'max-age=604800'   //设置浏览器缓存7天
      }
    })
    .then((response) => response.json())
    .then(result => {
      console.log(result);
    })

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


  render() {
    return (
      <div className="App">
        <Button>hi</Button>
      </div>
    );
  }
}

export default App;
