import React, { PureComponent } from 'react';
import { Card } from 'antd';

export default class PageLoadDistribution extends PureComponent {

    render() {
        const loadingExperience = this.props.loadingExperience;
        return(
            <div>
                <Card title="网页加载分布图" bordered={false} style={{ width: '80%',margin:'auto' }}>

                </Card>
            </div>
        )
    }
}