import React from 'react'
import Layouts from './../components/Layouts/layout';

const About = () => {
  return (
    <Layouts>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/img/about.jpg"
            alt="about"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
        <h3>
          <p className="text-justify mt-2">
          CricScore is an Indian cricket news website owned by Times Internet. It features, news, articles and live coverage of cricket matches including videos, text commentary, player stats and team rankings. Their website also offers a mobile app.
          </p>
          
          </h3>
        </div>
      </div>
    </Layouts>
  );
};

export default About;