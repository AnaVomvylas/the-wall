import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Card, CardHeader, Avatar, CardContent, CardActions, IconButton, Divider, ToggleButton } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { deepOrange } from '@material-ui/core/colors';
import HeartButton from './HeartButton';
import { Auth } from 'aws-amplify'


const useStyles = makeStyles((theme) => ({
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  }
}));

const Home = (props) => {
  const classes = useStyles();

  useEffect(() => {
    Auth, 
  }, []);


  const samplePost =
    <Grid item>
      <Card key={"username_here"}>
        <CardHeader
          avatar={
            <Avatar className={classes.orange}>AV</Avatar>
          }
          title="Anastasis Vomvylas"
        />
        <Divider variant="middle" />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime quas commodi facilis sequi voluptatum saepe quaerat enim quo esse corporis laudantium, delectus, suscipit quasi praesentium tempore, fugiat dolores odio? Magnam?
           </Typography>
        </CardContent>
        <Divider variant="middle" />
        <CardActions disableSpacing>
          <HeartButton />
        </CardActions>
      </Card>
    </Grid>
    ;

  const multiplePosts = Array(50).fill().map(x => x = samplePost);

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item container>
        <Grid item xs={false} sm={2} />

        <Grid item xs={12} sm={8}>
          <Grid container direction="column" spacing={2}>
            {multiplePosts}
          </Grid>
        </Grid>

        <Grid item xs={false} sm={2} />
      </Grid>
    </Grid>
  );
}

export default Home;