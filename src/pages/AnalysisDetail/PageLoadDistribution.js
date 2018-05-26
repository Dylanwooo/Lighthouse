import React, { PureComponent } from 'react';
import { Card,Row,Col,Tooltip,Icon,Tabs } from 'antd';
import { map2Percetage,map2toFix } from '../../utils/utils';
import { Chart, Geom, Axis, Coord, Label, Legend, View, Guide, Shape } from "bizcharts";
import './AnalysisDetail.less'

const { Meta } = Card;
const DataSet = require('@antv/data-set');
const TabPane = Tabs.TabPane;

let FCPArray =[];
let DCLArray = [];
let DCLminArray = [];
let DCLmaxArray = [];
let FCPminArray = [];
let FCPmaxArray = [];


export default class PageLoadDistribution extends PureComponent {

    componentWillMount() {
        const loadingExperience = this.props.loadingExperience;
        if(loadingExperience){
            loadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS.distributions.map(val => FCPArray.push(val.proportion));
            loadingExperience.metrics.DOM_CONTENT_LOADED_EVENT_FIRED_MS.distributions.map(val => DCLArray.push(val.proportion));

            loadingExperience.metrics.DOM_CONTENT_LOADED_EVENT_FIRED_MS.distributions.map(val => DCLminArray.push(val.min));
            loadingExperience.metrics.DOM_CONTENT_LOADED_EVENT_FIRED_MS.distributions.map(val => DCLmaxArray.push(val.max));
            loadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS.distributions.map(val => FCPminArray.push(val.min));
            loadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS.distributions.map(val => FCPmaxArray.push(val.max));
        }
    }

    componentDidMount() {

    }

