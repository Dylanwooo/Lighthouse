/**
 * webpageTest API
 * 请求方式：http://www.webpagetest.org/runtest.php?url=目标网址&k=api_key
 */
import React, { PureComponent } from 'react';
import { Radio,Icon,Modal } from 'antd';
import SnapViewComponent from './SnapViewComponent'
import './pages.less';
import { map2ColorIndex } from '../../utils/utils'

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const API_KEY = 'AIzaSyDJO37Cx7EyABWOXVZWDBou-wau3dIsYCQ';
const webpageTest_API = 'A.42f94b48a17054d80dd1c592a4e2d4d5';
const URL_TO_GET_RESULTS_FOR = 'https://www.baidu.com';
const API_URL = 'https://www.googleapis.com/pagespeedonline/v4/runPagespeed?';
const webpageTest_URL = 'https://www.webpagetest.org/runtest.php?';

export default class Index extends PureComponent {

    state = {
        deviceType: 'desktop',
        language: 'zh',
        snapViewVisible: false,
        dataLoaded: false,
        colorIndex: 0,
        dataSource: {},
        targetSite: '',
        siteDescription: '',
        speedScore: '',
        speedRank: ''
    };

    componentDidMount() {

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
    //开始测评
    onEstimate = () => {
        if(this.state.targetSite === '') {
            Modal.warning({
                title: '测评网址不能为空！',
                okText: '确定'
            });
        } else {
            this.setState({
                snapViewVisible: true
            });
            const query = [
                'url=' + this.state.targetSite,
                'key=' + API_KEY,
                'strategy=' + this.state.deviceType,
                'locale=' + this.state.language,   //中文zh
            ].join('&');
            //Google pageSpeed API
            fetch(API_URL+query,{
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-type':'application/json',
                    'Accept':'application/json',
                    'cache-control': 'max-age=604800'   //设置浏览器缓存7天
                }
            })
                .then(res => res.json())
                .then(data => this.setState({
                    dataSource: data,
                    dataLoaded: true,
                    siteDescription: data.title,
                    speedScore: data.ruleGroups.SPEED.score,
                    speedRank:  data.loadingExperience.overall_category,
                }));
        }

    };

    onChangeDataLoaded = () => {
        this.setState({
            dataLoaded: true
        })
    };
    onChangeSite = (e) => {
        this.setState({
            targetSite: e.target.value
        });
        console.log(e.target.value)
    };
    //清空input框
    emitEmpty = () => {
        this.setState({ targetSite: '' });
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
                    targetSite={this.state.targetSite}
                    onChangeSite={this.onChangeSite}
                    emitEmpty={this.emitEmpty}
                    siteDescription={this.state.siteDescription}
                    speedScore={this.state.speedScore}
                    speedRank={this.state.speedRank}
                />
            </div>
        )
    }
}