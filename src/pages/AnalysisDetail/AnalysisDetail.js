import React, { PureComponent } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { connect } from 'react-redux';
import fetchData from '../../actions/fetchData'
import { Link,Route } from 'react-router-dom'
import { checkPath } from '../../utils/utils'

import "./AnalysisDetail.less"
import PageLoadDistribution from "./PageLoadDistribution";
import ResourcesInfo from "./ResourcesInfo";
import Suggestion from './Suggestion';
import WebpageTest from './WebpageTest';


const { Header, Footer, Sider, Content } = Layout;

class AnalysisDetail extends PureComponent {

    state = {
        defaultkey: "1",
        iframe: null
    };

    //sider的选中状态
    componentWillMount() {

        if(checkPath('/load')){
            this.setState({ defaultkey: "1" })
        } else if(checkPath('/resourse')) {
            this.setState({ defaultkey: "2" })
        } else if(checkPath('/suggestion')) {
            this.setState({ defaultkey:"3" })
        }
        
    }

    componentDidMount() {
        console.log(this.refs.proxy);
        this.setState({ iframe: this.refs.proxy });
    }

    render() {
        return(
            <div>
                <iframe ref='proxy' src="http://localhost:3000/proxy" style={{display:'none'}} />
                <Layout>
                    <Sider
                        trigger={null}
                        collapsible
                        collapsed={true}
                        className="sider"
                    >
                        <div className="logo" />
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={[this.state.defaultkey]}>
                            <Menu.Item key="0">
                                <Link to="/">
                                    <Icon type="home" />
                                    <span>返回主页</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="1">
                                <Link to="/AnalysisDetail/load">
                                    <Icon type="pie-chart" />
                                    <span>页面加载分布情况</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Link to="/AnalysisDetail/resourse">
                                    <Icon type="api" />
                                    <span>页面资源加载情况</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Link to="/AnalysisDetail/suggestion">
                                    <Icon type="dot-chart" />
                                    <span>优化建议</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <Link to="/AnalysisDetail/webpagetest">
                                    <Icon type="codepen" />
                                    <span>WebPageTest分析</span>
                                </Link>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header>
                            <span className="headTitle">前端性能监测系统</span>
                        </Header>
                        <Content>
                            <Route path="/AnalysisDetail/load" render={()=><PageLoadDistribution  loadingExperience={this.props.items.loadingExperience}/>}/>
                            <Route path="/AnalysisDetail/resourse" render={()=><ResourcesInfo pageStats={this.props.items.pageStats} iframe={this.state.iframe} />} />
                            <Route path="/AnalysisDetail/suggestion" render={()=><Suggestion formattedResults={this.props.items.formattedResults}/>} />
                            <Route path="/AnalysisDetail/webpagetest" render={()=><WebpageTest/>} />
                        </Content>
                        <Footer>@Lighthouse</Footer>
                    </Layout>
                </Layout>
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

export default connect(mapStateToProps, mapDispatchToProps)(AnalysisDetail);

