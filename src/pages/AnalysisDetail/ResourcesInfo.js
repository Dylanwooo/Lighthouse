/**
 * Created by Dylanwoo on 2018/4/9.
 */

import React, { PureComponent } from 'react';
import { Card,Row,Col,Tabs } from 'antd';
import { mapTime2MS,map2LoadType } from '../../utils/utils';
import './AnalysisDetail.less'

import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape } from 'bizcharts';


const DataSet = require('@antv/data-set');
const TabPane = Tabs.TabPane;

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

        //请求，返回字节
        Shape.registerShape('interval', 'burstPie', {
            getPoints(cfg) {
                let width = cfg.size;
                let x = cfg.x;
                let min = cfg.y[0];
                let max = cfg.y[1];
                let res = [];
                for (let i = 0; i < max; i += 0.1) {
                    if (min > i) {
                        continue;
                    } else if (min < i && min > i - 0.1) {
                        res.push(
                            { x: x - width / 2, y: min },
                            { x: x - width / 2, y: i - 0.01 },
                            { x: x + width / 2, y: i - 0.01 },
                            { x: x + width / 2, y: min }
                        );
                    }
                    let start = i;
                    let end = parseFloat((i + 0.1) > max ? max : i + 0.09);
                    res.push(
                        { x: x - width / 2, y: start },
                        { x: x - width / 2, y: end },
                        { x: x + width / 2, y: end },
                        { x: x + width / 2, y: start }
                    );
                }
                return res;
            },
            draw(cfg, container) {
                // 将归一化后的数据转换为画布上的坐标
                let points = cfg.origin.points;
                let path = [];
                for (let i = 0; i < cfg.origin.points.length; i += 4) {
                    path.push(['M', points[i].x, points[i].y]);
                    path.push(['L', points[i + 1].x, points[i + 1].y]);
                    path.push(['L', points[i + 2].x, points[i + 2].y]);
                    path.push(['L', points[i + 3].x, points[i + 3].y]);
                    path.push(['L', points[i].x, points[i].y]);
                    path.push(['z']);
                }
                path = this.parsePath(path, true);
                let _shape = container.addShape('path', {
                    attrs: {
                        fill: cfg.color || '#00D9DF',
                        path,
                    },
                });
                return _shape;
            }
        });
        const data = [
            { value: parseInt(this.props.pageStats.totalRequestBytes), key: '请求字节数' },
            { value: parseInt(this.props.pageStats.overTheWireResponseBytes), key: '线上字节数' },
        ];
        const { DataView } = DataSet;
        const _dv = new DataView();
        _dv.source(data)
            .transform({
                type: 'percent',
                field: 'value',
                dimension: 'key',
                as: 'percent'
            });
        const cols = {
            percent: {
                formatter: val => {
                    return (val * 100).toFixed(2) + '%';
                }
            }
        };


        //字节数
        //const { DataView } = DataSet;
        const { Html } = Guide;
        const byteData = [
            { item: 'CSS', count: parseInt(this.props.pageStats.cssResponseBytes) },
            { item: '图片', count: parseInt(this.props.pageStats.imageResponseBytes) },
            { item: 'JS', count: parseInt(this.props.pageStats.javascriptResponseBytes) },
            { item: 'HTML', count: parseInt(this.props.pageStats.htmlResponseBytes) },
            { item: '线上字节总数', count: parseInt(this.props.pageStats.overTheWireResponseBytes) },
            { item: '其他资源', count: parseInt(this.props.pageStats.otherResponseBytes)|| 0 }
        ];
        const dv = new DataView();
        dv.source(byteData).transform({
            type: 'percent',
            field: 'count',
            dimension: 'item',
            as: 'percent'
        });
        const bytesCols = {
            percent: {
                formatter: val => {
                    val = (val * 100).toFixed(2) + '%';
                    return val;
                }
            }
        };

        //资源数
        Shape.registerShape('point', 'image', {
            drawShape: function(cfg, container) {
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
        const numData = [
            {name: 'HTTP资源数', value: this.props.pageStats.numberResources},
            {name: 'JS', value: this.props.pageStats.numberJsResources},
            {name: 'CSS', value: this.props.pageStats.numberCssResources},
            {name: '静态资源',  value: this.props.pageStats.numberStaticResources || 0},
            {name: '引用主机数',  value: this.props.pageStats.numberHosts || 0},
            {name: '加载往返次数',  value: this.props.pageStats.numTotalRoundTrips || 0},
            {name: '阻塞资源加载往返次数',  value: this.props.pageStats.numRenderBlockingRoundTrips || 0},
        ];
        const imageMap = {
            'HTTP资源数': 'https://gw.alipayobjects.com/zos/rmsportal/eOYRaLPOmkieVvjyjTzM.png',
            'JS': 'https://gw.alipayobjects.com/zos/rmsportal/dWJWRLWfpOEbwCyxmZwu.png',
            'CSS': 'https://gw.alipayobjects.com/zos/rmsportal/ZEPeDluKmAoTioCABBTc.png',
            '静态资源': 'https://gw.alipayobjects.com/zos/rmsportal/eZYhlLzqWLAYwOHQAXmc.png',
            '引用主机数': 'https://gw.alipayobjects.com/zos/rmsportal/vXiGOWCGZNKuVVpVYQAw.png',
            '加载往返次数': 'https://gw.alipayobjects.com/zos/rmsportal/NjApYXminrnhBgOXyuaK.png',
            '阻塞资源加载往返次数': 'https://gw.alipayobjects.com/zos/rmsportal/NjApYXminrnhBgOXyuaK.png'
        };
        const numCols = {
            value: {
                nice: false,
                max: 150,
                min: 0
            }
        };

        return(
            <div>
                <div className="timingWrapper">
                    <Card style={{width:'100%'}} title="页面加载耗时">
                        <Tabs>
                            <TabPane tab="加载耗时详情" key="1">
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
                            </TabPane>
                            <TabPane tab="加载耗时箱型图" key="2">

                            </TabPane>
                        </Tabs>
                    </Card>
                </div>
                <div className="pageStatsWrapper">
                    <Card>
                        <Row>
                            <Col span={4}>
                                <p className="gridTitle">请求加载字节比</p>
                                <Chart height={480} data={_dv} scale={cols} forceFit>
                                    <Coord type="theta" radius={0.8} innerRadius={0.7} />
                                    <Tooltip showTitle={false} />
                                    <Legend />
                                    <Axis name="percent"  title={{
                                        offset: 40,
                                        text: '百分比'
                                    }}/>
                                    <Geom type='intervalStack' shape='burstPie' position="percent" color={['key', [ '#1890ff', '#f04864', '#bfbfbf']]} />
                                </Chart>
                            </Col>
                            <Col span={10}>
                                <p className="gridTitle">加载字节统计</p>
                                <Chart height={480}  data={dv} scale={bytesCols} forceFit>
                                    <Coord type={'theta'} radius={0.75} innerRadius={0.6} />
                                    <Axis name="percent" />
                                    <Legend position='right'offsetY={-window.innerHeight / 2 + 300} offsetX={-120} textStyle={{fontSize:14}} />
                                    <Tooltip
                                        showTitle={false}
                                        itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
                                    />
                                    <Guide >
                                        <Html position ={[ '50%', '50%' ]} html='<div style="color:#8c8c8c;font-size:1em;text-align: center;width: 10em;">总字节数<br><span style="color:#262626;font-size:1.16em">2,352,112</span><br>bytes</div>' alignX='middle' alignY='middle'/>
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
                            <Col span={10}>
                                <p className="gridTitle">加载资源数量统计</p>
                                <Chart height={500} data={numData} scale={numCols} forceFit>
                                    <Axis name="name" title={{textStyle:{fontSie:14}}}/>
                                    <Axis name="value" visible={false} />
                                    <Tooltip />
                                    <Geom type='point' position="name*value" color="name" shape={['name', (name) => {
                                        return ['image', imageMap[name]]; // 根据具体的字段指定 shape
                                    }]} size='value' style={{stroke: '#fff',
                                        lineWidth: 1,
                                        fillOpacity: 1}} >
                                        <Label content="value" offset={-20} textStyle={{
                                            fontSize:16, // 文本大小
                                        }}/>
                                    </Geom>
                                </Chart>
                            </Col>

                        </Row>

                    </Card>
                </div>
            </div>
        )
    }
}
