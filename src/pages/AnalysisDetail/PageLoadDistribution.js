import React, { PureComponent } from 'react';
import { Card,Row,Col } from 'antd';
import { map2Percetage } from '../../utils/utils'
import echarts from 'echarts';
import  'echarts/lib/chart/bar';
import './AnalysisDetail.less'

const { Meta } = Card;


export default class PageLoadDistribution extends PureComponent {

    // componentDidMount() {
    //     const loadingExperience = this.props.loadingExperience;
    //     let FCPArray =[];
    //     let DCLArray = [];
    //     loadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS.distributions.map(val => FCPArray.push(val.proportion));
    //     loadingExperience.metrics.DOM_CONTENT_LOADED_EVENT_FIRED_MS.distributions.map(val => DCLArray.push(val.proportion));
    //
    //     let myBarChart = echarts.init(this.refs.disBar);
    //     // 绘制Bar
    //     myBarChart.setOption({
    //         color:['#00CD66','#FFB90F','#FF4040'],
    //         tooltip: {
    //             trigger:'axis',
    //             axisPointer: {
    //                 type: 'shadow'
    //             },
    //         },
    //         legend: {
    //             data: ['快速加载', '中速加载','缓慢加载']
    //         },
    //         xAxis: {
    //             type:'value',
    //             data: ['0%','25%','50%','75%','100%']
    //         },
    //         yAxis: {
    //             type:'category',
    //             data: ['DCL','FCP']
    //         },
    //         series: [{
    //             name: 'fast',
    //             type: 'bar',
    //             stack: '总量',
    //             data: [map2Percetage(DCLArray[0]),map2Percetage(FCPArray[0])]
    //         },{
    //             name: 'medium',
    //             type: 'bar',
    //             stack: '总量',
    //             data: [map2Percetage(DCLArray[1]),map2Percetage(FCPArray[1])]
    //         },{
    //             name: 'slow',
    //             type: 'bar',
    //             stack: '总量',
    //             data: [map2Percetage(DCLArray[2]),map2Percetage(FCPArray[2])]
    //         }]
    //     });
    //
    //     //Pie图
    //     let myPieChart = echarts.init(this.refs.disPie);
    //     myPieChart.setOption({
    //         color:['#00CD66','#FFB90F','#FF4040'],
    //         tooltip : {
    //             trigger: 'item',
    //             formatter: "{a} <br/>{b} : {c} ({d}%)"
    //         },
    //         legend: {
    //             x : 'center',
    //             y : 'bottom',
    //             data: FCPArray
    //         },
    //         toolBox: {
    //             show: true,
    //             feature: {
    //                 mark: {show:true},
    //                 dataView: {show: true,readOnly:false},
    //                 magicType: {
    //                     show: true,
    //                     type: ['pie','funnel']
    //                 },
    //                 restore : {show: true},
    //                 saveAsImage : {show: true}
    //             }
    //         },
    //         series: [
    //             {
    //                 name:'FCP',
    //                 type:'pie',
    //                 radius : [20, 110],
    //                 center : ['25%', '50%'],
    //                 roseType : 'radius',
    //                 label: {
    //                     normal: {
    //                         show: false
    //                     },
    //                     emphasis: {
    //                         show: true
    //                     }
    //                 },
    //                 lableLine: {
    //                     normal: {
    //                         show: false
    //                     },
    //                     emphasis: {
    //                         show: true
    //                     }
    //                 },
    //                 data: [
    //                     {value:map2Percetage(FCPArray[0]),name:'快速加载'},
    //                     {value:map2Percetage(FCPArray[1]),name:'中速加载'},
    //                     {value:map2Percetage(FCPArray[2]),name:'慢速加载'},
    //                 ]
    //             }
    //         ]
    //     })
    // }

    render() {

        return(
            <div>
                <div style={{display:'flex',margin: 'auto'}}>
                    <div style={{display:'inline-block',margin:'10px 50px'}}>
                        <Card title="快速" style={{width:200}}>
                            <Meta title={<div>50%</div>} description=
                                {<div>
                                    <span>min:0</span>
                                    <span>max:856</span>
                                </div>}
                            />
                        </Card>
                        <Card title="快速" style={{width:200}}>
                            <Meta title={<div>50%</div>} description=
                                {<div>
                                    <span>min:0</span>
                                    <span>max:856</span>
                                </div>}
                            />
                        </Card>
                        <Card title="快速" style={{width:200}}>
                            <Meta title={<div>50%</div>} description=
                                {<div>
                                    <span>min:0</span>
                                    <span>max:856</span>
                                </div>}
                            />
                        </Card>
                    </div>
                    <div style={{display:'inline-block',margin:'10px 50px'}}>
                        <Card title="快速" style={{width:200}}>
                            <Meta title={<div>50%</div>} description=
                                {<div>
                                    <span>min:0</span>
                                    <span>max:856</span>
                                </div>}
                            />
                        </Card>
                        <Card title="快速" style={{width:200}}>
                            <Meta title={<div>50%</div>} description=
                                {<div>
                                    <span>min:0</span>
                                    <span>max:856</span>
                                </div>}
                            />
                        </Card>
                        <Card title="快速" style={{width:200}}>
                            <Meta title={<div>50%</div>} description=
                                {<div>
                                    <span>min:0</span>
                                    <span>max:856</span>
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