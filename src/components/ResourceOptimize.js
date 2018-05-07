/**
 * Created by Dylanwoo on 2018/5/5.
 */

import React, { PureComponent } from 'react';
import { mapLink2Vaule,mapKey2Value,map2toFix,removeLink } from '../utils/utils'


export default class ResourceOptimize extends PureComponent {
    render() {

        const ruleName = '资源优化';
        let serverTitle;
        const serverData = this.props.serverData;

        if(serverData.header) {
            serverTitle = mapKey2Value(serverData.header.format,serverData.header.args);
        } else if(serverData.format) {
            serverTitle = removeLink(serverData.format);
        }


        return(
            <div>
                <p>{ruleName}</p>
                <div className="itemWrapper">
                    <p>缩短服务响应时间</p>
                    <p>规则影响：{this.props.serverRuleImpact}</p>
                    <p>{serverTitle}</p>
                </div>
                <div className="itemWrapper">
                    <p>缩减CSS</p>
                    <p>规则影响：{this.props.cssRuleImpact}</p>
                </div>
                <div className="itemWrapper">
                    <p>缩减HTML</p>
                    <p>规则影响：{this.props.htmlRuleImpact}</p>
                </div>
                <div className="itemWrapper">
                    <p>缩减JavaScript</p>
                    <p>规则影响：{this.props.jsRuleImpact}</p>
                </div>
                <div className="itemWrapper">
                    <p>图片优化</p>
                    <p>规则影响：{this.props.imgRuleImpact}</p>
                </div>
            </div>
        )
    }
}