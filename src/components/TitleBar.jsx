import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { Box } from '@material-ui/core';
import MyGithubIcon from './UI/MyGithubIcon';
import { Auth } from 'aws-amplify';
import { MainContext } from './context/ContextProvider';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    textAlign: "center"
  }
}));

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}



const TitleBar = (props) => {
  const classes = useStyles();
  const { setUser } = useContext(MainContext);

  function signOut() {
    try {
      Auth.signOut();
      setUser(null)
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <Box mb={2}>
      <HideOnScroll {...props}>
        <AppBar>
          <Toolbar>
            <MyGithubIcon />
            <Typography className={classes.title} variant="h4">The Wall</Typography>
            <Button color="inherit" onClick={signOut}>Sign Out</Button>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </Box>

  );
}

export default TitleBar;