/**
 * Created by Dylanwoo on 2018/4/9.
 */

import React, { PureComponent } from 'react';
import { Card,Row,Col } from 'antd';
import { mapTime2MS,map2LoadType } from '../../utils/utils';
import { Chart, Tooltip, Axis, Legend, Coord, Guide, Pie, registerShape, Series } from 'viser-react';
import './AnalysisDetail.less'

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
        const sourceData = [
            { item: 'CSS', count: parseInt(this.props.pageStats.cssResponseBytes) },
            { item: '图片', count: parseInt(this.props.pageStats.imageResponseBytes) },
            { item: 'JS', count: parseInt(this.props.pageStats.javascriptResponseBytes) },
            { item: 'HTML', count: parseInt(this.props.pageStats.htmlResponseBytes) },
            { item: '其他资源', count: parseInt(this.props.pageStats.otherResponseBytes)|| 0 }
        ];

        const scale = [{
            dataKey: 'percent',
            min: 0,
            formatter: '.0%',
        }];

        const dv = new DataSet.View().source(sourceData);
        dv.transform({
            type: 'percent',
            field: 'count',
            dimension: 'item',
            as: 'percent'
        });
        const data = dv.rows;


        registerShape('point', 'image', {
            drawShape: function(cfg: any, container: any) {
                cfg.points = this.parsePoints(cfg.points);
                const coord = this._coord;
                container.addShape('line', {
                    attrs: {
                        x1: cfg.points[0].x,
                        y1: cfg.points[0].y,
                        x2: cfg.points[0].x,
                        y2: coord.start.y,
                        stroke: '#ccc',
                        lineWidth: 1,
                        lineDash: [4, 2]
                    }
                });
                return container.addShape('image', {
                    attrs: {
                        x: cfg.points[0].x - (12 * cfg.size / 2),
                        y: cfg.points[0].y - 12 * cfg.size,
                        width: 12 * cfg.size,
                        height: 12 * cfg.size,
                        img: cfg.shape[1]
                    }
                });
            }
        });

        //资源数目
        const data2 = [
            {name: '资源总数', value: this.props.pageStats.numberResources},
            {name: 'JS', value: this.props.pageStats.numberJsResources},
            {name: 'CSS', value: this.props.pageStats.numberCssResources},
            {name: '静态资源', value: this.props.pageStats.staticResources|| 0},
        ];

        const imageMap = {
            'Opera': 'https://gw.alipayobjects.com/zos/rmsportal/vXiGOWCGZNKuVVpVYQAw.png',
            'Internet Explorer': 'https://gw.alipayobjects.com/zos/rmsportal/eOYRaLPOmkieVvjyjTzM.png',
            'Chrome': 'https://gw.alipayobjects.com/zos/rmsportal/dWJWRLWfpOEbwCyxmZwu.png',
            'Firefox': 'https://gw.alipayobjects.com/zos/rmsportal/ZEPeDluKmAoTioCABBTc.png',
        };

        const scale2 = [{
            dataKey: 'value',
            nice: false,
            max: 120,
            min: 0
        }];

        const seriesOpts = {
            gemo: 'point',
            position: 'name*value',
            size: 'value',
            color: 'name',
            shape: ['name', function(name){
                return ['image', imageMap[name]];
            }],
            label: ['value', {
                offset: -20,
                textStyle: {
                    fontSize:16, // 文本大小
                }
            }]
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
                            <Col span={12}>
                                <p className="gridTitle">加载字节统计</p>
                                <Chart forceFit height={400} data={data} scale={scale}>
                                    <Tooltip showTitle={false} />
                                    <Axis />
                                    <Legend dataKey="item" />
                                    <Coord type="theta" radius={0.75} innerRadius={0.6} />
                                    <Pie position="percent" color="item" style={{ stroke: '#fff', lineWidth: 1 }}
                                         label={['percent', {
                                             formatter: (val, item) => {
                                                 return item.point.item + ': ' + val;
                                             }
                                         }]}
                                    />
                                </Chart>
                            </Col>
                            <Col span={12}>
                                <p className="gridTitle">加载资源数量统计</p>
                                <Chart forceFit height={400} data={data2} scale={scale2}>
                                    <Tooltip />
                                    <Axis dataKey="value" show={false} />
                                    <Series {...seriesOpts} />
                                </Chart>
                            </Col>

                        </Row>

                        {/*<Card.Grid>*/}
                            {/*<p className="gridTitle">加载资源数量统计</p>*/}
                            {/*<div ref="numBar" style={{width:200,height:200}} />*/}
                        {/*</Card.Grid>*/}
                        {/*<Card.Grid>*/}
                            {/*<p className="gridTitle">xxx统计</p>*/}
                            {/*<div ref="numBar" style={{width:200,height:200}} />*/}
                        {/*</Card.Grid>*/}
                    </Card>
                </div>
            </div>
        )
    }
}
