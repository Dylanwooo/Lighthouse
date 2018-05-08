/**
 * Created by Dylanwoo on 2018/5/5.
 */

import React, { PureComponent } from 'react';
import { mapLink2Vaule,mapKey2Value,map2toFix,removeLink } from '../utils/utils'

export default class FirstPaintBlock extends PureComponent {
    render() {
        const FPBCSSBlock = this.props.FPBCSSBlock;
        const FPBJSBlock = this.props.FPBJSBlock;

        const jsUrl = FPBJSBlock.urls ? FPBJSBlock.urls:null;
        const cssUrl = FPBCSSBlock.urls ? FPBCSSBlock.urls:null;

        let jsTitle, cssTitle;
        const cssFormat = [];
        const jsFormat = [];

        const title = '清除首屏内容中阻止呈现的 JavaScript 和 CSS';
        const ruleImpact = this.props.FPBImpact;
        const FPBSummary = mapKey2Value(this.props.FPBSummary.format,this.props.FPBSummary.args);

        if(FPBJSBlock.header&&jsUrl) {
            jsTitle = mapKey2Value(FPBJSBlock.header.format,FPBJSBlock.header.args);
            jsUrl.map(item => {
                jsFormat.push(mapKey2Value(item.result.format,item.result.args));
            })
        } else if(FPBJSBlock.format) {
            jsTitle = removeLink(FPBJSBlock.format);
        }

        if(FPBCSSBlock.header&&cssUrl) {
            cssTitle = mapKey2Value(FPBCSSBlock.header.format,FPBCSSBlock.header.args);
            cssUrl.map(item => {
                cssFormat.push(mapKey2Value(item.result.format,item.result.args));
            })
        } else if(FPBCSSBlock.format) {
            cssTitle = removeLink(FPBCSSBlock.format);
        }

        return(
            <div>
                <p>{title}</p>
                <p>{FPBSummary}</p>
                <p>规则影响：{ruleImpact}</p>
                <p>{jsTitle}</p>
                {jsFormat.length === 0?
                    null :
                    jsFormat.map(item =>
                        <p key={jsFormat.indexOf(item)}>{item}</p>
                    )
                }
                <p>{cssTitle}</p>
                {cssFormat.length === 0?
                    null :
                    cssFormat.map(item =>
                        <p key={cssFormat.indexOf(item)}>{item}</p>
                    )
                }
            </div>
        )
    }
}