import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Card, CardHeader, Avatar, CardContent, CardActions, Divider } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { deepOrange } from '@material-ui/core/colors';
import HeartButton from './UI/HeartButton';
import { MainContext } from './context/ContextProvider';
import { SIGNINURL } from '../shared/constants';
import { Redirect } from 'react-router-dom';
import NewPostCard from './UI/NewPostCard';
import { API } from 'aws-amplify';

const useStyles = makeStyles((theme) => ({
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  }
}));

const Home = (props) => {
  const classes = useStyles();

  const { asdasd } = useContext(MainContext);
  const [user, setUser] = useState({ username: "Anavomv" });
  const [posts, setPosts] = useState();
  const [reCallGetPosts, setReCallGetPosts] = useState(false);

  useEffect(() => {
    debugger;
    if (user) {
      getPosts();
    }
  }, [reCallGetPosts]);

  async function getPosts() {
    try {
      const response = await API.get('theWallApi', '/posts');
      setPosts(response.data.Items.sort((a, b) => b.creationDate - a.creationDate)); //order descending
    } catch (err) {
      return err;
    }
  }

  const mapPosts = (arr) => {
    return (
      arr.map(x =>
        <Grid item key={x.id}>
          <Card>
            <CardHeader
              // avatar={
              //   <Avatar className={classes.orange}>AV</Avatar>
              // }
              title={x.username}
              subheader={(new Date(x.creationDate)).toLocaleDateString}
            />
            <Divider variant="middle" />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {x.content}
              </Typography>
            </CardContent>
            <Divider variant="middle" />
            <CardActions disableSpacing>
              <HeartButton
                postId={x.id}
                username={user.username}
                timesHearted={x.hearted}
                isHeartedByUser={x.heartedUsernames.indexOf(user.username) >= 0}
              />
            </CardActions>
          </Card>
        </Grid>
      ))
  }


  //Redirect to signIn page if not authenticated
  // if (!user) {
  //   return (
  //     <Redirect to={SIGNINURL} />
  //   )
  // };

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item container>
        <Grid item xs={false} sm={2} />
        <Grid item xs={12} sm={8}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <NewPostCard
                username={user.username}
                refreshPosts={() => setReCallGetPosts(currentState => !currentState)}
              />
            </Grid>
            {posts ? mapPosts(posts) : <ErrorContent />}
          </Grid>
        </Grid>
        <Grid item xs={false} sm={2} />
      </Grid>
    </Grid>
  );
}

export default Home;