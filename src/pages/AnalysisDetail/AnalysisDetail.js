import React, { PureComponent } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { connect } from 'react-redux';
import fetchData from '../../actions/fetchData'
import { Link } from 'react-router-dom'
import { checkPath } from '../../utils/utils'

import "./AnalysisDetail.less"
import PageLoadDistribution from "./PageLoadDistribution";
import ResourcesInfo from "./ResourcesInfo";

const { Header, Footer, Sider, Content } = Layout;


class AnalysisDetail extends PureComponent {

    render() {
        return(
            <div>
                <Layout>
                    <Sider
                        trigger={null}
                        collapsible
                        collapsed={true}
                        className="sider"
                    >
                        <div className="logo" />
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
                            <Menu.Item key="1">
                                <Link to="/AnalysisDetail/load">
                                    <Icon type="pie-chart" />
                                    <span>页面加载分布情况</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Link to="/AnalysisDetail/ResourcesInfo">
                                    <Icon type="api" />
                                    <span>页面资源加载情况</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Icon type="dot-chart" />
                                <span>优化建议</span>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <Icon type="codepen" />
                                <span>WebPageTest分析</span>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header>
                            <span className="headTitle">前端性能监测系统</span>
                        </Header>
                        <Content>
                            {/*{checkPath('/AnalysisDetail')?*/}
                                {/*<PageLoadDistribution*/}
                                    {/*loadingExperience={this.props.items.loadingExperience}*/}
                                {/*/>:null*/}
                            {/*}*/}
                            {checkPath('/ResourcesInfo')?
                                <ResourcesInfo />:null
                            }
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

