import React, { PureComponent } from 'react';
import { Card,Row,Col,Tooltip } from 'antd';
import { map2Percetage,map2toFix } from '../../utils/utils'
import echarts from 'echarts';
import  'echarts/lib/chart/bar';
import './AnalysisDetail.less'

const { Meta } = Card;

let FCPArray =[];
let DCLArray = [];
let DCLminArray = [];
let DCLmaxArray = [];
let FCPminArray = [];
let FCPmaxArray = [];

export default class PageLoadDistribution extends PureComponent {

    componentWillMount() {
        const loadingExperience = this.props.loadingExperience || null;
        if(loadingExperience !== null){
            loadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS.distributions.map(val => FCPArray.push(val.proportion));
            loadingExperience.metrics.DOM_CONTENT_LOADED_EVENT_FIRED_MS.distributions.map(val => DCLArray.push(val.proportion));

            loadingExperience.metrics.DOM_CONTENT_LOADED_EVENT_FIRED_MS.distributions.map(val => DCLminArray.push(val.min));
            loadingExperience.metrics.DOM_CONTENT_LOADED_EVENT_FIRED_MS.distributions.map(val => DCLmaxArray.push(val.max));
            loadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS.distributions.map(val => FCPminArray.push(val.min));
            loadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS.distributions.map(val => FCPmaxArray.push(val.max));
        }
    }

