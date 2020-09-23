import React, { useContext, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import GitHubIcon from '@material-ui/icons/GitHub';
import { MYGITHUBURL } from '../shared/constants';
import { MainContext } from './context/ContextProvider';
import { RouterLink } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { HOMEURL, SIGNUPURL } from '../shared/constants';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  clickableIcon: {
    '&:hover': {
      color: theme.palette.secondary.main
    },
  }
}));

const SignIn = (props) => {
  const classes = useStyles();
  const { setUser } = useContext(MainContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState();

  let submitResultText = '';

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const data = await Auth.signIn(username, password);
      const userInfo = { username: data.username, ...data.attributes }
      setUser(userInfo);
      props.history.push(HOMEURL);
    } catch (err) {
      submitResultText = 'Sign In Failed. ' + err;
    }
  };

  const BottomText = () => {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'The Wall - Anastasis Vomvylas'}
        <GitHubIcon color="inherit" onClick={e => window.open(MYGITHUBURL, '_blank')} />
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Typography variant="body2" color='error'>
            {submitResultText}
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
            </Button>
          <Grid container>
            <Grid item>
              <Link component={RouterLink} to={SIGNUPURL} variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <BottomText />
      </Box>
    </Container>
  );
}

export default SignIn;