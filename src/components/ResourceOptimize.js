/**
 * Created by Dylanwoo on 2018/5/5.
 */

import React, { PureComponent } from 'react';
import { Tabs } from 'antd';
import { mapLink2Vaule,mapKey2Value,map2toFix,removeLink } from '../utils/utils'
//import './style.less'

const TabPane = Tabs.TabPane;

export default class ResourceOptimize extends PureComponent {
    render() {

        const ruleName = '资源优化';
        let serverTitle,cssTitle,htmlTitle,jsTitle,imgTitle;

        const serverData = this.props.serverData;
        const cssData = this.props.cssData;
        const htmlData = this.props.htmlData;
        const jsData = this.props.jsData;
        const imgData = this.props.imgData;

        const htmlUrl = htmlData.urls ? htmlData.urls:null;
        const jsUrl = jsData.urls ? jsData.urls:null;
        const imgUrl = imgData.urls ? imgData.urls:null;

        const htmlFormat = [];
        const jsFormat = [];
        const imgFormat = [];

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
            htmlTitle = mapKey2Value(htmlData.header.format,htmlData.header.args);
            htmlUrl.map(item => {
                htmlFormat.push(mapKey2Value(item.result.format,item.result.args));
            })
        } else if(cssData.format) {
            htmlTitle = removeLink(cssData.format);
        }

        if(jsData.header&&jsUrl) {
            jsTitle = mapKey2Value(jsData.header.format,jsData.header.args);
            jsUrl.map(item => {
                jsFormat.push(mapKey2Value(item.result.format,item.result.args));
            })
        } else if(jsData.format) {
            jsTitle = removeLink(jsData.format);
        }

        if(imgData.header&&jsUrl) {
            imgTitle = mapKey2Value(imgData.header.format,imgData.header.args);
            imgUrl.map(item => {
                imgFormat.push(mapKey2Value(item.result.format,item.result.args));
            })
        } else if(imgData.format) {
            imgTitle = removeLink(imgData.format);
        }

        return(
            <div>
                <p>{ruleName}</p>
                <div className="optimizeContainer">
                    <Tabs>
                        <TabPane tab="缩短服务响应时间" key="1">
                            <div className="itemWrapper">
                                <p>缩短服务响应时间</p>
                                <p>规则影响：{this.props.serverRuleImpact}</p>
                                <p>{serverTitle}</p>
                            </div>
                        </TabPane>
                        <TabPane tab="缩减CSS" key="2">
                            <div className="itemWrapper">
                                <p>缩减CSS</p>
                                <p>规则影响：{this.props.cssRuleImpact}</p>
                                <p>{cssTitle}</p>
                            </div>
                        </TabPane>
                        <TabPane tab="缩减HTML" key="3">
                            <div className="itemWrapper">
                                <p>缩减HTML</p>
                                <p>规则影响：{map2toFix(this.props.htmlRuleImpact)}</p>
                                <p>{htmlTitle}</p>
                                {htmlFormat.length === 0?
                                    null :
                                    htmlFormat.map(item =>
                                        <p key={htmlFormat.indexOf(item)}>{item}</p>
                                    )
                                }
                            </div>
                        </TabPane>
                        <TabPane tab="缩减JavaScript" key="4">
                            <div className="itemWrapper">
                                <p>缩减JavaScript</p>
                                <p>规则影响：{map2toFix(this.props.jsRuleImpact)}</p>
                                <p>{jsTitle}</p>
                                {jsFormat.length === 0?
                                    null :
                                    jsFormat.map(item =>
                                        <p key={jsFormat.indexOf(item)}>{item}</p>
                                    )
                                }
                            </div>
                        </TabPane>
                        <TabPane tab="图片优化" key="5">
                            <div className="itemWrapper">
                                <p>图片优化</p>
                                <p>规则影响：{map2toFix(this.props.imgRuleImpact)}</p>
                                <p>{imgTitle}</p>
                                {imgFormat.length === 0?
                                    null :
                                    imgFormat.map(item =>
                                        <p key={imgFormat.indexOf(item)}>{item}</p>
                                    )
                                }
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        )
    }
}