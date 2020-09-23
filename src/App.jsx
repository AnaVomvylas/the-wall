import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/Home';
import { } from 'constants';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { HOMEURL, SIGNINURL, SIGNUPURL } from './shared/constants';
import { ContextProvider } from './components/context/ContextProvider';

const App = () => {

  return (
    <ContextProvider>
      <BrowserRouter>
        {/* <Navbar /> */}
        <Switch>
          <Route exact path={HOMEURL} component={Home} />
          <Route exact path={SIGNUPURL} component={SignUp} />
          <Route exact path={SIGNINURL} component={SignIn} />
          <Route component={SignUp} />
        </Switch>
        <Home />
      </BrowserRouter>
    </ContextProvider>
  );
}

export default App;