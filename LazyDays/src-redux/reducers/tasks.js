import {
  COMPLETE_TASK,
  IGNORE_TASK,
  SKIP_TASK,

  OFFLINE_TASKS_LOADED,

  CONNECTION_CHECKING,
  CONNECTION_CHECKED,
  CONNECTION_ONLINE,
  CONNECTION_OFFLINE
} from '../actions/tasks'

const initialState = {
  onlineTasks: [],
  offlineTasks: [],
  connectionChecked: false
}

export default function reducer(state = initialState, action) {
  let tasks

  switch(action.type) {
    case COMPLETE_TASK:
      tasks = state.onlineTasks
      // .concat([action.task]) // add task
      // .sort((a, b) => b.time - a.time) // sort tasks

      return {
        ...state,
        onlineTasks: tasks,
        offlineTasks: tasks
      }

    case IGNORE_TASK:
      tasks = state.onlineTasks
      // .slice(0) // copy onlineTasks
      //
      // const index = tasks.map((i) => {
      //   return i.id
      // }).indexOf(action.id)
      //
      // tasks.splice(index, 1)

      return {
        ...state,
        onlineTasks: tasks,
        offlineTasks: tasks
      }

    case SKIP_TASK:
      tasks = state.onlineTasks

      return {
        ...state,
        onlineTasks: tasks,
        offlineTasks: tasks
      }

    case OFFLINE_TASKS_LOADED:
      return {
        ...state,
        offlineTasks: action.tasks,
        offlineLoaded: true
      }

    case CONNECTION_CHECKING:
      return {
        ...state,
        connectionChecked: false
      }

    case CONNECTION_CHECKED:
      return {
        ...state,
        connectionChecked: true
      }

    case CONNECTION_ONLINE:
      return {
        ...state,
        connectionChecked: true,
        connected: true
      }

    case CONNECTION_OFFLINE:
      return {
        ...state,
        connectionChecked: true,
        connected: false
      }

    default:
      return state
  }
}
