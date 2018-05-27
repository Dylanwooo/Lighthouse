/**
 * Created by Dylanwoo on 2018/5/5.
 */

import React, { PureComponent } from 'react';
import { mapLink2Vaule,mapKey2Value,map2toFix,removeLink } from '../utils/utils'
import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape } from 'bizcharts';
import { Tabs } from 'antd'
const DataSet = require('@antv/data-set');
const { DataView } = DataSet;
const TabPane = Tabs.TabPane;
export default class FirstPaintBlock extends PureComponent {
    render() {
        const FPBCSSBlock = this.props.FPBCSSBlock;
        const FPBJSBlock = this.props.FPBJSBlock;

        const jsUrl = FPBJSBlock.urls ? FPBJSBlock.urls:null;
        const cssUrl = FPBCSSBlock.urls ? FPBCSSBlock.urls:null;

        let jsTitle, cssTitle;
        const cssFormat = [];
        const jsFormat = [];

        const title = '清除首屏内容中阻止呈现的 JavaScript 和 CSS';
        const ruleImpact = this.props.FPBImpact;
        const FPBSummary = mapKey2Value(this.props.FPBSummary.format,this.props.FPBSummary.args);

        if(FPBJSBlock.header&&jsUrl) {
            jsTitle = mapKey2Value(FPBJSBlock.header.format,FPBJSBlock.header.args);
            jsUrl.map(item => {
                jsFormat.push(mapKey2Value(item.result.format,item.result.args));
            })
        } else if(FPBJSBlock.format) {
            jsTitle = removeLink(FPBJSBlock.format);
        }

        if(FPBCSSBlock.header&&cssUrl) {
            cssTitle = mapKey2Value(FPBCSSBlock.header.format,FPBCSSBlock.header.args);
            cssUrl.map(item => {
                cssFormat.push(mapKey2Value(item.result.format,item.result.args));
            })
        } else if(FPBCSSBlock.format) {
            cssTitle = removeLink(FPBCSSBlock.format);
        }

        const data = [
            { item: '布局树阻塞', JavaScript: 70, CSS: 30 },
            { item: 'DOM构建阻塞', JavaScript: 60, CSS: 70 },
            { item: '首次交互阻塞', JavaScript: 50, CSS: 60 },
            { item: '渲染树阻塞', JavaScript: 40, CSS: 50 },
            { item: '布局阻塞', JavaScript: 60, CSS: 70 },
        ];
        const dv = new DataView().source(data);
        dv.transform({
            type: 'fold',
            fields: [ 'JavaScript', 'CSS' ], // 展开字段集
            key: 'user', // key字段
            value: 'score', // value字段
        });

        const cols = {
            score: {
                min: 0,
                max: 80
            }
        };

        return(
            <div>
                <Tabs>
                    <TabPane tab="阻塞详情" key="1">
                        <div style={{margin: '0 10px 10px 10px'}}>
                            <p>{title}</p>
                            <p>{FPBSummary}</p>
                            <p>规则影响：{ruleImpact}</p>
                            <p>{jsTitle}</p>
                            {jsFormat.length === 0?
                                null :
                                jsFormat.map(item =>
                                    <p key={jsFormat.indexOf(item)}>{item}</p>
                                )
                            }
                            <p>{cssTitle}</p>
                            {cssFormat.length === 0?
                                null :
                                cssFormat.map(item =>
                                    <p key={cssFormat.indexOf(item)}>{item}</p>
                                )
                            }
                        </div>
                    </TabPane>
                    <TabPane tab="阻塞分布图" key="2">
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
                            <Geom type='line' position="item*score" color="user" size={2}/>
                            <Geom type='point' position="item*score" color="user" shape="circle" size={4} style={{stroke: '#fff',
                                lineWidth: 1,
                                fillOpacity: 1}} />
                        </Chart>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}