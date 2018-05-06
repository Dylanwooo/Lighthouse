/**
 * Created by Dylanwoo on 2018/5/5.
 */

import React, { PureComponent } from 'react';
import { mapLink2Vaule,mapKey2Value,map2toFix } from '../utils/utils'


export default class ResourceOptimize extends PureComponent {
    render() {
        const ruleName = '资源优化';
        const serverSummary = this.props.serverSummary;
        const serverFormat = mapKey2Value(serverSummary.format,serverSummary.args);

        return(
            <div>
                <p>{ruleName}</p>
                <div>
                    <p>缩短服务响应时间</p>
                    <p>规则影响：{this.props.serverRuleImpact}</p>
                    <p>{serverFormat}</p>
                </div>
            </div>
        )
    }
}