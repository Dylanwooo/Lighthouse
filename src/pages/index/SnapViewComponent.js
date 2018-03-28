import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom'

import { Card,Input,Select,Button,Row, Col,Spin,Tooltip,Icon  } from 'antd';
import {language} from "../../asserts/language";
import './pages.less';


const { Meta } = Card;
const Option = Select.Option;
const colorText = ['#06f906','#ffa500','#fb0000'];

const children = [];

for (let i = 0; i <language.length; i++) {
    children.push(<Option key={language[i].key}>{language[i].name}</Option>);
}
export default class SnapViewComponent extends PureComponent {

    render() {
        const rankStyle = {
            fontSize: 22,
            color: colorText[this.props.colorIndex]
        };
        const scoreStyle = {
            fontSize:22,
            color: colorText[this.props.colorIndex]
        };
        return(
            <div className="contentWrapper">
                <Card>
                    <div className="itemWrapper">
                        <span>测评网址：</span>
                        <Input
                            prefix={<Icon type="global" />}
                            value={this.props.targetSite}
                        />
                    </div>
                    <div className="itemWrapper">
                        <span>选择语言：</span>
                        <Select defaultValue="简体中文" onChange={this.handleLangChange}>
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
                                                            <div style={scoreStyle}>Average</div>
                                                            <div>
                                                                1.2s<Tooltip title="从用户请求打开新网页到浏览器呈现出首屏内容所用的时间。"><span>FCP</span></Tooltip>
                                                                1.7s<Tooltip title="从用户请求打开新网页到浏览器完全呈现出相应网页所用的时间。"><span>DCL</span></Tooltip>
                                                            </div>
                                                        </div>}
                                                    />
                                                </Card>
                                                <Card>
                                                    <Meta title="优化程度得分" description=
                                                        {<div className="cardItem">
                                                            <div style={rankStyle}>Good</div>
                                                            <div>89/100</div>
                                                        </div>}
                                                    />
                                                </Card>
                                            </div>
                                        </Col>
                                        <Col span={10}>
                                            <div className="siteDescription">
                                                <Card>
                                                    <Meta title="网页描述" description="小游戏,4399小游戏,小游戏大全,双人小游戏大全 - www.4399.com 中国领先的游戏平台"/>
                                                </Card>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card> : <Spin size="large" />
                            }
                        </div>
                        :  null
                    }
                    <div className="btnWrapper">
                        <Button onClick={this.props.onEstimate} ghost>开始测评</Button>
                        <Button ghost>
                            <Link to="/index">
                            结果详情
                            </Link>
                        </Button>
                        <Button onClick={this.props.onChangeDataLoaded} ghost>切换</Button>
                    </div>
                </Card>
            </div>
        )
    }
}