import React from "react";
import Carousel from "nuka-carousel";
import placement from "../images/placement.png";
import tests from "../images/tests.png";
import online from "../images/online.png";

export default class extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let display = this.props.block === false ? "block" : "none";
    return (
      <div style={{ gridRow: 2, width: "100vw", display: display }}>
        <Carousel>
          <img src={placement} style={{ height: "85vh" }} />
          <img src={tests} style={{ height: "85vh" }} />
          <img src={online} style={{ height: "85vh" }} />
        </Carousel>
      </div>
    );
  }
}
