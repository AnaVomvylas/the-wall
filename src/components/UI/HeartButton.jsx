import React from 'react';
import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useState } from 'react';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    redColor: {
        color: red[500],
    }
}));

const HeartButton = ({ timesHearted }) => {
    const [clicked, setClicked] = useState(false);
    const classes = useStyles();


    const handleClick = () => {
        debugger;
        setClicked(currentState => !currentState);
    }

    return (
        <div>
            <Button edge="end" aria-label="heart" onClick={handleClick}>
                {clicked ?
                    <FavoriteIcon className={classes.redColor} />
                    :
                    <FavoriteBorderIcon />
                }
                <Box ml={1}>
                    <Typography className={clicked ? classes.redColor : ''}>
                        {timesHearted}
                    </Typography>
                </Box>
            </Button>
        </div>
    );
}

export default HeartButton;