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

const HeartButton = ({ postId, username, timesHearted, isHeartedByUser }) => {
    const classes = useStyles();

    const [clicked, setClicked] = useState(isHeartedByUser);
    const [heartedNumber, setHeartedNumber] = useState(timesHearted);

    const handleClick = () => {
        debugger;
        setClicked(currentClicked => !currentClicked);
        updateHearts();
    }

    async function updateHearts() {
        try {
            const request = {
                body: {
                    postId: postId,
                    username: username,
                }
            };
            const response = await API.post('theWallApi', '/heart', request);

            // PROBABLY ERROR HERE
            setHeartedNumber(response.data.Items.hearted);

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