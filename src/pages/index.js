import React, { Component, PureComponent } from 'react';
import { Radio,Card,Input,Select,Button } from 'antd';
import { language } from '../asserts/language'
import './pages.less';
/**
 * webpageTest API
 * 请求方式：http://www.webpagetest.org/runtest.php?url=目标网址&k=api_key
 */
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Option = Select.Option;

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
        console.log(`radio checked:${e.target.value}`);
    }
    handleChange = (value) => {
        console.log(`selected ${value}`);
    }
      
    render() {
        return(
            <div>
                <div className="deviceTypeWrapper" >
                    <RadioGroup onChange={this.onChange} defaultValue="a">
                        <RadioButton value="a">PC端</RadioButton>
                        <RadioButton value="b">移动端</RadioButton>
                    </RadioGroup>
                </div>
                <div className="contentWrapper">
                    <Card>
                        <div className="itemWrapper">
                            <span>测评网址：</span>
                            <Input />
                        </div>
                        <div className="itemWrapper">
                            <span>选择语言：</span>
                            <Select defaultValue="简体中文" onChange={this.handleChange}>
                                {language.map(val => {
                                     <Option value={val.key} key={val.key}>{val.name}</Option>                               
                                })}
                            </Select>
                        </div>
                        <div className="snapViewWrapper">
                            我是结果概略
                        </div>
                        <div className="btnWrapper">
                            <Button>开始测评</Button>
                            <Button>结果详情</Button>
                        </div>
                    </Card>
                </div>
            </div>
        )
    }
}