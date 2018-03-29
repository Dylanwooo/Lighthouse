import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom'
 import { map2ColorIndex } from '../../utils/utils'

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
            color: colorText[map2ColorIndex(this.props.speedScore)]
        };
        const scoreStyle = {
            fontSize:22,
            color: colorText[map2ColorIndex(this.props.speedScore)]
        };
        const suffix = this.props.targetSite ? <Icon type="close-circle" onClick={this.props.emitEmpty} /> : null;
        return(
            <div className="contentWrapper">
                <Card>
                    <div className="itemWrapper">
                        <span>测评网址：</span>
                        <div style={{width: '80%'}}>
                            <Input
                                suffix={suffix}
                                value={this.props.targetSite}
                                onChange={this.props.onChangeSite}
                            />
                        </div>
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
                                                            <div style={rankStyle}>{this.props.speedRank}</div>
                                                            <span style={rankStyle}>1.2s</span><Tooltip placement="topLeft" title="从用户请求打开新网页到浏览器呈现出首屏内容所用的时间。"><span style={{cursor: 'pointer',marginRight: 10}}>FCP</span></Tooltip>
                                                            <span style={rankStyle}>1.7s</span><Tooltip placement="topLeft" title="从用户请求打开新网页到浏览器完全呈现出相应网页所用的时间。"><span style={{cursor: 'pointer'}}>DCL</span></Tooltip>
                                                        </div>}
                                                    />
                                                </Card>
                                                <Card>
                                                    <Meta title="优化程度得分" description=
                                                        {<div className="cardItem">
                                                            <div style={scoreStyle}>Good</div>
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
                        <Button onClick={this.props.onEstimate} ghost>开始测评</Button>
                        <Button ghost>
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