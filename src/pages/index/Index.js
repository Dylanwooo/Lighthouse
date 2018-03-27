import React, { PureComponent } from 'react';
import { Radio,Icon } from 'antd';
import SnapViewComponent from './SnapViewComponent'
import './pages.less';

/**
 * webpageTest API
 * 请求方式：http://www.webpagetest.org/runtest.php?url=目标网址&k=api_key
 */
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;


const API_KEY = 'AIzaSyDJO37Cx7EyABWOXVZWDBou-wau3dIsYCQ';
const webpageTest_API = 'A.42f94b48a17054d80dd1c592a4e2d4d5';
const URL_TO_GET_RESULTS_FOR = 'http://www.4399.com';
const API_URL = 'https://www.googleapis.com/pagespeedonline/v4/runPagespeed?';
const webpageTest_URL = 'https://www.webpagetest.org/runtest.php?';


const query = [
  'url=' + URL_TO_GET_RESULTS_FOR,
  'key=' + API_KEY,
  'locale=zh',   //中文zh
].join('&');

const query2 = [
  'url=' + URL_TO_GET_RESULTS_FOR,
  'k=' + webpageTest_API,
].join('&');

export default class Index extends PureComponent {

    state = {
        deviceType: 'desktop',
        language: 'zh',
        snapViewVisible: false,
        dataLoaded: false,
        colorIndex: 0,
    };

    componentDidMount() {
        //Google pageSpeed API
        fetch(API_URL+query,{
          headers: {
              'Access-Control-Allow-Origin': '*',       
              'Content-type':'application/json',          
              'Accept':'application/json',
              'cache-control': 'max-age=604800'   //设置浏览器缓存7天
          }
        })
      }

    onChange = (e) => {
        this.setState({
            deviceType: e.target.value
        })
    };
    handleLangChange = (value) => {
        this.setState({
            language: value
        })
    };
    onEstimate = () => {
        this.setState({
            snapViewVisible: true
        })
    };
    onChangeDataLoaded = () => {
        this.setState({
            dataLoaded: true
        })
    };
      
    render() {

        return(
            <div>
                <div className="deviceTypeWrapper" >
                    <RadioGroup onChange={this.onChange} defaultValue="desktop">
                        <RadioButton value="desktop"><Icon type="laptop" style={{marginRight: 5}}/>PC端</RadioButton>
                        <RadioButton value="mobile"><Icon type="mobile" style={{marginRight: 5}} />移动端</RadioButton>
                    </RadioGroup>
                </div>
                <SnapViewComponent
                    colorIndex={this.state.colorIndex}
                    snapViewVisible={this.state.snapViewVisible}
                    dataLoaded={this.state.dataLoaded}
                    onEstimate={this.onEstimate}
                    onChangeDataLoaded={this.onChangeDataLoaded}
                />
            </div>
        )
    }
}