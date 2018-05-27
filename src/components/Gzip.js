import React, { PureComponent } from 'react';
import { Table } from 'antd';
import { mapLink2Vaule,mapKey2Value,map2toFix } from '../utils/utils'

export default class Gzip extends PureComponent {

    render() {
        let columns = [];
        let data = [];
        const dataSource = this.props.dataSource
        const ruleImpact = map2toFix(this.props.GzipRuleImpact);
        const ruleName = '启用压缩';
        const GzipSummary = this.props.GzipSummary;

        if(dataSource.header) {
            const title = mapKey2Value(dataSource.header.format,dataSource.header.args);
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

        } else if(dataSource.format) {
            //title = removeLink(dataSource.format);
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
                <p>启用压缩规则影响：{ruleImpact}</p>
                <p>{GzipSummary}</p>
                <Table columns={columns} dataSource={data}/>
            </div>
        )
    }
}