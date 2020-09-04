import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useState } from 'react';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    redColor: {
      color: red[500],
    }
  }));

const HeartButton = () => {
    const [clicked, setClicked] = useState(false);
    const classes = useStyles();


    const handleClick = () => {
        setClicked(currentState => !currentState);
    }

    return (
        <Button edge="end" aria-label="heart" onClick={handleClick}>
            {clicked? <FavoriteIcon className={classes.redColor} />:<FavoriteBorderIcon />}
        </Button>
    );
}

export default HeartButton;