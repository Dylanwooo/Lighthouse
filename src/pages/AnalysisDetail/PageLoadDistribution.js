import React, { PureComponent } from 'react';
import { Card } from 'antd';

import echarts from 'echarts';
import  'echarts/lib/chart/bar';

export default class PageLoadDistribution extends PureComponent {

    componentDidMount() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(this.refs.demo);
        // 绘制图表
        myChart.setOption({
            title: { text: 'ECharts 入门示例' },
            tooltip: {},
            xAxis: {
                data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        });
    }
    render() {
        const loadingExperience = this.props.loadingExperience;
        console.log();
        return(
            <div>
                <Card title="网页加载分布图" bordered={false} style={{ width: '80%',margin:'auto' }}>
                    <div ref="demo" style={{ width: 400, height: 400 }}/>
                </Card>
            </div>
        )
    }
}