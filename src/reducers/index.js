/**
 * Created by Dylanwoo on 2018/4/3.
 */
import { combineReducers } from 'redux';
import { items, itemsHasErrored, itemsIsLoading } from './itemsReducer';

export default combineReducers({
    items,
    itemsHasErrored,
    itemsIsLoading
});
