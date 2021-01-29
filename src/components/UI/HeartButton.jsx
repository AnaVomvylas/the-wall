import React from 'react';
import { Box, Button, makeStyles, Tooltip, Typography } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useState } from 'react';
import { API } from 'aws-amplify';
import { MAXHEARTEDTOOLTIP } from '../../constants';

const useStyles = makeStyles((theme) => ({
    heart: {
        color: theme.palette.primary.main,
    },
    tooltip: {
        fontSize: "0.8rem",
        color: theme.palette.primary.main
    }
}));

const HeartButton = ({ postId, username, timesHearted, isHeartedByUser, creationDate, heartedUsernames }) => {
    const classes = useStyles();

    const [clicked, setClicked] = useState(isHeartedByUser);
    const [heartedNumber, setHeartedNumber] = useState(timesHearted);
    const [_heartedUsernames, _setHeartedUsernames] = useState(heartedUsernames);

    const handleClick = () => {
        const newClickedState = !clicked;
        setClicked(newClickedState);
        setHeartedNumber(currentNumber => newClickedState ? currentNumber + 1 : currentNumber - 1);
        _setHeartedUsernames(currentArr => newClickedState ? [...currentArr, username] : currentArr.filter(x => x !== username))
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
        } catch (err) {
            console.log(err);
            return err;
        }
    }

    const getTooltipTitle = (arr) => {
        if (arr.length === 0) {
            return '';
        }

        if (arr.length >= MAXHEARTEDTOOLTIP) {
            return (
                <Typography className={classes.tooltip}>
                    {arr.slice(-1 * MAXHEARTEDTOOLTIP).join(", ") + " and " + (arr.length - MAXHEARTEDTOOLTIP) + " more"}
                </Typography>);
        } else {
            return (<Typography className={classes.tooltip}>{arr.join(", ")}</Typography>);
        }
    }

    return (
        <Tooltip title={getTooltipTitle(_heartedUsernames)}>
            <div>
                <Button edge="end" aria-label="heart" onClick={handleClick}>
                    {clicked ?
                        <FavoriteIcon className={classes.heart} />
                        :
                        <FavoriteBorderIcon />
                    }
                    <Box ml={1}>
                        <Typography className={clicked ? classes.heart : ''}>
                            {heartedNumber}
                        </Typography>
                    </Box>
                </Button>
            </div>
        </Tooltip >
    );
};

export default HeartButton;