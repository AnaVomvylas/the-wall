import React from 'react';
import { IconButton, makeStyles } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import { MYGITHUBURL } from '../../shared/constants';

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
        <IconButton>
            <GitHubIcon className={classes.clickableIcon} color="inherit" onClick={e => window.open(MYGITHUBURL, '_blank')} />
        </IconButton>
    );
}

export default MyGithubIcon;