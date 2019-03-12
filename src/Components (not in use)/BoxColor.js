import React from 'react';
import './IdCard.css';
const Component = React.Component;

class BoxColor extends Component {
  render() {
    const divStyle = {
      'background-color': `rgb(${this.props.r}, ${this.props.g}, ${this.props.b})`,
    };
    return (
      <div className='box' style={divStyle}>
        <p>
          {divStyle['background-color']}
          <br />
          {"#" + ((1 << 24) + (this.props.r << 16) + (this.props.g << 8) + this.props.b).toString(16).slice(1)};
        </p>
      </div>
        );
      }
    }
    
export default BoxColor;