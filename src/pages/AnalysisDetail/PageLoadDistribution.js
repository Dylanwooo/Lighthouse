import React, { PureComponent } from 'react';
import { Card,Row,Col,Tooltip,Icon } from 'antd';
import { map2Percetage,map2toFix } from '../../utils/utils';
import { Chart, Geom, Axis, Coord, Label, Legend, View, Guide, Shape } from "bizcharts";
import './AnalysisDetail.less'

const { Meta } = Card;
const DataSet = require('@antv/data-set');


let FCPArray =[];
let DCLArray = [];
let DCLminArray = [];
let DCLmaxArray = [];
let FCPminArray = [];
let FCPmaxArray = [];


export default class PageLoadDistribution extends PureComponent {

    componentWillMount() {
        const loadingExperience = this.props.loadingExperience;
        if(loadingExperience){
            loadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS.distributions.map(val => FCPArray.push(val.proportion));
            loadingExperience.metrics.DOM_CONTENT_LOADED_EVENT_FIRED_MS.distributions.map(val => DCLArray.push(val.proportion));

            loadingExperience.metrics.DOM_CONTENT_LOADED_EVENT_FIRED_MS.distributions.map(val => DCLminArray.push(val.min));
            loadingExperience.metrics.DOM_CONTENT_LOADED_EVENT_FIRED_MS.distributions.map(val => DCLmaxArray.push(val.max));
            loadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS.distributions.map(val => FCPminArray.push(val.min));
            loadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS.distributions.map(val => FCPmaxArray.push(val.max));
        }
    }

    componentDidMount() {

    }

