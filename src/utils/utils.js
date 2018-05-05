/*
  用于存放工具函数
*/

export function map2ColorIndex(score) {
    let index;
    if(parseInt(score) <= 60) {
        index = 2;
    } else if(parseInt(score) > 60 && parseInt(score) < 80) {
        index = 1;
    } else
        index = 0;
    return index;
}

export function map2OptimizeRank(score) {
    let rank;
    if(parseInt(score) <= 60) {
        rank = 'Poor';
    } else if(parseInt(score) > 60 && parseInt(score) < 80) {
        rank = 'Medium';
    } else
        rank = 'Good';
    return rank;
}

export function map2RankColor(cate) {
    let index;
    if(cate === 'FAST'){
        index = 0;
    }else if(cate === 'AVERAGE') {
        index = 1;
    }
    return index;
}

export function checkPath(str) {
    return window.location.pathname.includes(str)
}

export function map2Percetage(num) {
    num = parseFloat(num).toFixed(2);
    return num.slice(2,4)+'%';
}

export function map2toFix(num) {
    if(num){
        return num.toFixed(2);
    }
}

export function mapTime2MS(time) {
    return time/1000
}

export function map2LoadType(type) {
    let str;
    switch(type){
        case 0:
            str = '点击链接、地址栏输入、表单提交、脚本操作等方式加载';
            break;
        case 1:
            str = '通过“重新加载”按钮或者location.reload()方法加载';
            break;
        case 2:
            str = '网页通过“前进”或“后退”按钮加载';
            break;
        default:
            str = '任何其他来源的加载';
            break;
    }
    return str;
}


export function mapKey2Value(format,args) {

    const keyArr = [];
    const valueArr = [];
    //剔除{}和（）
    const re = /\{\{|\}\}|\(|\)/g;
    format = format.replace(re,'');

    args.map(item => {
        keyArr.push(item.key);
        valueArr.push(item.value);
    });

    keyArr.map(item => {
        format = format.replace(item,valueArr[keyArr.indexOf(item)])
    });

    return format;
}

export function extractObject(arr) {
    let result = {};
    arr.map(item => {
        result = item;
    });
    return result;
}

//去除LINK，将args中变量赋值
export function mapLink2Vaule(header) {
    const re = /\{\{|\}\}|BEGIN_LINK|END_LINK/g;
    const args = header.args;
    let title = header.format.replace(re,'');
    title = mapKey2Value(title,args);
    return title
}