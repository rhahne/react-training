import React, {Component} from 'react';
import './IdCard.css';

class Greetings extends Component {
  render() {
    let greeting = {
      "de": "Hallo",
      "en": "Hello",
      "fr": "Bonjour",
      "es": "Hola"
    }
    return (
      <div className='box'>
        {greeting[this.props.lang]}, {this.props.children}!
      </div>
        );
      }
    }
    
export default Greetings;