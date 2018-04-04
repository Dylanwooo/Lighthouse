/**
 * Created by Dylanwoo on 2018/4/2.
 */
export function hasError(bool) {
    return {
        type: 'FETCH_HAS_ERROR',
        hasErrored: bool
    }
}

export function isLoading(bool) {
    return {
        type: 'FETCH_IS_LOADING',
        isLoading: bool
    }
}

export function fetchSuccess(items) {
    return {
        type: 'FETCH_DATA_SUCESS',
        items
    }
}


export function fetchData(url) {
    return (dispatch) => {
        fetch(url,{
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-type':'application/json',
                'Accept':'application/json',
                'cache-control': 'max-age=604800'   //设置浏览器缓存7天
            }
        })
            .then(response => {
                if(!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(isLoading(false));
                return response
            })
            .then(res => res.json())
            .then(data => {
                dispatch(fetchSuccess(data));
            })
            .catch(()=>dispatch(hasError(true)))
    }
}