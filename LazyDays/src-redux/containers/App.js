import { bindActionCreators } from 'redux'

import { connect } from 'react-redux'

import * as ItemsActions from '../actions/items'

import ItemsList from '../components/ItemsList'

// bit-o-pseduo
/*
- app lands at "lauch screen"
- any screen tap moves to a task
- task is chosen, Math.random(activities.length)
- scroll (genre/system)
- swipe
  - up
    - okay (will do it)
  - right
    - skip (done it already)
  - down
    - reject/block/prevent
*/

function mapStateToProps(state) {
  return {
    onlineItems: state.tasks.onlineTasks,
    offlineItems: state.tasks.offlineTasks,
    connectionChecked: state.tasks.connectionChecked,
    connected: state.tasks.connected
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ItemsActions, dispatch)
}

export default class App extends Component {
  connect(mapStateToProps, mapDispatchToProps)(ItemsList)

  render() {
    return (
      <Home/>
    )
  }
}
