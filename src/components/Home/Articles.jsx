import React, { useState, useEffect } from "react";
import { URL_POSTS } from "../utils/Paths";
import Axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Divider,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  cards: {
    textAlign: "center",
    color: theme.palette.text.secondary,
    margin: "30px 30px",
  },
  decoration: {
    textDecoration: "none",
  },
}));

const Articles = () => {
  const classes = useStyles();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const { data } = await Axios(URL_POSTS);
      setPosts(data);
    };
    fetchArticles();
  }, []);

  return (
    <div>
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="center"
      >
        {posts.map((post, i) => (
          <Grid item xs={4} key={i}>
            <Card className={classes.cards}>
              <CardActionArea>
                <Link to={`/article/${post.id}`} className={classes.decoration}>
                  <CardMedia
                    component="img"
                    alt="player"
                    height="700"
                    image={`/images/blocks/${post.image}`}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant={"h6"}
                      component={"h6"} 
                      color={"error"}
                    >
                      {post.title}
                    </Typography>
                    <Divider />
                    <Typography
                      variant={"body2"}
                      color={"textSecondary"}
                      component={"p"}
                    >
                      {post.desc}
                    </Typography>
                  </CardContent>
                </Link>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Articles;
