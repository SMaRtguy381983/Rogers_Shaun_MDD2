import { ActionConst } from 'react-native-router-flux'

const initialState = {
  scene: {},
}

export default function
    reducer(state = initialState, action = {}) {
  switch (action.type) { // see how the indention is 100% identifiyable in 7-9?
    
    // Focus action is dispatched when new scene comes into focus
    case ActionConst.FOCUS:
      return {
        ...state,
        scene: action.scene,
      }

      default:
        return state
  }
}
