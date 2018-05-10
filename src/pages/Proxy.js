/**
 * Created by Dylanwoo on 2018/4/11.
 */

import React, { PureComponent } from 'react';

export default class Proxy extends PureComponent {

    render() {
        return(
            <iframe src="https://www.baidu.com" style={{display:'none'}}/>
        )
    }
}