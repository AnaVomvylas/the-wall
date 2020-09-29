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
import { createMuiTheme, CssBaseline, Paper, ThemeProvider } from '@material-ui/core';
import { deepOrange, orange } from '@material-ui/core/colors';


const App = () => {

  const theme = createMuiTheme({
    palette: {
      type: "dark",
      primary: {
        main: orange[500]
      },
      secondary: {
        main: deepOrange[500]
      }
    },
    overrides: {
      MuiCardActions: {
        root: {
          padding: "16px",
        }
      }
    }
  });

  return (
    <ContextProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          {/* <Navbar /> */}
          <Switch>
            <Route exact path={HOMEURL} component={Home} />
            <Route exact path={SIGNUPURL} component={SignUp} />
            <Route exact path={SIGNINURL} component={SignIn} />
            <Route component={SignUp} />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </ContextProvider>
  );
}

export default App;