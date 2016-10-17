import offline from 'react-native-simple-store'

export default function(store) {
  let currentTasks

  store.subscribe(() => {
    const {
      offlineLoaded,
      offlineTasks,
    } = store.getState().tasks

    if (offlineLoaded && currentTasks != offlineTasks) {
      offline.save('tasks', offlineTasks)

      currentTasks = offlineTasks
    }
  })
}