    render() {

        const fastTextFCP = '此网页中'+map2Percetage(FCPArray[0])+'加载的First Contentful Paint属于快速';
        const fastTextDCL = '此网页中'+map2Percetage(DCLArray[0])+'加载的DOM Content Loaded属于快速';
        const mediumTextFCP = '此网页中'+map2Percetage(FCPArray[1])+'加载的First Contentful Paint属于中等';
        const mediumTextDCL = '此网页中'+map2Percetage(DCLArray[1])+'加载的DOM Content Loaded属于中等';
        const slowTextFCP = '此网页中'+map2Percetage(FCPArray[2])+'加载的First Contentful Paint属于快速';
        const slowTextDCL = '此网页中'+map2Percetage(DCLArray[2])+'加载的DOM Content Loaded属于快速';

        //card
        const { DataView } = DataSet;
        const { Html } = Guide;
        const DCLfast = [
            { item: '事例一', count: DCLArray[0]*100 },
            { item: '事例二', count: 100-DCLArray[0]*100 },
        ];
        const DCLmedium = [
            { item: '事例一', count: DCLArray[1]*100 },
            { item: '事例二', count: 100-DCLArray[1]*100 },
        ];
        const DCLslow = [
            { item: '事例一', count: DCLArray[2]*100 },
            { item: '事例二', count: 100-DCLArray[2]*100 },
        ];

        const FCPfast = [
            { item: '事例一', count: FCPArray[0]*100 },
            { item: '事例二', count: 100-FCPArray[0]*100 },
        ];
        const FCPmedium = [
            { item: '事例一', count: FCPArray[1]*100 },
            { item: '事例二', count: 100-FCPArray[1]*100 },
        ];
        const FCPslow = [
            { item: '事例一', count: FCPArray[2]*100 },
            { item: '事例二', count: 100-FCPArray[2]*100 },
        ];

        const DCLFastdv = new DataView();
        const DCLMediumdv = new DataView();
        const DCLSlowdv = new DataView();
        const FCPFastdv = new DataView();
        const FCPMediumdv = new DataView();
        const FCPSlowdv = new DataView();

        DCLFastdv.source(DCLfast).transform({
            type: 'percent',
            field: 'count',
            dimension: 'item',
            as: 'percent'
        });
        DCLMediumdv.source(DCLmedium).transform({
            type: 'percent',
            field: 'count',
            dimension: 'item',
            as: 'percent'
        });
        DCLSlowdv.source(DCLslow).transform({
            type: 'percent',
            field: 'count',
            dimension: 'item',
            as: 'percent'
        });

        FCPFastdv.source(FCPfast).transform({
            type: 'percent',
            field: 'count',
            dimension: 'item',
            as: 'percent'
        });
        FCPMediumdv.source(FCPmedium).transform({
            type: 'percent',
            field: 'count',
            dimension: 'item',
            as: 'percent'
        });
        FCPSlowdv.source(FCPslow).transform({
            type: 'percent',
            field: 'count',
            dimension: 'item',
            as: 'percent'
        });

        const cols = {
            percent: {
                formatter: val => {
                    val = (val * 100) + '%';
                    return val;
                }
            }
        };

        return(
            <div className="outsiderWrapper">
                {/*<div className="wrapper">*/}
                    {/*<div className="cardGroupWrapper">*/}
                        {/*<p style={{fontSize: 16}}>DCL加载</p>*/}
                        {/*<Card title="快速" style={{width:200,background:'#4EEE94'}}*/}
                              {/*bordered={false} hoverable={true}*/}
                              {/*extra={<Tooltip title={fastTextDCL} placement="bottomRight"><span className="moreDetail">More</span></Tooltip>}*/}
                        {/*>*/}
                            {/*<Meta title={<div>{map2Percetage(DCLArray[0])}</div>} description=*/}
                                {/*{<div>*/}
                                    {/*<span className="cardContentItem">min:{DCLminArray[0]}</span>*/}
                                    {/*<span className="cardContentItem">max:{DCLmaxArray[0]}</span>*/}
                                {/*</div>}*/}
                            {/*/>*/}
                        {/*</Card>*/}
                        {/*<Card title="中速" style={{width:200,background:'#FFD700'}}*/}
                              {/*bordered={false}*/}
                              {/*hoverable={true}*/}
                              {/*extra={<Tooltip title={mediumTextDCL} placement="bottomRight"><span className="moreDetail">More</span></Tooltip>}*/}
                        {/*>*/}
                            {/*<Meta title={<div>{map2Percetage(DCLArray[1])}</div>} description=*/}
                                {/*{<div>*/}
                                    {/*<span className="cardContentItem">min:{DCLminArray[1]}</span>*/}
                                    {/*<span className="cardContentItem">max:{DCLmaxArray[1]}</span>*/}
                                {/*</div>}*/}
                            {/*/>*/}
                        {/*</Card>*/}
                        {/*<Card title="慢速" style={{width:200,background:'#FF6A6A'}}*/}
                              {/*bordered={false}*/}
                              {/*hoverable={true}*/}
                              {/*extra={<Tooltip title={slowTextDCL} placement="bottomRight"><span className="moreDetail">More</span></Tooltip>}*/}
                        {/*>*/}
                            {/*<Meta title={<div>{map2Percetage(DCLArray[2])}</div>} description=*/}
                                {/*{<div>*/}
                                    {/*<span className="cardContentItem">min:{DCLminArray[2]}</span>*/}
                                {/*</div>}*/}
                            {/*/>*/}
                        {/*</Card>*/}
                <div style={{margin:20}}>
                    <Row gutter={48}>
                        <Col span={12}>
                            <p style={{fontSize: 16}}>DCL加载</p>
                            <Row gutter={16}>
                                <Col span={8}>
                                    <Card title="快速"
                                          extra={<Tooltip title={fastTextDCL} placement="bottomRight"><Icon type="info-circle-o" /></Tooltip> }
                                          hoverable={true}
                                    >
                                        <Chart height={100} data={DCLFastdv} scale={cols} padding={[-15,20,0,5]} forceFit>
                                            <Coord type={'theta'} radius={0.75} innerRadius={0.6} />
                                            <Axis  name="percent"/>
                                            {/*<Guide >*/}
                                                {/*<Html position ={[ '50%', '50%' ]} html='<div style="color:#8c8c8c;font-size:1.16em;text-align: center;width: 10em;">主机<br><span style="color:#262626;font-size:2.5em">200</span>台</div>' alignX='middle' alignY='middle'/>*/}
                                            {/*</Guide>*/}
                                            <Geom
                                                type="intervalStack"
                                                position="percent"
                                                color={['item', ['#2ECC71', '#f0f2f5']]}
                                                tooltip={['item*percent',(item, percent) => {
                                                    percent = percent * 100 + '%';
                                                    return {
                                                        name: item,
                                                        value: percent
                                                    };
                                                }]}
                                                style={{lineWidth: 1,stroke: '#fff'}}
                                            >
                                            </Geom>
                                        </Chart>
                                    </Card>
                                </Col>
                                <Col span={8}>
                                    <Card title="中速"
                                          extra={<Tooltip title={mediumTextDCL} placement="bottomRight"><Icon type="info-circle-o" /></Tooltip> }
                                          hoverable={true}
                                    >
                                        <Chart height={100} data={DCLMediumdv} scale={cols} padding={[-15,20,0,5]} forceFit>
                                            <Coord type={'theta'} radius={0.75} innerRadius={0.6} />
                                            <Axis  name="percent"/>
                                            {/*<Guide >*/}
                                            {/*<Html position ={[ '50%', '50%' ]} html='<div style="color:#8c8c8c;font-size:1.16em;text-align: center;width: 10em;">主机<br><span style="color:#262626;font-size:2.5em">200</span>台</div>' alignX='middle' alignY='middle'/>*/}
                                            {/*</Guide>*/}
                                            <Geom
                                                type="intervalStack"
                                                position="percent"
                                                color={['item', ['#F1C40F', '#f0f2f5']]}
                                                tooltip={['item*percent',(item, percent) => {
                                                    percent = percent * 100 + '%';
                                                    return {
                                                        name: item,
                                                        value: percent
                                                    };
                                                }]}
                                                style={{lineWidth: 1,stroke: '#fff'}}
                                            >
                                            </Geom>
                                        </Chart>
                                    </Card>
                                </Col>
                                <Col span={8}>
                                    <Card title="慢速"
                                          extra={<Tooltip title={slowTextDCL} placement="bottomRight"><Icon type="info-circle-o" /></Tooltip> }
                                          hoverable={true}
                                    >
                                        <Chart height={100} data={DCLSlowdv} scale={cols} padding={[-15,20,0,5]} forceFit>
                                            <Coord type={'theta'} radius={0.75} innerRadius={0.6} />
                                            <Axis  name="percent"/>
                                            {/*<Guide >*/}
                                            {/*<Html position ={[ '50%', '50%' ]} html='<div style="color:#8c8c8c;font-size:1.16em;text-align: center;width: 10em;">主机<br><span style="color:#262626;font-size:2.5em">200</span>台</div>' alignX='middle' alignY='middle'/>*/}
                                            {/*</Guide>*/}
                                            <Geom
                                                type="intervalStack"
                                                position="percent"
                                                color={['item', ['#F1948A', '#f0f2f5']]}
                                                tooltip={['item*percent',(item, percent) => {
                                                    percent = percent * 100 + '%';
                                                    return {
                                                        name: item,
                                                        value: percent
                                                    };
                                                }]}
                                                style={{lineWidth: 1,stroke: '#fff'}}
                                            >
                                            </Geom>
                                        </Chart>
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={12}>
                            <p style={{fontSize: 16}}>FCP加载</p>
                            <Row gutter={16}>
                                <Col span={8}>
                                    <Card title="快速"
                                          extra={<Tooltip title={fastTextFCP} placement="bottomRight"><Icon type="info-circle-o" /></Tooltip> }
                                          hoverable={true}
                                    >
                                        <Chart height={100} data={FCPFastdv} scale={cols} padding={[-15,20,0,5]} forceFit>
                                            <Coord type={'theta'} radius={0.75} innerRadius={0.6} />
                                            <Axis  name="percent"/>
                                            {/*<Guide >*/}
                                            {/*<Html position ={[ '50%', '50%' ]} html='<div style="color:#8c8c8c;font-size:1.16em;text-align: center;width: 10em;">主机<br><span style="color:#262626;font-size:2.5em">200</span>台</div>' alignX='middle' alignY='middle'/>*/}
                                            {/*</Guide>*/}
                                            <Geom
                                                type="intervalStack"
                                                position="percent"
                                                color={['item', ['#2ECC71', '#f0f2f5']]}
                                                tooltip={['item*percent',(item, percent) => {
                                                    percent = percent * 100 + '%';
                                                    return {
                                                        name: item,
                                                        value: percent
                                                    };
                                                }]}
                                                style={{lineWidth: 1,stroke: '#fff'}}
                                            >
                                            </Geom>
                                        </Chart>
                                    </Card>
                                </Col>
                                <Col span={8}>
                                    <Card title="中速"
                                          extra={<Tooltip title={mediumTextFCP} placement="bottomRight"><Icon type="info-circle-o" /></Tooltip> }
                                          hoverable={true}
                                    >
                                        <Chart height={100} data={FCPMediumdv} scale={cols} padding={[-15,20,0,5]} forceFit>
                                            <Coord type={'theta'} radius={0.75} innerRadius={0.6} />
                                            <Axis  name="percent"/>
                                            {/*<Guide >*/}
                                            {/*<Html position ={[ '50%', '50%' ]} html='<div style="color:#8c8c8c;font-size:1.16em;text-align: center;width: 10em;">主机<br><span style="color:#262626;font-size:2.5em">200</span>台</div>' alignX='middle' alignY='middle'/>*/}
                                            {/*</Guide>*/}
                                            <Geom
                                                type="intervalStack"
                                                position="percent"
                                                color={['item',['#F1C40F', '#f0f2f5']]}
                                                tooltip={['item*percent',(item, percent) => {
                                                    percent = percent * 100 + '%';
                                                    return {
                                                        name: item,
                                                        value: percent
                                                    };
                                                }]}
                                                style={{lineWidth: 1,stroke: '#fff'}}
                                            >
                                            </Geom>
                                        </Chart>
                                    </Card>
                                </Col>
                                <Col span={8}>
                                    <Card title="慢速"
                                          extra={<Tooltip title={slowTextFCP} placement="bottomRight"><Icon type="info-circle-o" /></Tooltip> }
                                          hoverable={true}
                                    >
                                        <Chart height={100} data={FCPSlowdv} scale={cols} padding={[-15,20,0,5]} forceFit>
                                            <Coord type={'theta'} radius={0.75} innerRadius={0.6} />
                                            <Axis  name="percent"/>
                                            {/*<Guide >*/}
                                            {/*<Html position ={[ '50%', '50%' ]} html='<div style="color:#8c8c8c;font-size:1.16em;text-align: center;width: 10em;">主机<br><span style="color:#262626;font-size:2.5em">200</span>台</div>' alignX='middle' alignY='middle'/>*/}
                                            {/*</Guide>*/}
                                            <Geom
                                                type="intervalStack"
                                                position="percent"
                                                color={['item',['#F1948A', '#f0f2f5']]}
                                                tooltip={['item*percent',(item, percent) => {
                                                    percent = percent * 100 + '%';
                                                    return {
                                                        name: item,
                                                        value: percent
                                                    };
                                                }]}
                                                style={{lineWidth: 1,stroke: '#fff'}}
                                            >
                                            </Geom>
                                        </Chart>
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
                    {/*</div>*/}
                    {/*<div className="cardGroupWrapper">*/}
                        {/*<p style={{fontSize: 16}}>FCP加载</p>*/}
                        {/*<Card title="快速" style={{width:200,background:'#4EEE94'}}*/}
                              {/*bordered={false}*/}
                              {/*hoverable={true}*/}
                              {/*extra={<Tooltip title={fastTextFCP} placement="bottomRight"><span className="moreDetail">More</span></Tooltip>}*/}
                        {/*>*/}
                            {/*<Meta title={<div>{map2Percetage(FCPArray[0])}</div>} description=*/}
                                {/*{<div>*/}
                                    {/*<span className="cardContentItem">min:{FCPminArray[0]}</span>*/}
                                    {/*<span className="cardContentItem">max:{FCPmaxArray[0]}</span>*/}
                                {/*</div>}*/}
                            {/*/>*/}
                        {/*</Card>*/}
                        {/*<Card title="中速" style={{width:200,background:'#FFD700'}}*/}
                              {/*bordered={false}*/}
                              {/*hoverable={true}*/}
                              {/*extra={<Tooltip title={mediumTextFCP} placement="bottomRight"><span className="moreDetail">More</span></Tooltip>}*/}
                        {/*>*/}
                            {/*<Meta title={<div>{map2Percetage(FCPArray[1])}</div>} description=*/}
                                {/*{<div>*/}
                                    {/*<span className="cardContentItem">min:{FCPminArray[1]}</span>*/}
                                    {/*<span className="cardContentItem">max:{FCPmaxArray[1]}</span>*/}
                                {/*</div>}*/}
                            {/*/>*/}
                        {/*</Card>*/}
                        {/*<Card title="慢速" style={{width:200,background:'#FF6A6A'}}*/}
                              {/*bordered={false}*/}
                              {/*hoverable={true}*/}
                              {/*extra={<Tooltip title={slowTextFCP} placement="bottomRight"><span className="moreDetail">More</span></Tooltip>}*/}
                        {/*>*/}
                            {/*<Meta title={<div>{map2Percetage(FCPArray[2])}</div>} description=*/}
                                {/*{<div>*/}
                                    {/*<span className="cardContentItem">min:{FCPminArray[2]}</span>*/}
                                {/*</div>}*/}
                            {/*/>*/}
                        {/*</Card>*/}
                    {/*</div>*/}
                {/*</div>*/}
                <div className="wrapper">
                    <div className="cardGroupWrapper">
                        <Card bordered={false} bodyStyle={{padding:0,width:620}}>
                            <div ref="disBar" style={{width:'100%',height:500}} />

                        </Card>
                    </div>
                    <div className="cardGroupWrapper">
                        <Card bordered={false} bodyStyle={{padding:0,width:620}}>
                            <div ref="disPie" style={{width:'100%',height:500}} />
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}