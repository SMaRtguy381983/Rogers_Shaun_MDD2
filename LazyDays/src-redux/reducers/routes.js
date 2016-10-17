import { ActionConst } from 'react-native-router-flux'

const initialState = {
  scene: {}
}
//add = {} most likely
export default function reducer(state = initialState, action) {
  switch(action.type){
    case ActionConst.FOCUS:
      return {
        ...state,
        scene: action.scene
      }

    default:
      return state
  }
}
