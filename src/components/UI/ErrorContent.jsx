import React from 'react';
import SentimentVeryDissatisfiedOutlinedIcon from '@material-ui/icons/SentimentVeryDissatisfiedOutlined';
import Typography from '@material-ui/core/Typography';

const ErrorContent = () => {
    return (
        <Box>
            <SentimentVeryDissatisfiedOutlinedIcon />
            <Typography variant="body" color="textSecondary" component="p">
                There was an error retrieving the content
            </Typography>
        </Box>
    )
}

export default ErrorContent;