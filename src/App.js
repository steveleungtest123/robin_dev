import React from 'react';
import 'assets/app.scss';
import {
  Switch,
  Route
} from 'react-router-dom'
import Appbar from 'components/appbar/Appbar'
import Footer from 'components/footer/Footer'
import Home from 'screens/Home'
import { useSelector } from 'react-redux';

const App = () => {
  const appState = useSelector(state => state.appReducer)
  return (
    <div className={`App theme-${appState.isDark ? 'dark' : 'light'}`}>
      <Appbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
