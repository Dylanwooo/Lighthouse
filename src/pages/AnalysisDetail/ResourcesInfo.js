/**
 * Created by Dylanwoo on 2018/4/9.
 */

import React, { PureComponent } from 'react';
import { Card,Row,Col } from 'antd';
import './AnalysisDetail.less'

export default class ResourcesInfo extends PureComponent {

    state = {
        loadPage: '',
        domReady: '',
        redirect: '',
        lookupDomain: '',
        ttfb: '',
        request: '',
        loadEvent: '',
        appcache : '',
        unloadEvent: '',
        connect: ''
    };

    componentDidMount() {
        const iframe = this.refs.proxy;
        const t = iframe.contentWindow.performance.timing;
        this.setState({
            loadPage: t.loadEventEnd-t.navigationStart,
            domReady: t.domComplete - t.responseEnd,
            redirect: t.redirectEnd - t.redirectStart,
            lookupDomain: t.domainLookupEnd - t.domainLookupStart,
            ttfb: t.responseStart - t.navigationStart,
            request: t.responseEnd - t.requestStart,
            loadEvent: t.loadEventEnd - t.loadEventStart,
            appcache: t.domainLookupStart - t.fetchStart,
            unloadEvent: t.unloadEventEnd - t.unloadEventStart,
            connect: t.connectEnd - t.connectStart
        });
        console.log(t)
    }

    render() {
        return(
            <div>
                <iframe ref='proxy' src="http://localhost:3000/proxy" style={{display:'none'}}/>
                <div className="timingWrapper">
                    <Card style={{width:'100%'}} title="页面加载耗时">
                        <Row>
                            <Col span={6}>
                                <Card bordered={false}>
                                    <p className="indexTitle">页面加载完成时间</p>
                                    <p>{this.state.loadPage}</p>
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card bordered={false}>
                                    <p>页面加载完成时间</p>
                                    <p>0.564ms</p>
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card bordered={false}>
                                    <p>页面加载完成时间</p>
                                    <p>0.564ms</p>
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card bordered={false}>
                                    <p>页面加载完成时间</p>
                                    <p>0.564ms</p>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6}>
                                <Card bordered={false}>
                                    <p>页面加载完成时间</p>
                                    <p>0.564ms</p>
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card bordered={false}>
                                    <p>页面加载完成时间</p>
                                    <p>0.564ms</p>
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card bordered={false}>
                                    <p>页面加载完成时间</p>
                                    <p>0.564ms</p>
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card bordered={false}>
                                    <p>页面加载完成时间</p>
                                    <p>0.564ms</p>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6}>
                                <Card bordered={false}>
                                    <p>页面加载完成时间</p>
                                    <p>0.564ms</p>
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card bordered={false}>
                                    <p>页面加载完成时间</p>
                                    <p>0.564ms</p>
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card bordered={false}>
                                    <p>页面加载完成时间</p>
                                    <p>0.564ms</p>
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card bordered={false}>
                                    <p>页面加载完成时间</p>
                                    <p>0.564ms</p>
                                </Card>
                            </Col>
                        </Row>
                    </Card>
                </div>
            </div>
        )
    }
}