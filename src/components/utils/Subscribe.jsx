import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { URL_SUBS } from "./Paths";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "65ch",
    },
  },
  centred: {
    textAlign: "center",
    padding: " 60px 90px",
  },
}));

const Subscribe = () => {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [label, setLabel] = useState("Input Your Mail");

  const saveSubscription = () => {
    Axios.get(`${URL_SUBS}?email=${email}`).then((response) => {
      if (!response.data.length) {
        Axios(URL_SUBS, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          data: JSON.stringify({ email }),
        }).then((response) => {
          setEmail("");
          setLabel("Successful!");
          backToBasic();
        });
      } else {
        setLabel("You already signed up");
        alert("You already signed up");
      }
    });
  };

  const backToBasic = () => {
    setTimeout(() => {
      setError(false);
      setLabel("Input Your Mail");
    }, 3000);
  };

  const emptyField = () => {
    if (email.length === 0) {
      setError(true);
      setLabel("Check you Email");
    } else {
      setError(true);
      setLabel("Please check your mail");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const regex = /^\S+@\S+\.\S+$/;

    if (regex.test(email)) {
      saveSubscription();
    } else {
      setLabel("Your mail its validate");
      emptyField();
      backToBasic();
    }
  };

  const onInputChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <div className={classes.centred}>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          id="outlined-basic"
          label={label}
          variant="outlined"
          value={email}
          error={error}
          onChange={onInputChange}
        />
      </form>
    </div>
  );
};

export default Subscribe;
