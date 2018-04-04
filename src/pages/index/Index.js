/**
 * webpageTest API
 * 请求方式：http://www.webpagetest.org/runtest.php?url=目标网址&k=api_key
 */
import React, { PureComponent,Component } from 'react';
import { Radio,Icon,Modal } from 'antd';
import { connect } from 'react-redux';
import fetchData from '../../actions/fetchData'
import SnapViewComponent from './SnapViewComponent'
import './pages.less';


const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const API_KEY = 'AIzaSyDJO37Cx7EyABWOXVZWDBou-wau3dIsYCQ';
//const webpageTest_API = 'A.42f94b48a17054d80dd1c592a4e2d4d5';
const API_URL = 'https://www.googleapis.com/pagespeedonline/v4/runPagespeed?';
//const webpageTest_URL = 'https://www.webpagetest.org/runtest.php?';

const siteSource = [];

export default class Index extends PureComponent {

    state = {
        errorModalVisible: false,
        deviceType: 'desktop',      //设备类型
        language: 'zh',
        snapViewVisible: false,
        dataLoaded: false,
        colorIndex: 0,
        dataSource: {},         //返回数据
        targetSite: '',         //测评网址
        siteDescription: '',   //网站描述
        speedScore: '',    //优化程度得分
        speedRank: '',   //速度得分
        FCP: '',
        DCL: '',
        loadingExperience: {}
    };

    componentDidMount() {
        // if(siteSource.length >= 5){
        //     siteSource.pop();
        // }
        //this.props.fetchData('http://599167402df2f40011e4929a.mockapi.io/items');
    }

    onChange = (e) => {
        this.setState({
            deviceType: e.target.value
        })
    };
    handleLangChange = (value) => {
        console.log(value);
        this.setState({
            language: value
        })
    };
    clearState = () => {
        this.setState({
            //language :'',
            //targetSite: '',
            snapViewVisible: false
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
            this.clearState();
            this.setState({
                snapViewVisible: true
            });
            // localStorage.setItem('site',this.state.targetSite);
            // siteSource.push(localStorage.getItem('site'));
            const query = [
                'url=' + this.state.targetSite,
                'key=' + API_KEY,
                'strategy=' + this.state.deviceType,
                'locale=' + this.state.language,
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
                .then(data => {
                    if(data.error&&data.error.code === 400){
                        Modal.error({
                            title: '查询失败，请重新尝试',
                        });
                    }else
                        {
                            this.setState({
                                dataSource: data,
                                dataLoaded: true,
                                siteDescription: data&&data.title || '暂无描述',
                                speedScore: data&&data.ruleGroups&&data.ruleGroups.SPEED&&data.ruleGroups.SPEED.score || '0',
                                speedRank:  data&&data.loadingExperience&&data.loadingExperience.overall_category || '',
                                DCL: data&&data.loadingExperience&&data.loadingExperience.metrics&&data.loadingExperience.metrics.DOM_CONTENT_LOADED_EVENT_FIRED_MS&&data.loadingExperience.metrics.DOM_CONTENT_LOADED_EVENT_FIRED_MS.median || '',
                                FCP: data.loadingExperience&&data.loadingExperience.metrics&&data.loadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS&&data.loadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS.median || '',
                                loadingExperience: data.loadingExperience,
                        });
                    }

                })
                .catch(()=>{
                    Modal.error({
                        title: '查询失败，请重新尝试',
                    });
                })

        }

    };


    onChangeSite = (e) => {
        this.setState({
            targetSite: e.target.value
        });
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
                    handleLangChange={this.handleLangChange}
                    emitEmpty={this.emitEmpty}
                    siteDescription={this.state.siteDescription}
                    speedScore={this.state.speedScore}
                    speedRank={this.state.speedRank}
                    DCL={this.state.DCL}
                    FCP={this.state.FCP}
                    siteSource={siteSource}
                    loadingExperience = {this.state.loadingExperience}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        items: state.items,
        hasErrored: state.itemsHasErrored,
        isLoading: state.itemsIsLoading,
        title: state.title
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(itemsFetchData(url))
    };
};