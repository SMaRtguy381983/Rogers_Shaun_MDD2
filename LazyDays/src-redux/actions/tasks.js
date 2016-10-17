import offline from 'react-native-simple-store'

export const COMPLETE_TASK = 'COMPLETE_TASK'
export const IGNORE_TASK = 'IGNORE_TASK'
export const SKIP_TASK = 'SKIP_TASK'

export const OFFLINE_TASKS_LOADED = 'OFFLINE_TASKS_LOADED'

export const CONNECTION_CHECKING = 'CONNECTION_CHECKING'
export const CONNECTION_CHECKED = 'CONNECTION_CHECKED'
export const CONNECTION_ONLINE = 'CONNECTION_ONLINE'
export const CONNECTION_OFFLINE = 'CONNECTION_OFFLINE'

export function completeTask(task) {
  return {
    type: COMPLETE_TASK,
    task,
  }
}

export function ignoreTask(id) {
  return {
    type: IGNORE_TASK,
    id,
  }
}

export function skipTask(id) {
  return {
    type: SKIP_TASK,
    id,
  }
}

function offlineTasksLoaded(tasks) {
  return {
    type: OFFLINE_TASKS_LOADED,
    tasks,
  }
}

export function loadOfflineTasks() {
  return (dispatch) => {
    offline.get('tasks')
    .then((tasks) => {
      dispatch(offlineTasksLoaded(tasks || []))
    })
  }
}

export function checkConnection() {
  return (dispatch) => {
    dispatch({
      type: CONNECTION_CHECKING,
    })

    SETTIMEOUT(() => dispatch({
      type: CONNECTION_CHECKED,
    }), 5000)
  }
}

export function goOnline() {
  return {
    type: CONNECTION_ONLINE
  }
}

export function goOffline() {
  return {
    type: CONNECTION_OFFLINE
  }
}
