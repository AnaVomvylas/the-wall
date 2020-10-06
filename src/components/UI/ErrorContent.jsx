import React from 'react';
import SentimentVeryDissatisfiedOutlinedIcon from '@material-ui/icons/SentimentVeryDissatisfiedOutlined';
import Typography from '@material-ui/core/Typography';
import { Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    center: {
        justifyContent: 'center',
        textAlign: 'center'
    }
}));


const ErrorContent = () => {
    const classes = useStyles();

    return (
        <Box mt={6} >
            <div className={classes.center}>
                <SentimentVeryDissatisfiedOutlinedIcon />
                <Typography variant="body1" color="textSecondary" component="p">
                    There was an error retrieving the content
            </Typography>
            </div>
        </Box >
    )
}

export default ErrorContent;