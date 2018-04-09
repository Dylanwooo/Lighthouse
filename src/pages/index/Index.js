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


class Index extends Component {

    state = {
        errorModalVisible: false,
        deviceType: 'desktop',      //设备类型
        language: 'zh',
        snapViewVisible: false,
        dataLoaded: false,
        targetSite: '',         //测评网址
    };


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

    onEstimate = (url) => {
        if(this.state.targetSite === '') {
            Modal.warning({
                title: '测评网址不能为空！',
                okText: '确定'
            });
        } else {
            this.clearState();
            this.setState({
                snapViewVisible:true,
                //dataLoaded: true
            });
            this.props.fetchData(url);
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
        const query = [
            'url=' + this.state.targetSite,
            'key=' + API_KEY,
            'strategy=' + this.state.deviceType,
            'locale=' + this.state.language,
        ].join('&');

        const { isLoading,hasErrored, items } = this.props;

        if(hasErrored) {
            Modal.error({
                title: '查询失败，请重新尝试',
            });
        }

        return(
            <div>
                <div className="deviceTypeWrapper" >
                    <RadioGroup onChange={this.onChange} defaultValue="desktop">
                        <RadioButton value="desktop"><Icon type="laptop" style={{marginRight: 5}}/>PC端</RadioButton>
                        <RadioButton value="mobile"><Icon type="mobile" style={{marginRight: 5}} />移动端</RadioButton>
                    </RadioGroup>
                </div>
                <SnapViewComponent
                    snapViewVisible={this.state.snapViewVisible}
                    dataLoaded={isLoading}
                    onEstimate={ ()=>{this.onEstimate(API_URL+query)} }
                    targetSite={this.state.targetSite}
                    onChangeSite={this.onChangeSite}
                    handleLangChange={this.handleLangChange}
                    emitEmpty={this.emitEmpty}
                    siteDescription={items.title || ''}
                    speedScore={items&&items.ruleGroups&&items.ruleGroups.SPEED&&items.ruleGroups.SPEED.score}
                    speedRank={items&&items.loadingExperience&&items.loadingExperience.overall_category}
                    DCL={items&&items.loadingExperience&&items.loadingExperience.metrics&&items.loadingExperience.metrics.DOM_CONTENT_LOADED_EVENT_FIRED_MS&&items.loadingExperience.metrics.DOM_CONTENT_LOADED_EVENT_FIRED_MS.median}
                    FCP={items.loadingExperience&&items.loadingExperience.metrics&&items.loadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS&&items.loadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS.median}
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(fetchData(url))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
