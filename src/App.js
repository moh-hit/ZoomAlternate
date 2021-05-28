import React, { useEffect, useState } from 'react'
import firebase from "./firebase_config";
import { useSelector } from "react-redux";
import useActionDispatcher from "./Hooks/useActionDispatcher";
import { SET_KEYS_TRUE, UPDATE_USER_DATA } from "./Store/actions";
import Lawmax from './Views/Lawmax';
import FirmLawmax from './Views/FirmLawmax'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import globalStateReducer from "./Store/reducers/globalStateReducer";
import globalUserDataReducer from "./Store/reducers/globalUserDataReducer";
import globalDashboardReducer from "./Store/reducers/globalDashboardReducer";

function App() {
  const userData = useSelector((state) => state.globalUserData);
  const dispatchAction = useActionDispatcher();
    /*                             Redux Configuration                            */
    /* -------------------------------------------------------------------------- */
    const rootReducers = combineReducers({
      globalStateData: globalStateReducer,
      globalUserData: globalUserDataReducer,
      globalDashboard: globalDashboardReducer
    });

    const store = createStore(rootReducers, composeWithDevTools());
  const [loading, setLoading] = useState(false);



  return (
      <Provider store={store}>

      <Router>
        <Switch>
          <Route exact path="/" component={Lawmax} />
          <Route exact path="/firm" component={FirmLawmax} />
        </Switch>
      </Router>
      </Provider>
  );
}

export default App;
