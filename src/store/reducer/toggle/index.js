import Types from '../../types';

const defaultState = {
  toggle: false
}
export default function onAction(state = defaultState, action){
  switch (action.type) {
    case Types.TOGGLE_MENU:
      return {...state,toggle:action.toggle}
      break;
  
    default:
      return state;
  }
}