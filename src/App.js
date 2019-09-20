import React from 'react';
import './App.css';
import './notifications.css';
import {hydrate} from "react-dom"
import { BrowserRouter } from 'react-router-dom'
import AppRouterContainer from './components/router/AppRouterContainer';
import { Provider } from "react-redux";
import ConfigureStore from './configureStore'
import { PersistGate } from 'redux-persist/integration/react'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers/index'
import thunkMiddleware from 'redux-thunk'
import logger from 'redux-logger'

let {store, persistor} = ConfigureStore()
  // let store = createStore(rootReducer, __PRELOADED_STATE__, applyMiddleware(thunkMiddleware, logger));
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate loading={null} persistor={persistor}>
          <AppRouterContainer />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  );
}

window.onload = () => {
  hydrate(
      <App/>,
      document.getElementById('root')
  )
}
export default App;
