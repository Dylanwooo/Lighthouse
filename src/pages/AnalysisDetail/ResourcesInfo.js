/**
 * Created by Dylanwoo on 2018/4/9.
 */

import React, { PureComponent } from 'react';
import Proxy from '../Proxy'

export default class ResourcesInfo extends PureComponent {
    componentDidMount() {
        const iframe = this.refs.proxy;
        console.log(iframe.contentWindow.performance.timing)
    }

    render() {
        return(
            <div>
                <iframe ref='proxy' src="http://localhost:3000/proxy" style={{display:'none'}}/>
            </div>
        )
    }
}