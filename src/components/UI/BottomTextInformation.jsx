import React from 'react';
import Typography from '@material-ui/core/Typography';
import MyGithubIcon from './MyGithubIcon';

const BottomTextInformation = () => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'The Wall - Anastasis Vomvylas   '}
            <MyGithubIcon />
            {'   ' + new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default BottomTextInformation;