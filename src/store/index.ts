import { createStore, compose } from 'redux'
import reducer from './reducers'
const store = createStore(
  reducer,
  compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() //开启redux调试
  )
)
export default store
