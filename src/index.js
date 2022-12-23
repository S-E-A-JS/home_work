/* eslint-disable */
import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom/client"
import { initiateStore } from "./store/store"
import { taskCompleted, titleChanged } from './store/actions'
import * as actions from './store/actions'

// #############################################

const store = initiateStore()

const App = params => {
const [state, setState] = useState(store.getState())

useEffect(() => {
  store.subscribe (()=>{
    setState(store.getState())
     }) 
  
}, []);

  const completeTask = (taskId) => {
    store.dispatch (actions.taskCompleted(taskId) )
  }

  const changeTitle = (taskId) => {
    store.dispatch ( actions.titleChanged(taskId))
  }

  const deletetask = (taskId) => {
    store.dispatch ( actions.taskDeleted(taskId))
  }
  return (
    <>
      <h1>App</h1>
      <ul>
      {state.map(el=><li key={el.id}>
        <p>{el.title}</p>
        <p>{`Comleted: ${el.completed}`}</p>
      <button onClick={()=> completeTask(el.id)}>Complete</button>
      <button onClick={()=> changeTitle(el.id)}>Change Title</button>
      <button onClick={()=> deletetask(el.id)}>Delete Task</button>
        <hr />
        </li>)}
      </ul>
    </> )
}

const root = ReactDOM.createRoot ( document.getElementById ( "root" ) )
root.render (
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)