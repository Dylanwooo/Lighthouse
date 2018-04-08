import React, { PureComponent } from 'react';
import { Card,Row,Col,Tooltip } from 'antd';
import { map2Percetage } from '../../utils/utils'
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

    componentDidMount() {
        const loadingExperience = this.props.loadingExperience;

        loadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS.distributions.map(val => FCPArray.push(val.proportion));
        loadingExperience.metrics.DOM_CONTENT_LOADED_EVENT_FIRED_MS.distributions.map(val => DCLArray.push(val.proportion));

        loadingExperience.metrics.DOM_CONTENT_LOADED_EVENT_FIRED_MS.distributions.map(val => DCLminArray.push(val.min));
        loadingExperience.metrics.DOM_CONTENT_LOADED_EVENT_FIRED_MS.distributions.map(val => DCLmaxArray.push(val.max));
        loadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS.distributions.map(val => FCPminArray.push(val.min));
        loadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS.distributions.map(val => FCPmaxArray.push(val.max));

        console.log(DCLminArray)
        console.log(DCLmaxArray)
        console.log(FCPminArray)
        console.log(FCPmaxArray)


        // let myBarChart = echarts.init(this.refs.disBar);
        // // 绘制Bar
        // myBarChart.setOption({
        //     color:['#00CD66','#FFD700','#FF6A6A'],
        //     tooltip: {
        //         trigger:'axis',
        //         axisPointer: {
        //             type: 'shadow'
        //         },
        //     },
        //     legend: {
        //         data: ['快速加载', '中速加载','缓慢加载']
        //     },
        //     xAxis: {
        //         type:'value',
        //         data: ['0%','25%','50%','75%','100%']
        //     },
        //     yAxis: {
        //         type:'category',
        //         data: ['DCL','FCP']
        //     },
        //     series: [{
        //         name: 'fast',
        //         type: 'bar',
        //         stack: '总量',
        //         data: [map2Percetage(DCLArray[0]),map2Percetage(FCPArray[0])]
        //     },{
        //         name: 'medium',
        //         type: 'bar',
        //         stack: '总量',
        //         data: [map2Percetage(DCLArray[1]),map2Percetage(FCPArray[1])]
        //     },{
        //         name: 'slow',
        //         type: 'bar',
        //         stack: '总量',
        //         data: [map2Percetage(DCLArray[2]),map2Percetage(FCPArray[2])]
        //     }]
        // });
        //
        // //Pie图
        // let myPieChart = echarts.init(this.refs.disPie);
        // myPieChart.setOption({
        //     color:['#00CD66','#FFB90F','#FF4040'],
        //     tooltip : {
        //         trigger: 'item',
        //         formatter: "{a} <br/>{b} : {c} ({d}%)"
        //     },
        //     legend: {
        //         x : 'center',
        //         y : 'bottom',
        //         data: FCPArray
        //     },
        //     toolBox: {
        //         show: true,
        //         feature: {
        //             mark: {show:true},
        //             dataView: {show: true,readOnly:false},
        //             magicType: {
        //                 show: true,
        //                 type: ['pie','funnel']
        //             },
        //             restore : {show: true},
        //             saveAsImage : {show: true}
        //         }
        //     },
        //     series: [
        //         {
        //             name:'FCP',
        //             type:'pie',
        //             radius : [20, 110],
        //             center : ['25%', '50%'],
        //             roseType : 'radius',
        //             label: {
        //                 normal: {
        //                     show: false
        //                 },
        //                 emphasis: {
        //                     show: true
        //                 }
        //             },
        //             lableLine: {
        //                 normal: {
        //                     show: false
        //                 },
        //                 emphasis: {
        //                     show: true
        //                 }
        //             },
        //             data: [
        //                 {value:map2Percetage(FCPArray[0]),name:'快速加载'},
        //                 {value:map2Percetage(FCPArray[1]),name:'中速加载'},
        //                 {value:map2Percetage(FCPArray[2]),name:'慢速加载'},
        //             ]
        //         }
        //     ]
        // })
    }

    render() {

        return(
            <div className="outsiderWrapper">
                <div className="wrapper">
                    <div className="cardGroupWrapper">
                        <Card title="快速" style={{width:200,background:'#4EEE94'}}
                              bordered={false} hoverable={true}
                              extra={<Tooltip title="prompt text" placement="topRight"><span className="moreDetail">More</span></Tooltip>}
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
                              extra={<Tooltip title="prompt text" placement="topRight"><span className="moreDetail">More</span></Tooltip>}
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
                              extra={<Tooltip title="prompt text" placement="topRight"><span className="moreDetail">More</span></Tooltip>}
                        >
                            <Meta title={<div>{map2Percetage(DCLArray[2])}</div>} description=
                                {<div>
                                    <span className="cardContentItem">min:{DCLminArray[2]}</span>
                                    <span className="cardContentItem">max:{DCLmaxArray[2]}</span>
                                </div>}
                            />
                        </Card>
                    </div>
                    <div className="cardGroupWrapper">
                        <Card title="快速" style={{width:200,background:'#4EEE94'}}
                              bordered={false}
                              hoverable={true}
                              extra={<Tooltip title="prompt text" placement="topRight"><span className="moreDetail">More</span></Tooltip>}
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
                              extra={<Tooltip title="prompt text" placement="topRight"><span className="moreDetail">More</span></Tooltip>}
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
                              extra={<Tooltip title="prompt text" placement="topRight"><span className="moreDetail">More</span></Tooltip>}
                        >
                            <Meta title={<div>{map2Percetage(FCPArray[2])}</div>} description=
                                {<div>
                                    <span className="cardContentItem">min:{FCPminArray[2]}</span>
                                    <span className="cardContentItem">max:{FCPminArray[2]}</span>
                                </div>}
                            />
                        </Card>
                    </div>
                </div>
                {/*<Card title="网页加载分布图" bordered={false} style={{ width: '80%',margin:'auto' }}>*/}
                    {/*<Row gutter={50}>*/}
                        {/*<Col col={12}>*/}
                            {/*<div ref="disBar" style={{  height: 300}}/>*/}
                        {/*</Col>*/}
                        {/*<Col col={12}>*/}
                            {/*<div ref="disPie" style={{  height: 300}}/>*/}
                        {/*</Col>*/}
                    {/*</Row>*/}
                {/*</Card>*/}
                {/*<div className="">*/}

                {/*</div>*/}
            </div>
        )
    }
}