/**
 * Created by Dylanwoo on 2018/5/5.
 */

import React, { PureComponent } from 'react';
import { Tabs,Table } from 'antd';
import { mapLink2Vaule,mapKey2Value,map2toFix,removeLink } from '../utils/utils'
import './style.less'

const TabPane = Tabs.TabPane;

export default class ResourceOptimize extends PureComponent {
    render() {

        let serverTitle,cssTitle,htmlTitle,jsTitle,imgTitle;

        const serverData = this.props.serverData;
        const cssData = this.props.cssData;
        const htmlData = this.props.htmlData;
        const jsData = this.props.jsData;
        const imgData = this.props.imgData;

        const htmlUrl = htmlData.urls ? htmlData.urls:null;
        const jsUrl = jsData.urls ? jsData.urls:null;
        const imgUrl = imgData.urls ? imgData.urls:null;


        let htmlSource = [];
        let jsSource = [];
        let imgSource = [];

        let htmlCol = [];
        let jsCol = [];
        let imgCol = [];

        if(serverData.header) {
            serverTitle = mapKey2Value(serverData.header.format,serverData.header.args);
        } else if(serverData.format) {
            serverTitle = removeLink(serverData.format);
        }

        if(cssData.header) {
            cssTitle = mapKey2Value(cssData.header.format,cssData.header.args);
        } else if(cssData.format) {
            cssTitle = removeLink(cssData.format);
        }

        if(htmlData.header&&htmlUrl) {
            // htmlTitle = mapKey2Value(htmlData.header.format,htmlData.header.args);
            // htmlUrl.map(item => {
            //     htmlFormat.push(mapKey2Value(item.result.format,item.result.args));
            // })

            const title = mapKey2Value(htmlData.header.format,htmlData.header.args);
            const urls = jsData.urls;

            urls.map(item => {
                htmlSource.push({
                    key: urls.indexOf(item),
                    value:mapKey2Value(item.result.format,item.result.args)
                });
            });

            htmlCol = [{
                title: title,
                dataIndex: 'value',
                key: 'value'
            }];

        } else if(cssData.format) {
            //htmlTitle = removeLink(cssData.format);
            htmlSource = [{
                key: '1',
                value: '暂无数据'
            }];
            htmlCol = [{
                title: '数据',
                dataIndex: 'value',
                key: 'value'
            }]
        }

        if(jsData.header&&jsUrl) {
            // jsTitle = mapKey2Value(jsData.header.format,jsData.header.args);
            // jsUrl.map(item => {
            //     jsFormat.push(mapKey2Value(item.result.format,item.result.args));
            // })

            const title = mapKey2Value(jsData.header.format,jsData.header.args);
            const urls = jsData.urls;

            urls.map(item => {
                jsSource.push({
                    key: urls.indexOf(item),
                    value:mapKey2Value(item.result.format,item.result.args)
                });
            });

            jsCol = [{
                title: title,
                dataIndex: 'value',
                key: 'value'
            }];

        } else if(jsData.format) {
            //jsTitle = removeLink(jsData.format);
            jsSource = [{
                key: '1',
                value: '暂无数据'
            }];
            jsCol = [{
                title: '数据',
                dataIndex: 'value',
                key: 'value'
            }]
        }

        if(imgData.header&&jsUrl) {
            // imgTitle = mapKey2Value(imgData.header.format,imgData.header.args);
            // imgUrl.map(item => {
            //     imgFormat.push(mapKey2Value(item.result.format,item.result.args));
            // })
            const title = mapKey2Value(imgData.header.format,imgData.header.args);
            const urls = imgData.urls;

            urls.map(item => {
                imgSource.push({
                    key: urls.indexOf(item),
                    value:mapKey2Value(item.result.format,item.result.args)
                });
            });

            imgCol = [{
                title: title,
                dataIndex: 'value',
                key: 'value'
            }];

        } else if(imgData.format) {
            //imgTitle = removeLink(imgData.format);

            imgSource = [{
                key: '1',
                value: '暂无数据'
            }];
            imgCol = [{
                title: '数据',
                dataIndex: 'value',
                key: 'value'
            }]
        }

        return(
            <div>
                <div className="optimizeContainer">
                    <Tabs>
                        <TabPane tab="图片优化" key="1">
                            <div className="itemWrapper">
                                <p style={{marginLeft:20}}>规则影响：{map2toFix(this.props.imgRuleImpact)}</p>
                                {/*<p>{imgTitle}</p>*/}
                                {/*{imgFormat.length === 0?*/}
                                    {/*null :*/}
                                    {/*imgFormat.map(item =>*/}
                                        {/*<p key={imgFormat.indexOf(item)}>{item}</p>*/}
                                    {/*)*/}
                                {/*}*/}
                                <Table columns={imgCol} dataSource={imgSource}/>
                            </div>
                        </TabPane>
                        <TabPane tab="缩减CSS" key="2">
                            <div className="itemWrapper">
                                <p style={{marginLeft:20}}>规则影响：{this.props.cssRuleImpact}</p>
                                <p style={{marginLeft:20}}>{cssTitle}</p>
                            </div>
                        </TabPane>
                        <TabPane tab="缩减HTML" key="3">
                            <div className="itemWrapper">
                                <p style={{marginLeft:20}}>规则影响：{map2toFix(this.props.htmlRuleImpact)}</p>
                                <p>{htmlTitle}</p>
                                {/*{htmlFormat.length === 0?*/}
                                    {/*null :*/}
                                    {/*htmlFormat.map(item =>*/}
                                        {/*<p key={htmlFormat.indexOf(item)}>{item}</p>*/}
                                    {/*)*/}
                                {/*}*/}
                                <Table columns={htmlCol} dataSource={htmlSource}/>
                            </div>
                        </TabPane>
                        <TabPane tab="缩减JavaScript" key="4">
                            <div className="itemWrapper">
                                <p style={{marginLeft:20}}>规则影响：{map2toFix(this.props.jsRuleImpact)}</p>
                                {/*<p>{jsTitle}</p>*/}
                                {/*{jsFormat.length === 0?*/}
                                    {/*null :*/}
                                    {/*jsFormat.map(item =>*/}
                                        {/*<p key={jsFormat.indexOf(item)}>{item}</p>*/}
                                    {/*)*/}
                                {/*}*/}
                                <Table columns={jsCol} dataSource={jsSource}/>
                            </div>
                        </TabPane>
                        <TabPane tab="缩短服务响应时间" key="5">
                            <div className="itemWrapper">
                                <p style={{marginLeft:20}}>规则影响：{this.props.serverRuleImpact}</p>
                                <p style={{marginLeft:20}}>{serverTitle}</p>
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        )
    }
}