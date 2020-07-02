/*
 * @Author: your name
 * @Date: 2020-02-16 21:33:34
 * @LastEditTime: 2020-07-02 17:11:42
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /react1/src/store/reducer/toggle/index.js
 */ 
/* eslint-disable */
import Types from '../../types';

const defaultState = {
  toggle: false
}
export default function onAction(state = defaultState, action){
  switch (action.type) {
    case Types.TOGGLE_MENU:
      return {...state,toggle:action.toggle};
      break;
    default:
      return state;
  }
}