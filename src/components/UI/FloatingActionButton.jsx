import React from 'react';
import { Fab, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
    fab: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  }));

const FloatingActionButton = () => {
    const [clicked, setClicked] = useState(false);
    const classes = useStyles();


    const handleClick = () => {
        debugger;
        setClicked(currentState => !currentState);
    }

    return (
       <Fab color="primary" size="large" className={classes.fab} onClick={handleClick}>
           <AddIcon />
       </Fab>
    );
}

export default FloatingActionButton;