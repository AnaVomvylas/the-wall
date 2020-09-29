import React, { useContext, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { MainContext } from './context/ContextProvider';
import { Link as RouterLink } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { HOMEURL, SIGNUPURL } from '../shared/constants';
import BottomTextInformation from './UI/BottomTextInformation';
import ConfirmSignUp from './ConfirmSignUp';

const USERNOTCONFIRMEDEXCEPTION = 'UserNotConfirmedException';

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
  }
}));

const SignIn = (props) => {
  const classes = useStyles();
  const { setUser } = useContext(MainContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState();
  const [submitResultText, setSubmitResultText] = useState('');
  const [mustConfirmSignUp, setMustConfirmSignUp] = useState(false);


  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const data = await Auth.signIn(username, password);
      const userInfo = { username: data.username, ...data.attributes }
      setUser(userInfo);
      props.history.push(HOMEURL);
    } catch (err) {
      setSubmitResultText('Sign In Failed. ' + err.message);
      if (err.code === USERNOTCONFIRMEDEXCEPTION) {
        setMustConfirmSignUp(true);
      }
    }
  };

  //Render ConfirmSignUp if user hasn't been verified yet
  if (mustConfirmSignUp) {
    return (
      <ConfirmSignUp username={username} />
    )
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <VpnKeyOutlinedIcon />
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
        <BottomTextInformation />
      </Box>
    </Container>
  );
}

export default SignIn;