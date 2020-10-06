import React from 'react';
import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useState } from 'react';
import { red } from '@material-ui/core/colors';
import { API } from 'aws-amplify';

const useStyles = makeStyles((theme) => ({
    redColor: {
        color: red[500],
    }
}));

const HeartButton = ({ postId, username, timesHearted, isHeartedByUser, creationDate }) => {
    const classes = useStyles();

    const [clicked, setClicked] = useState(isHeartedByUser);
    const [heartedNumber, setHeartedNumber] = useState(timesHearted);

    const handleClick = () => {
        debugger;
        const newClickedState = !clicked;
        setClicked(newClickedState);
        setHeartedNumber(currentNumber => newClickedState ? currentNumber + 1 : currentNumber - 1);

        updateHearts();
    }

    async function updateHearts() {
        try {
            const request = {
                body: {
                    postId: postId,
                    username: username,
                    creationDate: creationDate
                }
            };
            const response = await API.patch('theWallApi', '/heart', request);
            console.log(response);
        } catch (err) {
            console.log(err);
            return err;
        }
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
                        {heartedNumber}
                    </Typography>
                </Box>
            </Button>
        </div>
    );
}

export default HeartButton;