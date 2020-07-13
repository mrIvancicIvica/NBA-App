import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { URL_TEAMS } from "../utils/Paths";
import { TextField, Grid, CardActionArea, CardMedia } from "@material-ui/core";
import Axios from "axios";
import MyTeamModal from "./MyTeamModal";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    "& > *": {
      margin: theme.spacing(1),
    },

    paddingLeft: theme.spacing(20),
  },
  avatar: {
    width: theme.spacing(30),
    height: theme.spacing(30),
  },
  textField: {
    textAlign: "center",
    paddingTop: theme.spacing(2),
  },

  media: {
    height: 250,
    width: 250,
  },
}));

const Teams = () => {
  const classes = useStyles();
  const [teams, setTeams] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [openModal, setOpenModal] = useState(null);
  const [teamData, setTeamData] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      const { data } = await Axios(URL_TEAMS);

      setTeams(data);
    };

    fetchTeams();
  }, []);

  console.log(teams);

  const showModal = (data) => {
    setTeamData(data)
    setOpenModal(true);
  };

  const filterTeams = teams.filter((team) =>
    team.name.toLowerCase().includes(searchField.toLowerCase())
  );

  const handleChange = (e) => {
    setSearchField(e.target.value);
  };

  const closeModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <div>
      <div className={classes.textField}>
        <TextField
          id="standard-basic"
          label="Search Team"
          type={"text"}
          value={searchField}
          onChange={handleChange}
        />
      </div>

      <div className={classes.root}>
        <Grid container spacing={4}>
          {filterTeams.map((team, i) => (
            <Grid item sm={3} key={i}>
              <CardActionArea>
                <CardMedia
                  onClick={() => showModal(team)}
                  alt={"team"}
                  component={"img"}
                  className={classes.media}
                  image={`/images/teams/${team.logo}`}
                />
              </CardActionArea>
            </Grid>
          ))}
        </Grid>
      </div>
      <MyTeamModal
        teamData={teamData}
        isModalOpen={openModal}
        closedModal={() => closeModal()}
      />
    </div>
  );
};

export default Teams;
