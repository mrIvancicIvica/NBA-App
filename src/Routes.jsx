import React from "react";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Teams from "./components/Teams/Teams";
import Article from "./components/Article/Article";

import { BrowserRouter, Route, Switch } from "react-router-dom";

const Routes = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path={"/"} component={Home} exact />
        <Route path={"/teams"} component={Teams} exact />
        <Route path={"/article/:id"} component={Article} exact />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
