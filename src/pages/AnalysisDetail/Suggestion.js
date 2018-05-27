/**
 * Created by Dylanwoo on 2018/5/2.
 */

import React, { PureComponent,Component } from 'react';
import Gzip from '../../components/Gzip'
import BrowserCaching from '../../components/BrowserCaching'
import ResourceOptimize from '../../components/ResourceOptimize'
import FirstPaintBlock from '../../components/FirstPaintBlock'

import { Card,Tabs,Icon,Row,Col,Table } from 'antd';
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


        const GzipUrlBlocks = EnableGzipCompression.urlBlocks?extractObject(EnableGzipCompression.urlBlocks):EnableGzipCompression.summary;
        const GzipRuleImpact = EnableGzipCompression.ruleImpact || '无';
        const GzipSummary = EnableGzipCompression.summary.format;

        const BrowserBlocks = LeverageBrowserCaching.urlBlocks?extractObject(LeverageBrowserCaching.urlBlocks):{};
        const BrowserRuleImpact = LeverageBrowserCaching.ruleImpact || '无';
        const BrowserSummary = LeverageBrowserCaching.summary.format;

        const serverRuleImpact = MainResourceServerResponseTime.ruleImpact;
        const serverBlocks = MainResourceServerResponseTime.urlBlocks?extractObject(MainResourceServerResponseTime.urlBlocks):MainResourceServerResponseTime.summary;
        const cssRuleImpact = MinifyCss.ruleImpact || '无';
        const cssBlocks = MinifyCss.urlBlocks?extractObject(MinifyCss.urlBlocks):MinifyCss.summary;

        const htmlRuleImpact = MinifyHTML.ruleImpact || '无';
        const htmlBlocks = MinifyHTML.urlBlocks?extractObject(MinifyHTML.urlBlocks):MinifyHTML.summary;

        const jsRuleImpact = MinifyJavaScript.ruleImpact || '无';
        const jsBlocks = MinifyJavaScript.urlBlocks?extractObject(MinifyJavaScript.urlBlocks):MinifyJavaScript.summary;

        const imgRuleImpact = OptimizeImages.ruleImpact || '无';
        const imgBlocks = OptimizeImages.urlBlocks?extractObject(OptimizeImages.urlBlocks):OptimizeImages.summary;

        const FPBBlcoks = MinimizeRenderBlockingResources.urlBlocks;
        const FPBCSSBlock = FPBBlcoks[1];
        const FPBJSBlock = FPBBlcoks[2];
        const FPBImpact = MinimizeRenderBlockingResources.ruleImpact || '无';
        const FPBSummary = MinimizeRenderBlockingResources.summary;

        const gridStyle = {
            width: '33%',
            textAlign: 'left',
        };

        return (
            <div>
                <div className="pageHeader">
                    <Row>
                        <Col span={8}>
                            <div className="leftContainer">
                                <div className="contentTitle">
                                    <Icon type="dingding" style={{color:'rgb(0, 193, 222,0.5)',fontSize: 45}}/>
                                    <span style={{marginLeft: 5}}>性能优化建议</span>
                                </div>
                                <p className="contentIntro">启用压缩 | 浏览器缓存 | 资源优化 | 首屏阻塞</p>
                            </div>
                        </Col>
                        <Col span={10} />
                        <Col span={6}>
                            <div className="rightContainer">
                                <div style={{width:80,borderRight:'1px solid rgba(0,0,0,0.1)',marginRight:30}}>
                                    <p style={{color:'rgba(0,0,0,.4)',margin:'0 !important'}}>
                                        <Icon type="api" style={{fontSize:22,position:'relative',top:4,left:-9}}/>
                                        资源数
                                    </p>
                                    <p className="number" style={{position:'relative',right:10}}>25,846</p>
                                </div>
                                <div style={{width:80,borderRight:'1px solid rgba(0,0,0,0.1)',marginRight:30}}>
                                    <p style={{color:'rgba(0,0,0,.4)',margin:'0 !important'}}>
                                        <Icon type="clock-circle-o" style={{fontSize:22,position:'relative',top:4,left:-9}}/>
                                        耗时
                                    </p>
                                    <p className="number">1.32s</p>
                                </div>
                                <div style={{width:80}}>
                                    <p style={{color:'rgba(0,0,0,.4)',margin:'0 !important'}}>
                                        <Icon type="ant-design" style={{fontSize:22,position:'relative',top:4,left:-9}}/>
                                        建议数
                                    </p>
                                    <p className="number" style={{position:'relative',left:10}}>68</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="mainContainer">
                    <Row gutter={16}>
                        <Col span={16}>
                            <Card title="浏览器缓存" extra={<a href="#">全部条目</a>}>
                                <p style={{marginLeft:20}}>启用浏览器缓存规则影响: 1.78</p>
                                <Card.Grid style={gridStyle}>
                                    <div style={{wordWrap:'break-word',wordBreak:'normal',color:'rgba(0,0,0,0.8)'}}>
                                        <span style={{fontSize:16,marginRight:5}}>URL:</span>
                                        <span style={{color:'rgb(0, 193, 222)',fontSize:14}}>https://misc.360buyimg.com/mtd/pc/index_2017/2.1.0/chunk/legacy.chunk.js</span>
                                    </div>
                                    <div>调用次数: 1</div>
                                    <div>缓存时间: 15分钟</div>
                                </Card.Grid>
                                <Card.Grid style={gridStyle}>
                                    <div style={{wordWrap:'break-word',wordBreak:'normal',color:'rgba(0,0,0,0.8)'}}>
                                        <span style={{fontSize:16,marginRight:5}}>URL:</span>
                                        <span style={{color:'rgb(0, 193, 222)',fontSize:14}}>https://misc.360buyimg.com/mtd/pc/index_2017/2.1.0/chunk/serviceSprite.chunk.js</span>
                                    </div>
                                    <div>调用次数: 1</div>
                                    <div>缓存时间: 2小时</div>
                                </Card.Grid>
                                <Card.Grid style={gridStyle}>
                                    <div style={{wordWrap:'break-word',wordBreak:'normal',color:'rgba(0,0,0,0.8)'}}>
                                        <span style={{fontSize:16,marginRight:5}}>URL:</span>
                                        <span style={{color:'rgb(0, 193, 222)',fontSize:14}}>https://misc.360buyimg.com/mtd/pc/o2_toolbar/1.0.0/home//js/localStorageObj.js</span>
                                    </div>
                                    <div>调用次数: 2</div>
                                    <div>缓存时间: 10分钟</div>
                                </Card.Grid>
                                <Card.Grid style={gridStyle}>
                                    <div style={{wordWrap:'break-word',wordBreak:'normal',color:'rgba(0,0,0,0.8)'}}>
                                        <span style={{fontSize:16,marginRight:5}}>URL:</span>
                                        <span style={{color:'rgb(0, 193, 222)',fontSize:14}}>https://m.360buyimg.com/babel/jfs/t16960/183/2530397193/100118/8dc16c70/5b03b5e6Nd2a50984.jpg</span>
                                    </div>
                                    <div>调用次数: 4</div>
                                    <div>缓存时间: 0.5小时</div>
                                </Card.Grid>
                                <Card.Grid style={gridStyle}>
                                    <div style={{wordWrap:'break-word',wordBreak:'normal',color:'rgba(0,0,0,0.8)'}}>
                                        <span style={{fontSize:16,marginRight:5}}>URL:</span>
                                        <span style={{color:'rgb(0, 193, 222)',fontSize:14}}>https://m.360buyimg.com/babel/jfs/t16960/183/2530397193/100118/8dc16c70/5b03b5e6Nd2a50984.jpg</span>
                                    </div>
                                    <div>调用次数: 4</div>
                                    <div>缓存时间: 2小时</div>
                                </Card.Grid>
                                <Card.Grid style={gridStyle}>
                                    <div style={{wordWrap:'break-word',wordBreak:'normal',color:'rgba(0,0,0,0.8)'}}>
                                        <span style={{fontSize:16,marginRight:5}}>URL:</span>
                                        <span style={{color:'rgb(0, 193, 222)',fontSize:14}}>https://m.360buyimg.com/babel/jfs/t16960/183/2530397193/100118/8dc16c70/5b03b5e6Nd2a50984.jpg</span>
                                    </div>
                                    <div>调用次数: 4</div>
                                    <div>缓存时间: 12小时</div>
                                </Card.Grid>
                            </Card>
                            <Card style={{marginTop:20}} title="资源优化" extra={<a href="#">全部条目</a>}>
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
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="首屏阻塞" style={{marginBottom:20}}>
                                <FirstPaintBlock
                                    FPBCSSBlock = {FPBCSSBlock}
                                    FPBJSBlock = {FPBJSBlock}
                                    FPBImpact = {FPBImpact}
                                    FPBSummary = {FPBSummary}
                                />
                            </Card>
                            <Card title="启用压缩">
                                <Gzip dataSource={GzipUrlBlocks}
                                    GzipRuleImpact={GzipRuleImpact}
                                    GzipSummary={GzipSummary}
                                />
                            </Card>
                        </Col>
                    </Row>
                </div>
                {/*<Card>*/}
                    {/*<div className="headContainer">*/}
                        {/*<p>着陆页重定向：</p>*/}
                        {/*<p>按优先级排列可见内容：</p>*/}
                    {/*</div>*/}
                    {/*<div className="adviceContainer">*/}
                        {/*<Tabs>*/}
                            {/*<TabPane tab="启用压缩" key="1">*/}
                                {/*<Gzip dataSource={GzipUrlBlocks}*/}
                                      {/*GzipRuleImpact={GzipRuleImpact}*/}
                                      {/*GzipSummary={GzipSummary}*/}
                                {/*/>*/}
                            {/*</TabPane>*/}
                            {/*<TabPane tab="浏览器缓存" key="2">*/}
                                {/*<BrowserCaching*/}
                                    {/*dataSource={BrowserBlocks}*/}
                                    {/*BrowserRuleImpact={BrowserRuleImpact}*/}
                                    {/*BrowserSummary={BrowserSummary}*/}
                                {/*/>*/}
                            {/*</TabPane>*/}
                            {/*<TabPane tab="资源优化" key="3">*/}
                                {/*<ResourceOptimize*/}
                                    {/*serverRuleImpact={serverRuleImpact}*/}
                                    {/*serverData={serverBlocks}*/}
                                    {/*cssRuleImpact={cssRuleImpact}*/}
                                    {/*cssData = {cssBlocks}*/}
                                    {/*htmlImpact={htmlRuleImpact}*/}
                                    {/*htmlData = {htmlBlocks}*/}
                                    {/*jsImpact={jsRuleImpact}*/}
                                    {/*jsData = {jsBlocks}*/}
                                    {/*imgRuleImpact={imgRuleImpact}*/}
                                    {/*imgData = {imgBlocks}*/}
                                {/*/>*/}
                            {/*</TabPane>*/}
                            {/*<TabPane tab="首屏阻塞" key="4">*/}
                                {/*<FirstPaintBlock*/}
                                    {/*FPBCSSBlock = {FPBCSSBlock}*/}
                                    {/*FPBJSBlock = {FPBJSBlock}*/}
                                    {/*FPBImpact = {FPBImpact}*/}
                                    {/*FPBSummary = {FPBSummary}*/}
                                {/*/>*/}
                            {/*</TabPane>*/}
                        {/*</Tabs>*/}
                    {/*</div>*/}
                {/*</Card>*/}
            </div>
        )
    }
}
