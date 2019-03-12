import React, { Component } from 'react';
import './IdCard.css';

class IdCard extends Component {
  render() {
    return (
      <div class="IdCard box">
        <div class="left">
          <img src={this.props.picture} alt="randomImage" />
        </div>
        <div class="right">
          <ul>
            <li><strong>First name: </strong>{this.props.firstName}</li>
            <li><strong>Last name: </strong>{this.props.lastName}</li>
            <li><strong>Gender: </strong>{this.props.gender}</li>
            <li><strong>Height: </strong>{this.props.height}</li>
            <li><strong>Birth: </strong>{this.props.birth.toDateString()}</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default IdCard;