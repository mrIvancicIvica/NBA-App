import React from "react";
import HomeSlider from "./HomeSlider";
import Subscribe from "../utils/Subscribe";
import Articles from "./Articles";
import Poll from "../utils/Poll";

const Home = () => {
  return (
    <div>
      <HomeSlider />
      <Subscribe />
      <Articles />
      <Poll />
    </div>
  );
};

export default Home;
