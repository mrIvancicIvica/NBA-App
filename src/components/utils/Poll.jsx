import React, { useEffect, useState } from "react";
import { URL_TEAMS } from "../utils/Paths";
import Axios from "axios";
import { makeStyles } from "@material-ui/core";
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import cookies from "react-cookies";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 3,
  },
  rootCard: {
    maxWidth: 200,
  },
  media: {
    height: 200,
  },
  pollIcons: {
    paddingLeft: 350,
  },
  text: {
    textAlign: "center",
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Poll = () => {
  const classes = useStyles();
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(true);
  const pollPosition = ["1ST", "2ND", "3RD"];

  const handleClose = (event, reason) => {
    if (reason === "clickAway") {
      return;
    }

    setOpen(false);
  };

  const fetchTeams = async () => {
    const { data } = await Axios(
      `${URL_TEAMS}?poll=true&_sort=count&_order=desc`
    );
    setTeams(data);
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const addVote = (id, count) => {
    const getCookie = cookies.load("vote");

    if (getCookie === undefined) {
      Axios(`${URL_TEAMS}/${id}`, {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        data: JSON.stringify({ count: count + 1 }),
      }).then(() => {
        cookies.save("vote", true);
        fetchTeams();
      });
    } else {
      setError(true);
    }
  };

  return (
    <div>
      <h1 className={classes.text}>Who will be champion?</h1>
      <Grid container justify="center" className={classes.pollIcons}>
        {teams.map((item, i) => (
          <Grid item xs={3} className={classes.head} key={i}>
            <Card
              className={classes.rootCard}
              onClick={() => addVote(item.id, item.count)}
            >
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={`/images/teams/${item.logo}`}
                  component="img"
                  title="teams"
                />
              </CardActionArea>
            </Card>
            <h4>{pollPosition[i]}</h4>
            <h5>{item.count} votes</h5>
          </Grid>
        ))}
      </Grid>
      {error ? (
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="warning">
            Your already vote!
          </Alert>
        </Snackbar>
      ) : null}
    </div>
  );
};

export default Poll;
