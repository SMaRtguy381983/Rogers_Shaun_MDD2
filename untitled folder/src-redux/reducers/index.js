import { combineReducers } from 'redux'

import tasks from './tasks'

import routes from './routes'

export default combineReducers({
  tasks,
  routes
})