    componentDidMount() {
        let myBarChart = echarts.init(this.refs.disBar);
        // 绘制Bar
        myBarChart.setOption({
            color:['#00CD66','#FFD700','#FF6A6A'],
            tooltip: {
                trigger:'axis',
                axisPointer: {
                    type: 'shadow'
                },
            },
            legend: {
                x : 'center',
                y : 'bottom',
                data: ['快速加载', '中速加载','缓慢加载'],
                show: true
            },
            xAxis: {
                type:'value',
                data: ['0%','25%','50%','75%','100%']
            },
            yAxis: {
                type:'category',
                data: ['DCL','FCP']
            },
            series: [{
                name: 'fast',
                type: 'bar',
                stack: '总量',
                data: [map2toFix(DCLArray[0]),map2toFix(FCPArray[0])]
            },{
                name: 'medium',
                type: 'bar',
                stack: '总量',
                data: [map2toFix(DCLArray[1]),map2toFix(FCPArray[1])]

            },{
                name: 'slow',
                type: 'bar',
                stack: '总量',
                data: [map2toFix(DCLArray[2]),map2toFix(FCPArray[2])]

            }]
        });

        //Pie图
        let myPieChart = echarts.init(this.refs.disPie);
        myPieChart.setOption({
            color:['#00CD66','#FFB90F','#FF4040'],
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                x : 'center',
                y : 'bottom',
                data: ['快速加载','中速加载','慢速加载']
            },
            toolBox: {
                show: true,
                feature: {
                    mark: {show:true},
                    dataView: {show: true,readOnly:false},
                    magicType: {
                        show: true,
                        type: ['pie','funnel']
                    },
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            series: [
                {
                    name:'FCP',
                    type:'pie',
                    radius : '65%',
                    center : ['50%','45%'],
                    roseType : 'radius',
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    lableLine: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shaowColor: 'rgba(0,0,0,0.5)'
                        }
                    },
                    data: [
                        {value:map2toFix(FCPArray[0]),name:'快速加载'},
                        {value:map2toFix(FCPArray[1]),name:'中速加载'},
                        {value:map2toFix(FCPArray[2]),name:'慢速加载'},
                    ]
                }
            ]
        })
    }

    render() {

        const fastTextFCP = '此网页中'+map2Percetage(FCPArray[0])+'加载的First Contentful Paint属于快速';
        const fastTextDCL = '此网页中'+map2Percetage(DCLArray[0])+'加载的DOM Content Loaded属于快速';
        const mediumTextFCP = '此网页中'+map2Percetage(FCPArray[1])+'加载的First Contentful Paint属于中等';
        const mediumTextDCL = '此网页中'+map2Percetage(DCLArray[1])+'加载的DOM Content Loaded属于中等';
        const slowTextFCP = '此网页中'+map2Percetage(FCPArray[2])+'加载的First Contentful Paint属于快速';
        const slowTextDCL = '此网页中'+map2Percetage(DCLArray[2])+'加载的DOM Content Loaded属于快速';

        return(
            <div className="outsiderWrapper">
                <div className="wrapper">
                    <div className="cardGroupWrapper">
                        <Card title="快速" style={{width:200,background:'#4EEE94'}}
                              bordered={false} hoverable={true}
                              extra={<Tooltip title={fastTextDCL} placement="bottomRight"><span className="moreDetail">More</span></Tooltip>}
                        >
                            <Meta title={<div>{map2Percetage(DCLArray[0])}</div>} description=
                                {<div>
                                    <span className="cardContentItem">min:{DCLminArray[0]}</span>
                                    <span className="cardContentItem">max:{DCLmaxArray[0]}</span>
                                </div>}
                            />
                        </Card>
                        <Card title="中速" style={{width:200,background:'#FFD700'}}
                              bordered={false}
                              hoverable={true}
                              extra={<Tooltip title={mediumTextDCL} placement="bottomRight"><span className="moreDetail">More</span></Tooltip>}
                        >
                            <Meta title={<div>{map2Percetage(DCLArray[1])}</div>} description=
                                {<div>
                                    <span className="cardContentItem">min:{DCLminArray[1]}</span>
                                    <span className="cardContentItem">max:{DCLmaxArray[1]}</span>
                                </div>}
                            />
                        </Card>
                        <Card title="慢速" style={{width:200,background:'#FF6A6A'}}
                              bordered={false}
                              hoverable={true}
                              extra={<Tooltip title={slowTextDCL} placement="bottomRight"><span className="moreDetail">More</span></Tooltip>}
                        >
                            <Meta title={<div>{map2Percetage(DCLArray[2])}</div>} description=
                                {<div>
                                    <span className="cardContentItem">min:{DCLminArray[2]}</span>
                                </div>}
                            />
                        </Card>
                    </div>
                    <div className="cardGroupWrapper">
                        <Card title="快速" style={{width:200,background:'#4EEE94'}}
                              bordered={false}
                              hoverable={true}
                              extra={<Tooltip title={fastTextFCP} placement="bottomRight"><span className="moreDetail">More</span></Tooltip>}
                        >
                            <Meta title={<div>{map2Percetage(FCPArray[0])}</div>} description=
                                {<div>
                                    <span className="cardContentItem">min:{FCPminArray[0]}</span>
                                    <span className="cardContentItem">max:{FCPmaxArray[0]}</span>
                                </div>}
                            />
                        </Card>
                        <Card title="中速" style={{width:200,background:'#FFD700'}}
                              bordered={false}
                              hoverable={true}
                              extra={<Tooltip title={mediumTextFCP} placement="bottomRight"><span className="moreDetail">More</span></Tooltip>}
                        >
                            <Meta title={<div>{map2Percetage(FCPArray[1])}</div>} description=
                                {<div>
                                    <span className="cardContentItem">min:{FCPminArray[1]}</span>
                                    <span className="cardContentItem">max:{FCPmaxArray[1]}</span>
                                </div>}
                            />
                        </Card>
                        <Card title="慢速" style={{width:200,background:'#FF6A6A'}}
                              bordered={false}
                              hoverable={true}
                              extra={<Tooltip title={slowTextFCP} placement="bottomRight"><span className="moreDetail">More</span></Tooltip>}
                        >
                            <Meta title={<div>{map2Percetage(FCPArray[2])}</div>} description=
                                {<div>
                                    <span className="cardContentItem">min:{FCPminArray[2]}</span>
                                </div>}
                            />
                        </Card>
                    </div>
                </div>
                <div className="wrapper">
                    <div className="cardGroupWrapper">
                        <Card bordered={false}>
                            <div ref="disBar" style={{width:571,height:250}} />

                        </Card>
                    </div>
                    <div className="cardGroupWrapper">
                        <Card bordered={false}>
                            <div ref="disPie" style={{width:571,height:250}} />
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}