    render() {

        const fastTextFCP = '此网页中'+map2Percetage(FCPArray[0])+'加载的First Contentful Paint属于快速';
        const fastTextDCL = '此网页中'+map2Percetage(DCLArray[0])+'加载的DOM Content Loaded属于快速';
        const mediumTextFCP = '此网页中'+map2Percetage(FCPArray[1])+'加载的First Contentful Paint属于中等';
        const mediumTextDCL = '此网页中'+map2Percetage(DCLArray[1])+'加载的DOM Content Loaded属于中等';
        const slowTextFCP = '此网页中'+map2Percetage(FCPArray[2])+'加载的First Contentful Paint属于快速';
        const slowTextDCL = '此网页中'+map2Percetage(DCLArray[2])+'加载的DOM Content Loaded属于快速';

        //card
        const { DataView } = DataSet;
        const { Html } = Guide;
        const DCLfast = [
            { item: '事例一', count: DCLArray[0]*100 },
            { item: '事例二', count: 100-DCLArray[0]*100 },
        ];
        const DCLmedium = [
            { item: '事例一', count: DCLArray[1]*100 },
            { item: '事例二', count: 100-DCLArray[1]*100 },
        ];
        const DCLslow = [
            { item: '事例一', count: DCLArray[2]*100 },
            { item: '事例二', count: 100-DCLArray[2]*100 },
        ];

        const FCPfast = [
            { item: '事例一', count: FCPArray[0]*100 },
            { item: '事例二', count: 100-FCPArray[0]*100 },
        ];
        const FCPmedium = [
            { item: '事例一', count: FCPArray[1]*100 },
            { item: '事例二', count: 100-FCPArray[1]*100 },
        ];
        const FCPslow = [
            { item: '事例一', count: FCPArray[2]*100 },
            { item: '事例二', count: 100-FCPArray[2]*100 },
        ];

        const DCLFastdv = new DataView();
        const DCLMediumdv = new DataView();
        const DCLSlowdv = new DataView();
        const FCPFastdv = new DataView();
        const FCPMediumdv = new DataView();
        const FCPSlowdv = new DataView();

        DCLFastdv.source(DCLfast).transform({
            type: 'percent',
            field: 'count',
            dimension: 'item',
            as: 'percent'
        });
        DCLMediumdv.source(DCLmedium).transform({
            type: 'percent',
            field: 'count',
            dimension: 'item',
            as: 'percent'
        });
        DCLSlowdv.source(DCLslow).transform({
            type: 'percent',
            field: 'count',
            dimension: 'item',
            as: 'percent'
        });

        FCPFastdv.source(FCPfast).transform({
            type: 'percent',
            field: 'count',
            dimension: 'item',
            as: 'percent'
        });
        FCPMediumdv.source(FCPmedium).transform({
            type: 'percent',
            field: 'count',
            dimension: 'item',
            as: 'percent'
        });
        FCPSlowdv.source(FCPslow).transform({
            type: 'percent',
            field: 'count',
            dimension: 'item',
            as: 'percent'
        });

        const cardCols = {
            percent: {
                formatter: val => {
                    val = (val * 100) + '%';
                    return val;
                }
            }
        };

        //箱型图
        const boxData = [
            { x: '测试1', low: 3481.5, q1: 4224, median: 4470, q3: 4719, high: 5416.5},
            { x: '测试2', low: 3940, q1: 4214, median: 4410, q3: 4685, high: 4904.8},
            { x: '测试3', low: 3514.2, q1: 4454, median: 4808.1, q3: 4879, high: 5688.4},
            { x: '测试4', low: 3805, q1: 4442, median: 4500, q3: 4921, high: 5162},
            { x: '测试5', low: 4002.5, q1: 4213, median: 4658, q3: 4876.5, high: 5156.9},
        ];

        const boxDv = new DataView().source(boxData);
        boxDv.transform({
            type: 'map',
            callback: (obj) => {
                obj.range = [ obj.low, obj.q1, obj.median, obj.q3, obj.high ];
                return obj;
            }
        });
        const boxCols ={
            range: {
                min: 0,
                max: 7000
            },
            outliers: {
                min: 0,
                max: 3000
            }
        };

        //雷达
        const data = [
            { item: '快速', DCL: DCLArray[0], FCP: FCPArray[0] },
            { item: '中速', DCL: DCLArray[1], FCP: FCPArray[1] },
            { item: '慢速', DCL: DCLArray[2], FCP: FCPArray[2] },
        ];
        const dv = new DataView().source(data);
        dv.transform({
            type: 'fold',
            fields: [ 'DCL', 'FCP' ], // 展开字段集
            key: 'user', // key字段
            value: 'score', // value字段
        });

        const cols = {
            score: {
                min: 0,
                max: 1
            }
        };

        return(
            <div className="outsiderWrapper">
                <div style={{margin:20}}>
                    <Row gutter={32}>
                        <Col span={12}>
                            <p style={{fontSize: 16}}>DCL加载</p>
                            <Row gutter={16}>
                                <Col span={8}>
                                    <Card title="快速"
                                          extra={<Tooltip title={fastTextDCL} placement="bottomRight"><Icon type="info-circle-o" /></Tooltip> }
                                          hoverable={true}
                                    >
                                        <Chart height={100} data={DCLFastdv} scale={cardCols} padding={[-15,20,0,5]} forceFit>
                                            <Coord type={'theta'} radius={0.75} innerRadius={0.6} />
                                            <Axis  name="percent"/>
                                            <Guide >
                                                <Html position ={[ '50%', '50%' ]} html='<span style="color:#2ECC71;font-size:18px">84%</span>' alignX='middle' alignY='middle'/>
                                            </Guide>
                                            <Geom
                                                type="intervalStack"
                                                position="percent"
                                                color={['item', ['#2ECC71', '#f0f2f5']]}
                                                tooltip={['item*percent',(item, percent) => {
                                                    percent = percent * 100 + '%';
                                                    return {
                                                        name: item,
                                                        value: percent
                                                    };
                                                }]}
                                                style={{lineWidth: 1,stroke: '#fff'}}
                                            >
                                            </Geom>
                                        </Chart>
                                    </Card>
                                </Col>
                                <Col span={8}>
                                    <Card title="中速"
                                          extra={<Tooltip title={mediumTextDCL} placement="bottomRight"><Icon type="info-circle-o" /></Tooltip> }
                                          hoverable={true}
                                    >
                                        <Chart height={100} data={DCLMediumdv} scale={cardCols} padding={[-15,20,0,5]} forceFit>
                                            <Coord type={'theta'} radius={0.75} innerRadius={0.6} />
                                            <Axis  name="percent"/>
                                            <Guide >
                                                <Html position ={[ '50%', '50%' ]} html='<span style="color:#F1C40F;font-size:18px">11%</span>' alignX='middle' alignY='middle'/>
                                            </Guide>
                                            <Geom
                                                type="intervalStack"
                                                position="percent"
                                                color={['item', ['#F1C40F', '#f0f2f5']]}
                                                tooltip={['item*percent',(item, percent) => {
                                                    percent = percent * 100 + '%';
                                                    return {
                                                        name: item,
                                                        value: percent
                                                    };
                                                }]}
                                                style={{lineWidth: 1,stroke: '#fff'}}
                                            >
                                            </Geom>
                                        </Chart>
                                    </Card>
                                </Col>
                                <Col span={8}>
                                    <Card title="慢速"
                                          extra={<Tooltip title={slowTextDCL} placement="bottomRight"><Icon type="info-circle-o" /></Tooltip> }
                                          hoverable={true}
                                    >
                                        <Chart height={100} data={DCLSlowdv} scale={cardCols} padding={[-15,20,0,5]} forceFit>
                                            <Coord type={'theta'} radius={0.75} innerRadius={0.6} />
                                            <Axis  name="percent"/>
                                            <Guide >
                                                <Html position ={[ '50%', '50%' ]} html='<span style="color:#F1948A;font-size:18px">5%</span>' alignX='middle' alignY='middle'/>
                                            </Guide>
                                            <Geom
                                                type="intervalStack"
                                                position="percent"
                                                color={['item', ['#F1948A', '#f0f2f5']]}
                                                tooltip={['item*percent',(item, percent) => {
                                                    percent = percent * 100 + '%';
                                                    return {
                                                        name: item,
                                                        value: percent
                                                    };
                                                }]}
                                                style={{lineWidth: 1,stroke: '#fff'}}
                                            >
                                            </Geom>
                                        </Chart>
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={12}>
                            <p style={{fontSize: 16}}>FCP加载</p>
                            <Row gutter={16}>
                                <Col span={8}>
                                    <Card title="快速"
                                          extra={<Tooltip title={fastTextFCP} placement="bottomRight"><Icon type="info-circle-o" /></Tooltip> }
                                          hoverable={true}
                                    >
                                        <Chart height={100} data={FCPFastdv} scale={cardCols} padding={[-15,20,0,5]} forceFit>
                                            <Coord type={'theta'} radius={0.75} innerRadius={0.6} />
                                            <Axis  name="percent"/>
                                            <Guide >
                                                <Html position ={[ '50%', '50%' ]} html='<span style="color:#2ECC71;font-size:18px">83%</span>' alignX='middle' alignY='middle'/>
                                            </Guide>
                                            <Geom
                                                type="intervalStack"
                                                position="percent"
                                                color={['item', ['#2ECC71', '#f0f2f5']]}
                                                tooltip={['item*percent',(item, percent) => {
                                                    percent = percent * 100 + '%';
                                                    return {
                                                        name: item,
                                                        value: percent
                                                    };
                                                }]}
                                                style={{lineWidth: 1,stroke: '#fff'}}
                                            >
                                            </Geom>
                                        </Chart>
                                    </Card>
                                </Col>
                                <Col span={8}>
                                    <Card title="中速"
                                          extra={<Tooltip title={mediumTextFCP} placement="bottomRight"><Icon type="info-circle-o" /></Tooltip> }
                                          hoverable={true}
                                    >
                                        <Chart height={100} data={FCPMediumdv} scale={cardCols} padding={[-15,20,0,5]} forceFit>
                                            <Coord type={'theta'} radius={0.75} innerRadius={0.6} />
                                            <Axis  name="percent"/>
                                            <Guide >
                                                <Html position ={[ '50%', '50%' ]} html='<span style="color:#F1C40F;font-size:18px">12%</span>' alignX='middle' alignY='middle'/>
                                            </Guide>
                                            <Geom
                                                type="intervalStack"
                                                position="percent"
                                                color={['item',['#F1C40F', '#f0f2f5']]}
                                                tooltip={['item*percent',(item, percent) => {
                                                    percent = percent * 100 + '%';
                                                    return {
                                                        name: item,
                                                        value: percent
                                                    };
                                                }]}
                                                style={{lineWidth: 1,stroke: '#fff'}}
                                            >
                                            </Geom>
                                        </Chart>
                                    </Card>
                                </Col>
                                <Col span={8}>
                                    <Card title="慢速"
                                          extra={<Tooltip title={slowTextFCP} placement="bottomRight"><Icon type="info-circle-o" /></Tooltip> }
                                          hoverable={true}
                                    >
                                        <Chart height={100} data={FCPSlowdv} scale={cardCols} padding={[-15,20,0,5]} forceFit>
                                            <Coord type={'theta'} radius={0.75} innerRadius={0.6} />
                                            <Axis  name="percent"/>
                                            <Guide >
                                                <Html position ={[ '50%', '50%' ]} html='<span style="color:#F1948A;font-size:18px">5%</span>' alignX='middle' alignY='middle'/>
                                            </Guide>
                                            <Geom
                                                type="intervalStack"
                                                position="percent"
                                                color={['item',['#F1948A', '#f0f2f5']]}
                                                tooltip={['item*percent',(item, percent) => {
                                                    percent = percent * 100 + '%';
                                                    return {
                                                        name: item,
                                                        value: percent
                                                    };
                                                }]}
                                                style={{lineWidth: 1,stroke: '#fff'}}
                                            >
                                            </Geom>
                                        </Chart>
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
                <div style={{margin: 20}}>
                    <Row gutter={32}>
                        <Col span={16}>
                            <Card title="箱型图分析">
                                <Tabs defaultActiveKey="1" >
                                    <TabPane tab="DCL加载结果" key="1">
                                        <Chart height={500} data={boxDv} scale={boxCols} padding={[ 20, 120, 95 ]} forceFit>
                                            <Axis name='x' />
                                            <Axis name='range' />
                                            <Tooltip showTitle={false} crosshairs={{type:'rect',style: {fill: '#E4E8F1',fillOpacity: 0.43}}}     itemTpl='<li data-index={index} style="margin-bottom:4px;"><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}<br/><span style="padding-left: 16px">最大值：{high}</span><br/><span style="padding-left: 16px">上四分位数：{q3}</span><br/><span style="padding-left: 16px">中位数：{median}</span><br/><span style="padding-left: 16px">下四分位数：{q1}</span><br/><span style="padding-left: 16px">最小值：{low}</span><br/></li>'/>

                                            <Geom type="schema" position="x*range" shape='box' tooltip={['x*low*q1*median*q3*high', (x, low, q1, median, q3, high) => {
                                                return {
                                                    name: x,
                                                    low,
                                                    q1,
                                                    median,
                                                    q3,
                                                    high
                                                };
                                            }]}
                                                  style={{stroke: 'rgba(0, 0, 0, 0.45)',fill: '#1890FF',fillOpacity: 0.3}}
                                            />
                                            <View data={data} >
                                                <Geom type="point" position="x*outliers" shape='circle' size={3} active={false} />
                                            </View>
                                        </Chart>
                                    </TabPane>
                                    <TabPane tab="FCP加载结果" key="2">
                                        <Chart height={500} data={boxDv} scale={boxCols} padding={[ 20, 120, 95 ]} forceFit>
                                            <Axis name='x' />
                                            <Axis name='range' />
                                            <Tooltip showTitle={false} crosshairs={{type:'rect',style: {fill: '#E4E8F1',fillOpacity: 0.43}}}     itemTpl='<li data-index={index} style="margin-bottom:4px;"><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}<br/><span style="padding-left: 16px">最大值：{high}</span><br/><span style="padding-left: 16px">上四分位数：{q3}</span><br/><span style="padding-left: 16px">中位数：{median}</span><br/><span style="padding-left: 16px">下四分位数：{q1}</span><br/><span style="padding-left: 16px">最小值：{low}</span><br/></li>'/>

                                            <Geom type="schema" position="x*range" shape='box' tooltip={['x*low*q1*median*q3*high', (x, low, q1, median, q3, high) => {
                                                return {
                                                    name: x,
                                                    low,
                                                    q1,
                                                    median,
                                                    q3,
                                                    high
                                                };
                                            }]}
                                                  style={{stroke: 'rgba(0, 0, 0, 0.45)',fill: '#1890FF',fillOpacity: 0.3}}
                                            />
                                            <View data={data} >
                                                <Geom type="point" position="x*outliers" shape='circle' size={3} active={false} />
                                            </View>
                                        </Chart>
                                    </TabPane>
                                </Tabs>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="雷达图分析">
                                <Chart height={500} data={dv} padding={[20, 20, 95, 20 ]} scale={cols} forceFit>
                                    <Coord type="polar" radius={0.8} />
                                    <Axis name="item" line={null} tickLine={null} grid={{lineStyle: {
                                        lineDash: null
                                    },
                                        hideFirstLine: false}} />
                                    <Tooltip />
                                    <Axis name="score" line={null} tickLine={null} grid={{type: 'polygon',
                                        lineStyle: {
                                            lineDash: null
                                        },
                                        alternateColor: 'rgba(0, 0, 0, 0.04)'}} />
                                    <Legend name="user" marker="circle" offset={30}/>
                                    <Geom type='area' position="item*score" color="user" />
                                    <Geom type='line' position="item*score" color="user" size={2}/>
                                    <Geom type='point' position="item*score" color="user" shape="circle" size={4} style={{stroke: '#fff',
                                        lineWidth: 1,
                                        fillOpacity: 1}} />
                                </Chart>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}