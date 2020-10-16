import React, { useContext, useState, useEffect } from 'react';
import { Grid, Card, CardHeader, CardContent, CardActions, Divider } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import HeartButton from './UI/HeartButton';
import ErrorContent from './UI/ErrorContent';
import { MainContext } from './context/ContextProvider';
import { SIGNINURL } from '../constants';
import { Redirect } from 'react-router-dom';
import NewPostCard from './UI/NewPostCard';
import { API } from 'aws-amplify';
import TitleBar from './UI/TitleBar';


const Home = (props) => {
  const { user } = useContext(MainContext);

  const [posts, setPosts] = useState();
  const [reCallGetPosts, setReCallGetPosts] = useState(false);
  const [postsIsError, setPostsIsError] = useState(false);

  useEffect(() => {
    if (user) {
      getPosts();
    }
    else {
    }
  }, [reCallGetPosts]);

  async function getPosts() {
    try {
      const response = await API.get('theWallApi', '/posts');
      setPosts(response.data.Items.sort((a, b) => b.creationDate - a.creationDate)); //order descending
      setPostsIsError(false);
    } catch (err) {
      setPostsIsError(true);
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
              subheader={(new Date(x.creationDate)).toLocaleDateString()}
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
                heartedUsernames={x.heartedUsernames}
                postId={x.id}
                username={user.username}
                timesHearted={x.hearted}
                isHeartedByUser={x.heartedUsernames.indexOf(user.username) >= 0}
                creationDate={x.creationDate}
              />
            </CardActions>
          </Card>
        </Grid>
      ))
  }

  if (!user) {
    return (<Redirect to={SIGNINURL} />);
  }

  return (
    <div>
      <TitleBar />
      <Grid container direction="column" spacing={2}>
        <Grid item container justify="center">
          <Grid item xs={0} sm={2} />
          <Grid item xs={11} sm={8}>
            <Grid container direction="column" spacing={2} >
              <Grid item>
                <NewPostCard
                  username={user.username}
                  refreshPosts={() => setReCallGetPosts(currentState => !currentState)}
                />
              </Grid>
              {posts ?
                mapPosts(posts)
                :
                postsIsError ? <ErrorContent /> : ''}
            </Grid>
          </Grid>
          <Grid item xs={0} sm={2} />
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;