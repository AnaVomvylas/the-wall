import React from 'react';
import { IconButton, makeStyles } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import { MYGITHUBURL } from '../../constants';

const useStyles = makeStyles((theme) => ({
    clickableIcon: {
        '&:hover': {
            color: theme.palette.secondary.main
        }
    }
}));

const MyGithubIcon = () => {
    const classes = useStyles();

    return (
        <IconButton onClick={e => window.open(MYGITHUBURL, '_blank')}>
            <GitHubIcon className={classes.clickableIcon} color="inherit" />
        </IconButton>
    );
}

export default MyGithubIcon;