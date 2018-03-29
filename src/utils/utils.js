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