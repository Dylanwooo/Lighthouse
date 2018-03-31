import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom'
 import { map2ColorIndex,map2OptimizeRank,map2RankColor } from '../../utils/utils'

import { Card,Input,Select,Button,Row, Col,Spin,Tooltip,Icon,AutoComplete   } from 'antd';
import {language} from "../../asserts/language";
import './pages.less';


const { Meta } = Card;
const Option = Select.Option;
const colorText = ['#06f906','#ffa500','#fb0000'];
const children = [];

for (let i = 0; i <language.length; i++) {
    children.push(<Option key={language[i].key}>{language[i].name}</Option>);
}

function onSelect(value) {
    console.log('onSelect', value);
}
export default class SnapViewComponent extends PureComponent {

    handleSearch = (value) => {
        this.setState({
            dataSource: !value ? [] : [
                value,
                value + value,
                value + value + value,
            ],
        });
    };

    render() {
        const rankStyle = {
            fontSize: 22,
            marginRight: 5,
            color: colorText[map2RankColor(this.props.speedRank)]
        };
        const scoreStyle = {
            fontSize:22,
            color: colorText[map2ColorIndex(this.props.speedScore)]
        };
        return(
            <div className="contentWrapper">
                <Card>
                    <div className="itemWrapper">
                        <span>测评网址：</span>
                        <div style={{width: '80%'}}>
                            {/*<AutoComplete*/}
                                {/*placeholder="输入测评网址"*/}
                                {/*dataSource={this.props.siteSource}*/}
                                {/*allowClear={true}*/}
                                {/*value={this.props.targetSite}*/}
                                {/*onChange={this.props.onChangeSite}*/}
                                {/*onSelect={onSelect}*/}
                                {/*onSearch={this.handleSearch}*/}
                            {/*/>*/}
                            <Input
                                size="large"
                                placeholder="输入测评网址"
                                value = {this.props.targetSite}
                                onChange={this.props.onChangeSite}
                            />
                        </div>
                    </div>
                    <div className="itemWrapper">
                        <span>选择语言：</span>
                        <Select defaultValue="简体中文" onSelect={this.props.handleLangChange} allowClea={true} size="large">
                            {children}
                        </Select>
                    </div>
                    { this.props.snapViewVisible?
                        <div className="snapViewWrapper">
                            {this.props.dataLoaded ?
                                <Card>
                                    <Row gutter={150}>
                                        <Col span={14}>
                                            <div className="scoreWrapper">
                                                <Card>
                                                    <Meta title="速度得分" description=
                                                        {<div className="cardItem">
                                                            <div style={rankStyle}>{this.props.speedRank}</div>
                                                            <span style={rankStyle}>{parseInt(this.props.FCP)/1000}s</span>
                                                            <Tooltip placement="topLeft" title="首屏加载时间">
                                                                <span style={{cursor: 'pointer',marginRight: 20}}>FCP</span>
                                                            </Tooltip>
                                                            <span style={rankStyle}>{parseInt(this.props.DCL)/1000}s</span>
                                                            <Tooltip placement="topLeft" title="完整网页加载时间">
                                                                <span style={{cursor: 'pointer'}}>DCL</span>
                                                            </Tooltip>
                                                        </div>}
                                                    />
                                                </Card>
                                                <Card>
                                                    <Meta title="优化程度得分" description=
                                                        {<div className="cardItem">
                                                            <div style={scoreStyle}>{map2OptimizeRank(this.props.speedScore)}</div>
                                                            <span style={scoreStyle}>{this.props.speedScore}</span><span>/100</span>
                                                        </div>}
                                                    />
                                                </Card>
                                            </div>
                                        </Col>
                                        <Col span={10}>
                                            <div className="siteDescription">
                                                <Card>
                                                    <Meta title="网页描述" description={this.props.siteDescription} />
                                                </Card>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card> :
                                <Spin size="large" />
                            }
                        </div>
                        :  null
                    }
                    <div className="btnWrapper">
                        <Button size="large" onClick={this.props.onEstimate} ghost>开始测评</Button>
                        <Button size="large" ghost>
                            <Link to="/index">
                            结果详情
                            </Link>
                        </Button>
                    </div>
                </Card>
            </div>
        )
    }
}
