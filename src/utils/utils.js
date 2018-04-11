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