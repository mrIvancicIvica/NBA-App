import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import Logo from "./logo.png";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  color: {
    background:
      "#e0e0e0",
  },
}));

function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.color}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to={"/"}>
              <img src={Logo} alt={"Logo"} />
            </Link>
          </Typography>

          <Button component={Link} to={'/teams'} color="default" variant="outlined">
            Teams
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
