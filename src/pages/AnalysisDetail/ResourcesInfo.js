/**
 * Created by Dylanwoo on 2018/4/9.
 */

import React, { PureComponent } from 'react';
import { Card,Row,Col } from 'antd';
import { mapTime2MS,map2LoadType } from '../../utils/utils'
import echarts from 'echarts';
import  'echarts/lib/chart/bar';
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
        connect: '',
        redirectCount: '',
        loadType: '',
        pageStats: {}
    };

    componentWillMount() {
        const pageStats = this.props.pageStats;
        if(pageStats){
            this.setState({
                pageStats: pageStats
            })
        }
    }

    componentDidMount() {
        const iframe = this.refs.proxy;
        const setState = (t,p) =>{ this.setTimingState(t,p) };
        const ref = this.refs.bytesPie;
        window.onload = function () {
            const t = iframe.contentWindow.performance.timing;
            const p = iframe.contentWindow.performance.navigation;
            setState(t,p);

            let myPieChart = echarts.init(ref);
            myPieChart.setOption = {
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
                },
                series : [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius : '55%',
                        center: ['50%', '60%'],
                        data:[
                            {value:335, name:'直接访问'},
                            {value:310, name:'邮件营销'},
                            {value:234, name:'联盟广告'},
                            {value:135, name:'视频广告'},
                            {value:1548, name:'搜索引擎'}
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
        };
    }

    setTimingState = (t,p) => {
        this.setState({
            loadPage: mapTime2MS(t.loadEventEnd-t.navigationStart),
            domReady: mapTime2MS(t.domComplete - t.responseEnd),
            redirect: mapTime2MS(t.redirectEnd - t.redirectStart),
            lookupDomain: mapTime2MS(t.domainLookupEnd - t.domainLookupStart),
            ttfb: t.responseStart - t.navigationStart,
            request: mapTime2MS(t.responseEnd - t.requestStart),
            loadEvent: mapTime2MS(t.loadEventEnd - t.loadEventStart),
            appcache: mapTime2MS(t.domainLookupStart - t.fetchStart),
            unloadEvent: mapTime2MS(t.unloadEventEnd - t.unloadEventStart),
            connect: mapTime2MS(t.connectEnd - t.connectStart),
            redirectCount: p.redirectCount,
            loadType: map2LoadType(p.type)
        });
    };

    render() {
        return(
            <div>
                <iframe ref='proxy' src="http://localhost:3000/proxy" style={{display:'none'}}/>
                <div className="timingWrapper">
                    <Card style={{width:'100%'}} title="页面加载耗时">
                        <Row>
                            <Col span={6}>
                                <Card bordered={false}>
                                    <p className="indexTitle">平均页面加载完成时间</p>
                                    <p>{this.state.loadPage}<span className='unit'>s</span></p>
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card bordered={false}>
                                    <p className="indexTitle">平均DOM树构建时间</p>
                                    <p>{this.state.domReady}<span className='unit'>s</span></p>
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card bordered={false}>
                                    <p className="indexTitle">平均重定向时间</p>
                                    <p>{this.state.redirect}<span className='unit'>s</span></p>
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card bordered={false}>
                                    <p className="indexTitle">平均DNS查询时间</p>
                                    <p>{this.state.lookupDomain}<span className='unit'>s</span></p>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6}>
                                <Card bordered={false}>
                                    <p className="indexTitle">平均白屏时间</p>
                                    <p>{this.state.ttfb}<span className='unit'>ms</span></p>
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card bordered={false}>
                                    <p className="indexTitle">平均request时间</p>
                                    <p>{this.state.request}<span className='unit'>s</span></p>
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card bordered={false}>
                                    <p className="indexTitle">平均onload回调时间</p>
                                    <p>{this.state.loadEvent}<span className='unit'>s</span></p>
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card bordered={false}>
                                    <p className="indexTitle">平均缓存时间</p>
                                    <p>{this.state.appcache}<span className='unit'>s</span></p>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6}>
                                <Card bordered={false}>
                                    <p className="indexTitle">平均卸载页面时间</p>
                                    <p>{this.state.unloadEvent}<span className='unit'>s</span></p>
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card bordered={false}>
                                    <p className="indexTitle">平均TCP握手建立时间</p>
                                    <p>{this.state.connect}<span className='unit'>s</span></p>
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card bordered={false}>
                                    <p className="indexTitle">重定向次数</p>
                                    <p>{this.state.redirectCount}<span className='unit'>次</span></p>
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card bordered={false}>
                                    <p className="indexTitle">页面加载方式</p>
                                    <p className="loadType">{this.state.loadType}</p>
                                </Card>
                            </Col>
                        </Row>
                    </Card>
                </div>
                <div className="pageStatsWrapper">
                    <Card style={{width:'100%'}}>
                        <Card.Grid style={{width:'30%',paddingTop:10}}>
                            <p className="gridTitle">加载字节统计</p>
                            <Row>
                                <Col span={8}>
                                    <p>请求字节数：</p>
                                    <p>42562 Bytes</p>
                                </Col>
                                <Col span={16}>
                                    <div ref="bytesPie" style={{width:300,height:200}}/>
                                </Col>
                            </Row>
                        </Card.Grid>
                    </Card>
                </div>
            </div>
        )
    }
}