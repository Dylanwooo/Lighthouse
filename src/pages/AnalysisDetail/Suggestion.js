/**
 * Created by Dylanwoo on 2018/5/2.
 */

import React, { PureComponent,Component } from 'react';
import Gzip from '../../components/Gzip'
import BrowserCaching from '../../components/BrowserCaching'
import ResourceOptimize from '../../components/ResourceOptimize'
import FirstPaintBlock from '../../components/FirstPaintBlock'

import { Card,Tabs } from 'antd';
import { mapKey2Value,extractObject,mapLink2Vaule } from '../../utils/utils'
import './AnalysisDetail.less'

const rRuleImpact = [];  //规则影响
const TabPane = Tabs.TabPane;

export default class Suggestion extends Component {

    state = {
        AvoidLandingPageRedirects: {},
        EnableGzipCompression: {},
        LeverageBrowserCaching: {},
        MainResourceServerResponseTime: {},
        MinifyCss: {},
        MinifyHTML: {},
        MinifyJavaScript: {},
        MinimizeRenderBlockingResources: {},
        OptimizeImages: {},
        PrioritizeVisibleContent: {}
    };

    componentWillMount() {
        console.log(this.props.formattedResults);
        if(this.props.formattedResults) {
            this.setState({
                AvoidLandingPageRedirects: this.props.formattedResults.ruleResults.AvoidLandingPageRedirects, //避免使用着陆页重定向
                EnableGzipCompression: this.props.formattedResults.ruleResults.EnableGzipCompression, //启用压缩
                LeverageBrowserCaching: this.props.formattedResults.ruleResults.LeverageBrowserCaching,  //使用浏览器缓存
                MainResourceServerResponseTime: this.props.formattedResults.ruleResults.MainResourceServerResponseTime, //缩短服务器响应时间
                MinifyCss: this.props.formattedResults.ruleResults.MinifyCss, //缩减CSS
                MinifyHTML: this.props.formattedResults.ruleResults.MinifyHTML,   //缩减 HTML
                MinifyJavaScript: this.props.formattedResults.ruleResults.MinifyJavaScript,  //缩减 JavaScript
                MinimizeRenderBlockingResources: this.props.formattedResults.ruleResults.MinimizeRenderBlockingResources, //清除首屏内容中阻止呈现的 JavaScript 和 CSS
                OptimizeImages: this.props.formattedResults.ruleResults.OptimizeImages,    //优化图片
                PrioritizeVisibleContent: this.props.formattedResults.ruleResults.PrioritizeVisibleContent,  //按优先级排列可见内容
            })
        }
    }

    render() {
        const {
            AvoidLandingPageRedirects,
            EnableGzipCompression,
            LeverageBrowserCaching,
            MainResourceServerResponseTime,
            MinifyCss,
            MinifyHTML,
            MinifyJavaScript,
            MinimizeRenderBlockingResources,
            OptimizeImages,
            PrioritizeVisibleContent
        } = this.state;


        const GzipUrlBlocks = EnableGzipCompression.urlBlocks?extractObject(EnableGzipCompression.urlBlocks):{};
        const GzipRuleImpact = EnableGzipCompression.ruleImpact;
        const GzipSummary = EnableGzipCompression.summary.format;

        const BrowserBlocks = LeverageBrowserCaching.urlBlocks?extractObject(LeverageBrowserCaching.urlBlocks):{};
        const BrowserRuleImpact = LeverageBrowserCaching.ruleImpact;
        const BrowserSummary = LeverageBrowserCaching.summary.format;

        const serverRuleImpact = MainResourceServerResponseTime.ruleImpact;
        const serverBlocks = MainResourceServerResponseTime.urlBlocks?extractObject(MainResourceServerResponseTime.urlBlocks):MainResourceServerResponseTime.summary;
        const cssRuleImpact = MinifyCss.ruleImpact;
        const cssBlocks = MinifyCss.urlBlocks?extractObject(MinifyCss.urlBlocks):MinifyCss.summary;

        const htmlRuleImpact = MinifyHTML.ruleImpact;
        const htmlBlocks = MinifyHTML.urlBlocks?extractObject(MinifyHTML.urlBlocks):MinifyHTML.summary;

        const jsRuleImpact = MinifyJavaScript.ruleImpact;
        const jsBlocks = MinifyJavaScript.urlBlocks?extractObject(MinifyJavaScript.urlBlocks):MinifyJavaScript.summary;

        const imgRuleImpact = OptimizeImages.ruleImpact;
        const imgBlocks = OptimizeImages.urlBlocks?extractObject(OptimizeImages.urlBlocks):OptimizeImages.summary;

        const FPBBlcoks = MinimizeRenderBlockingResources.urlBlocks;
        const FPBCSSBlock = FPBBlcoks[1];
        const FPBJSBlock = FPBBlcoks[2];
        const FPBImpact = MinimizeRenderBlockingResources.ruleImpact;
        const FPBSummary = MinimizeRenderBlockingResources.summary;
        return (
            <div>
                {/*<div>避免使用着落页重定向:<span>{mapKey2Value(format,args)}</span></div>*/}
                {/*{extractObject(value).header.format}*/}
                <Card>
                    <div className="headContainer">
                        <p>着陆页重定向：</p>
                        <p>按优先级排列可见内容：</p>
                    </div>
                    <div className="adviceContainer">
                        <Tabs>
                            <TabPane tab="启用压缩" key="1">
                                <Gzip dataSource={GzipUrlBlocks}
                                      GzipRuleImpact={GzipRuleImpact}
                                      GzipSummary={GzipSummary}
                                />
                            </TabPane>
                            <TabPane tab="浏览器缓存" key="2">
                                <BrowserCaching
                                    dataSource={BrowserBlocks}
                                    BrowserRuleImpact={BrowserRuleImpact}
                                    BrowserSummary={BrowserSummary}
                                />
                            </TabPane>
                            <TabPane tab="资源优化" key="3">
                                <ResourceOptimize
                                    serverRuleImpact={serverRuleImpact}
                                    serverData={serverBlocks}
                                    cssRuleImpact={cssRuleImpact}
                                    cssData = {cssBlocks}
                                    htmlImpact={htmlRuleImpact}
                                    htmlData = {htmlBlocks}
                                    jsImpact={jsRuleImpact}
                                    jsData = {jsBlocks}
                                    imgRuleImpact={imgRuleImpact}
                                    imgData = {imgBlocks}
                                />
                            </TabPane>
                            <TabPane tab="首屏阻塞" key="4">
                                <FirstPaintBlock
                                    FPBCSSBlock = {FPBCSSBlock}
                                    FPBJSBlock = {FPBJSBlock}
                                    FPBImpact = {FPBImpact}
                                    FPBSummary = {FPBSummary}
                                />
                            </TabPane>
                        </Tabs>
                    </div>
                </Card>
            </div>
        )
    }
}
