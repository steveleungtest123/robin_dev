import React from 'react';
import 'assets/app.scss';
import {
  Switch,
  Route
} from 'react-router-dom'
import Appbar from 'components/appbar/Appbar'
import Home from 'screens/Home'
import { useSelector } from 'react-redux';
import DrawerLeft from 'components/drawer/DrawerLeft'

const App = () => {
  const appState = useSelector(state => state.appReducer)
  return (
    <div className={`App theme-${appState.isDark ? 'dark' : 'light'}`}>
      <Appbar />
      <DrawerLeft />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
