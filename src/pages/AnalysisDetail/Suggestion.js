/**
 * Created by Dylanwoo on 2018/5/2.
 */

import React, { PureComponent,Component } from 'react';

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
                EnableGzipCompression: this.props.formattedResults.ruleResults.AvoidLandingPageRedirects, //启用压缩
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
        

        return (
            <div>
                <div>避免使用着落页重定向:<span>{format}</span></div>
            </div>
        )
    }
}
