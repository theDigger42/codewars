import React from "react";
import Carousel from "nuka-carousel";
import placement from "../images/placement.png";
import tests from "../images/tests.png";
import online from "../images/online.png";

export default class extends React.Component {
  render() {
    let display = this.props.block === false ? "block" : "none";
    return (
      <div style={{ gridRow: 2, width: "100vw", display: display }}>
        <Carousel>
          <img src={placement} alt={"image1"} style={{ height: "85vh" }} />
          <img src={tests} alt={"image2"} style={{ height: "85vh" }} />
          <img src={online} alt={"image3"} style={{ height: "85vh" }} />
        </Carousel>
      </div>
    );
  }
}
