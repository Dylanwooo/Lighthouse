import React, { PureComponent } from 'react';
import { Table } from 'antd';
import { mapLink2Vaule,mapKey2Value } from '../utils/utils'

export default class Gzip extends PureComponent {

    render() {

        const dataSource = this.props.dataSource;
        const title = mapLink2Vaule(dataSource.header);
        const urls = dataSource.urls;
        let data = [];

        urls.map(item => {
           data.push({
               key: urls.indexOf(item),
               value:mapKey2Value(item.result.format,item.result.args)
           });
        });

        const columns = [{
            title: title,
            dataIndex: 'value',
            key: 'value'
        }];

        return(
            <div>
                <Table columns={columns} dataSource={data}/>
            </div>
        )
    }
}