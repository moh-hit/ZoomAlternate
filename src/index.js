import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/style.css'
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import globalStateReducer from "./Store/reducers/globalStateReducer";
import globalDashboardReducer from "./Store/reducers/globalDashboardReducer";
import globalUserDataReducer from "./Store/reducers/globalUserDataReducer";
import 'webrtc-adapter';
import 'bootstrap/dist/css/bootstrap.min.css';

const rootReducers = combineReducers({
  globalState: globalStateReducer,
  globalUserData: globalUserDataReducer,
  globalDashboard: globalDashboardReducer,
});

const store = createStore(rootReducers, composeWithDevTools());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root')
);

reportWebVitals();
