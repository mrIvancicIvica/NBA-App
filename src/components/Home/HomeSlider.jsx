import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Axios from "axios";
import { URL_SLIDES } from "../utils/Paths";

const settings = {
  arrows: true,
  dots: true,
  infinite: true,
  speed: 2000,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
};

const HomeSlider = () => {
  let [slides, setSlides] = useState([]);

  useEffect(() => {
    const fetchSlides = async () => {
      const response = await Axios.get(URL_SLIDES);
      setSlides(response.data);
    };
    fetchSlides();
  }, []);

  return (
    <>
      {slides ? (
        <Slider {...settings}>
          {slides.map((item) => (
            <div key={item.id}>
              <div
                className="item_slider"
                style={{
                  background: `url(/images/covers/${item.cover})`,
                }}
              >
                <div className="caption">
                  <h4>{item.topic} </h4>
                  <p>{item.title}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      ) : null}
    </>
  );
};

export default HomeSlider;
