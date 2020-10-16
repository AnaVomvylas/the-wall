import React from 'react';
import { Button, Card, CardActions, CardContent, makeStyles, TextField } from '@material-ui/core';
import { useState } from 'react';
import { API } from 'aws-amplify';

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  cardActions: {
    flex: 1,
    justifyContent: "flex-end"
  },
  card: {
    borderColor: theme.palette.primary.main
  }
}));

const NewPostCard = ({ username, refreshPosts }) => {
  const [postText, setPostText] = useState('');
  const classes = useStyles();

  const placeholderText = username + ", post something on The Wall";

  async function createNewPost() {
    if (!postText) {
      return;
    }

    const data = {
      body: {
        username: username,
        content: postText
      }
    };
    try {
      await API.post('theWallApi', '/posts', data);
      setPostText('');
      refreshPosts();
    } catch (err) {
      //add text 
      console.log(err);
    }
  }

  return (
    <div>
      <Card className={classes.card} key="newPostInput" variant="outlined" raised>
        <CardContent>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="newPostTextField"
            placeholder={placeholderText}
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          />
        </CardContent>
        <CardActions className={classes.cardActions} disableSpacing>
          <Button size="large" variant="outlined" color="primary" onClick={createNewPost}>
            Post
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default NewPostCard;