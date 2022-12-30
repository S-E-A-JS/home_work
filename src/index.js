import React, { useEffect } from "react"
import ReactDOM from "react-dom/client"
import { Provider, useSelector, useDispatch } from "react-redux"
import { getError } from "./store/errors"

import configureStore from "./store/store"
import { titleChanged, taskDeleted, completeTask, getTasks, loadTasks, getTasksLoadingStatus, taskCreate } from "./store/task"

// #############################################

const store = configureStore ()

const App = params => {
  const state = useSelector ( getTasks () )
  const isLoading = useSelector ( getTasksLoadingStatus () )
  const error = useSelector ( getError () )
  const dispatch = useDispatch ()

  useEffect ( () => {
    dispatch ( loadTasks () )
  }, [] )

  const changeTitle = taskId => {
    dispatch ( titleChanged ( taskId ) )
  }

  const deletetask = taskId => {
    dispatch ( taskDeleted ( taskId ) )
  }

  if ( isLoading ) {
    return <h1>Loading</h1>
  }
  if ( error ) {
    return <p>{error}</p>
  }
  return (
    <div>
      <h1>App</h1>

      <ul>
        {state.map ( el => <li key={el.id}>
          <p>{el.title}</p>
          <p>{`Comleted: ${el.completed}`}</p>
          <button onClick={() => dispatch ( completeTask ( el.id ) )}>Complete</button>
          <button onClick={() => changeTitle ( el.id )}>Change Title</button>
          <button onClick={() => deletetask ( el.id )}>Delete Task</button>
          <hr />
        </li> )}
      </ul>
      <button onClick={() => dispatch ( taskCreate () )}>Добавить новую таску</button>
    </div> )
}

const root = ReactDOM.createRoot ( document.getElementById ( "root" ) )
root.render (
  <React.StrictMode>
    <Provider store ={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)