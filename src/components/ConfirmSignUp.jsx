import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { SIGNINURL } from '../shared/constants';
import BottomTextInformation from './UI/BottomTextInformation';
import { Redirect } from 'react-router-dom';
import { Auth } from 'aws-amplify';


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

const ConfirmSignUp = ({ username }) => {
  const classes = useStyles();

  const [verified, setVerified] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');
  const [submitResultText, setSubmitResultText] = useState('');

  const [resendConfirmationCode, setResendConfirmationCode] = useState(false);
  const [resendConfirmationCodeResult, setResendConfirmationCodeResult] = useState('');

  async function handleSubmit(event) {
    debugger;
    event.preventDefault();
    try {
      await Auth.confirmSignUp(username, confirmationCode);
      setVerified(true);
    } catch (err) {
      setSubmitResultText('Error confirming the code. ' + err.message);
    }
  };

  async function handleResendConfirmationCode() {
    debugger;
    try {
      await Auth.resendSignUp(username);
      setResendConfirmationCode(true);
      setResendConfirmationCodeResult('A new verification code was sent to your email');
    } catch (err) {
      setResendConfirmationCodeResult('Error sending email ' + err.message);
    }
  }

  //Redirect to SignIn if successful
  if (verified) {
    return (
      <Redirect to={SIGNINURL} />
    )
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <EmailOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Verify User
        </Typography>
        <Typography variant='textSecondary'>
          A verification code was sent to your email.
        </Typography>
        <Typography variant='textSecondary'>
          Enter the verification code below.
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="verificationCode"
            label="VerificationCode"
            name="verificationCode"
            autoFocus
            onChange={(e) => setConfirmationCode(e.target.value)}
          />
          <Typography color='error'>
            {submitResultText}
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Verify
            </Button>
          <Grid container>
            <Grid item>

              {resendConfirmationCode ?
                <Typography>
                  {resendConfirmationCodeResult}
                </Typography>
                :
                <Link href="#" onClick={handleResendConfirmationCode}>
                  {"I haven't received an email. Send me a new one"}
                </Link>
              }

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

export default ConfirmSignUp;