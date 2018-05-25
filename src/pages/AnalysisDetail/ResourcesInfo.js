/**
 * Created by Dylanwoo on 2018/4/9.
 */

import React, { PureComponent } from 'react';
import { Card,Row,Col } from 'antd';
import { mapTime2MS,map2LoadType } from '../../utils/utils';
//import { Chart, Tooltip, Axis, Legend, Coord, Guide, Pie, registerShape, Series } from 'viser-react';
import './AnalysisDetail.less'

import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape } from 'bizcharts';


const DataSet = require('@antv/data-set');


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
    };

    componentDidMount() {

        const iframe = this.props.iframe;

        if(iframe&&!iframe.contentWindow.performance){
            console.log('不支持performance属性')
        }
        const t = iframe.contentWindow.performance.timing;
        const p = iframe.contentWindow.performance.navigation;

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
    }

    render() {

        //字节数
        const { DataView } = DataSet;
        const { Html } = Guide;
        const totalBytes = parseInt(this.props.pageStats.totalRequestBytes);
        const byteData = [
            { item: 'CSS', count: parseInt(this.props.pageStats.cssResponseBytes) },
            { item: '图片', count: parseInt(this.props.pageStats.imageResponseBytes) },
            { item: 'JS', count: parseInt(this.props.pageStats.javascriptResponseBytes) },
            { item: 'HTML', count: parseInt(this.props.pageStats.htmlResponseBytes) },
            { item: '其他资源', count: parseInt(this.props.pageStats.otherResponseBytes)|| 0 }
        ];
        const dv = new DataView();
        dv.source(byteData).transform({
            type: 'percent',
            field: 'count',
            dimension: 'item',
            as: 'percent'
        });
        const cols = {
            percent: {
                formatter: val => {
                    val = (val * 100).toFixed(2) + '%';
                    return val;
                }
            }
        };

        return(
            <div>
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
                    <Card>
                        <Row>
                            <Col span={10}>
                                <p className="gridTitle">加载字节统计</p>
                                <Chart height={480}  data={dv} scale={cols} forceFit>
                                    <Coord type={'theta'} radius={0.75} innerRadius={0.6} />
                                    <Axis name="percent" />
                                    <Legend position='top' />
                                    <Tooltip
                                        showTitle={false}
                                        itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
                                    />
                                    <Guide >
                                        <Html position ={[ '50%', '50%' ]} html='<div style="color:#8c8c8c;font-size:1em;text-align: center;width: 10em;">总字节数<br><span style="color:#262626;font-size:1.16em">23505</span><br>bytes</div>' alignX='middle' alignY='middle'/>
                                    </Guide>
                                    <Geom
                                        type="intervalStack"
                                        position="percent"
                                        color='item'
                                        tooltip={['item*percent',(item, percent) => {
                                            percent = percent * 100 + '%';
                                            return {
                                                name: item,
                                                value: percent
                                            };
                                        }]}
                                        style={{lineWidth: 1,stroke: '#fff'}}
                                    >
                                        <Label content='percent' formatter={(val, item) => {
                                            return item.point.item + ': ' + val;}} />
                                    </Geom>
                                </Chart>
                            </Col>
                            <Col span={2}>

                            </Col>
                            <Col span={12}>
                                <p className="gridTitle">加载资源数量统计</p>
                            </Col>

                        </Row>

                    </Card>
                </div>
            </div>
        )
    }
}
