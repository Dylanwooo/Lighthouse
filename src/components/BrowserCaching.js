/**
 * Created by Dylanwoo on 2018/5/5.
 */

import React, { PureComponent } from 'react';
import { Table } from 'antd';
import { mapLink2Vaule,mapKey2Value,map2toFix } from '../utils/utils'

export default class BrowserCaching extends PureComponent {
    render() {
        let columns = [];
        let data = [];
        const dataSource = this.props.dataSource;
        const ruleName = '使用浏览器缓存';
        const BrowserSummary = this.props.BrowserSummary;
        const ruleImpact = map2toFix(this.props.BrowserRuleImpact);

        if(dataSource){
            const title = mapLink2Vaule(dataSource.header);
            const urls = dataSource.urls;

            urls.map(item => {
                data.push({
                    key: urls.indexOf(item),
                    value:mapKey2Value(item.result.format,item.result.args)
                });
            });

            columns = [{
                title: title,
                dataIndex: 'value',
                key: 'value'
            }];
        } else {
            data = [{
                key: '1',
                value: '暂无数据'
            }];
            columns = [{
                title: '数据',
                dataIndex: 'value',
                key: 'value'
            }]
        }
        return(
            <div>
                <p>{ruleName}</p>
                <p>启用浏览器缓存影响：{ruleImpact}</p>
                <p>{BrowserSummary}</p>
                <Table columns={columns} dataSource={data} />
            </div>
        )
    }
}