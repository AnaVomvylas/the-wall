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
import GitHubIcon from '@material-ui/icons/GitHub';
import { MYGITHUBURL } from '../shared/constants';

const BottomText = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'The Wall - Anastasis Vomvylas'}
      <GitHubIcon color="inherit" href={MYGITHUBURL} />
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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
  },
}));

const SignUp = () => {
  const classes = useStyles();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState();
  const [verifyPassword, setVerifyPassword] = useState();
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);
  const [verifyPasswordHelperText, setVerifyPasswordHelperText] = useState('')

  const onChangeVerifyPassword = (event) => {
    let updatedVerifyPass = event.target.value;
    setVerifyPassword(updatedVerifyPass);
    setVerifyPasswordHelperText('');

    if (password === updatedVerifyPass) {
      setIsPasswordVerified(true);
    }
    else {
      setIsPasswordVerified(false);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isPasswordVerified) {
      //TODO: route to sign in and save credentials
    }
    else {
      setVerifyPasswordHelperText('Passwords do not match');
    }
  }

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
            {/* <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid> */}
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
                value={verifyPassword}
                id="password2"
                error={(isPasswordVerified || !verifyPassword) ? false : true}
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
          <Grid container>
            <Grid item>
              <Link href="#" variant="body2">
                {"Already have an account ? Sign in"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div >
      <Box mt={5}>
        <BottomText />
      </Box>
    </Container >
  );
}

export default SignUp;