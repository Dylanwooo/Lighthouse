import React, { PureComponent } from 'react';
import { Card } from 'antd';

import echarts from 'echarts';
import  'echarts/lib/chart/bar';

export default class PageLoadDistribution extends PureComponent {

    componentDidMount() {
        const loadingExperience = this.props.loadingExperience;
        let FCPArray =[];
        let DCLArray = [];
        loadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS.distributions.map(val => FCPArray.push(val.proportion));
        loadingExperience.metrics.DOM_CONTENT_LOADED_EVENT_FIRED_MS.distributions.map(val => DCLArray.push(val.proportion));

        let myChart = echarts.init(this.refs.demo);
        // 绘制图表
        myChart.setOption({
            tooltip: {
                trigger:'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: ['快速加载', '中速加载','缓慢加载']
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
                label: {
                    normal: {
                        show:true,
                        position: 'insideRight'
                    }
                },
                data: [DCLArray[0],FCPArray[0]]
            },{
                name: 'medium',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show:true,
                        position: 'insideRight'
                    }
                },
                data: [DCLArray[1],FCPArray[1]]
            },{
                name: 'slow',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show:true,
                        position: 'insideRight'
                    }
                },
                data: [DCLArray[2],FCPArray[2] ]
            }]
        });
    }
    render() {
        return(
            <div>
                <Card title="网页加载分布图" bordered={false} style={{ width: '80%',margin:'auto' }}>
                    <div ref="demo" style={{ width: '50%', height: 300 }}/>
                </Card>
                {/*<div className="">*/}

                {/*</div>*/}
            </div>
        )
    }
}