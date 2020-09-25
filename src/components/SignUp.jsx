import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import BottomTextInformation from './UI/BottomTextInformation';
import { SIGNINURL } from '../shared/constants';
import { Auth } from 'aws-amplify';
import ConfirmSignUp from './ConfirmSignUp';
import { Link as RouterLink } from 'react-router-dom';

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
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  }
}));

const SignUp = (props) => {
  const classes = useStyles();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [verifyPassword, setVerifyPassword] = useState();
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);
  const [verifyPasswordHelperText, setVerifyPasswordHelperText] = useState('')
  const [submitResultText, setSubmitResultText] = useState('');
  const [confirmSignUp, setConfirmSignUp] = useState(false);

  const onChangeVerifyPassword = (event) => {
    let newVerifyPassword = event.target.value;
    setVerifyPassword(newVerifyPassword);
    setVerifyPasswordHelperText('');

    if (password === newVerifyPassword) {
      setIsPasswordVerified(true);
    }
    else {
      setIsPasswordVerified(false);
    }
  }

  async function handleSubmit(event) {
    debugger;
    event.preventDefault();
    if (isPasswordVerified) {
      try {
        await Auth.signUp({
          username,
          password,
          attributes: {
            email
          }
        })
        setConfirmSignUp(true);
        //props.history.push(SIGNINURL);
      } catch (err) {
        setSubmitResultText('Error Signing Up. ' + err.message);
      }
    }
    else {
      setVerifyPasswordHelperText('Passwords do not match');
    }
  }

  //Render ConfirmSignUp if sign up was successful
  if (confirmSignUp) {
    return (
      <ConfirmSignUp username={username} />
    )
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
          </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password2"
                label="Verify Pasword"
                type="password"
                id="password2"
                error={(!isPasswordVerified && verifyPassword) ? true : false}
                value={verifyPassword || ''}
                onChange={onChangeVerifyPassword}
                helperText={verifyPasswordHelperText}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
            </Button>
          <Typography variant="body2" color='error'>
            {submitResultText}
          </Typography>
          <Grid container>
            <Grid item>
              <Link component={RouterLink} to={SIGNINURL} variant="body2">
                {"Already have an account ? Sign in"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div >
      <Box mt={5}>
        <BottomTextInformation />
      </Box>
    </Container >
  );
}

export default SignUp;