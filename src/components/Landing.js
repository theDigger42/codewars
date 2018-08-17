import React from 'react';
import Carousel from 'nuka-carousel';
import placement from '../images/placement.png'
import example from '../images/example.png'
import users from '../images/users.png'

export default class extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    let display = this.props.block === false ? 'block' : 'none'
    return (
      <div style={{gridRow: 2, width: '100vw', display: display}}>
        <Carousel>
          <img src={placement} style={{height: '85vh'}}/>
          <img src={example} style={{height: '85vh'}}/>
          <img src={users} style={{height: '85vh'}}/>
        </Carousel>
      </div>
    );
  }
}

