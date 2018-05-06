/**
 * Created by Dylanwoo on 2018/5/5.
 */

import React, { PureComponent } from 'react';

export default class ResourceOptimize extends PureComponent {
    render() {
        const ruleName = '资源优化';

        return(
            <div>
                <p>{ruleName}</p>
                <div>
                    <p>缩短服务响应时间</p>
                    <p>规则影响：{}</p>
                </div>
            </div>
        )
    }
}