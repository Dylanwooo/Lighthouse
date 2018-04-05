/**
 * Created by Dylanwoo on 2018/4/3.
 */
export function itemsHasErrored(state = false, action) {
    switch (action.type) {
        case 'FETCH_HAS_ERROR':
            return action.hasErrored;

        default:
            return state;
    }
}

export function itemsIsLoading(state = false, action) {
    switch (action.type) {
        case 'FETCH_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}

export function items(state = [], action) {
    switch (action.type) {
        case 'FETCH_DATA_SUCESS':
            return action.items;

        default:
            return state;
    }
}

