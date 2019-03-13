import React, { Component } from 'react';
import './App.css';
import Facebook from './Facebook.js'
import profiles from './data/berlin.json'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Reacting</h1>

        <h2>Profiles</h2>

        <Facebook profiles={profiles} />

        <h2>Component 1: IdCard</h2>
        <div className="components">
          <IdCard
            lastName='Doe'
            firstName='John'
            gender='male'
            height={178}
            birth={new Date("1992-07-14")}
            picture="https://randomuser.me/api/portraits/men/44.jpg"
          />
          <IdCard
            lastName='Delores '
            firstName='Obrien'
            gender='female'
            height={172}
            birth={new Date("1988-05-11")}
            picture="https://randomuser.me/api/portraits/women/44.jpg"
          />

          <h2>Component 2: Greetings</h2>
          <Greetings lang="de">Ludwig</Greetings>
          <Greetings lang="fr">François</Greetings>

          <h2>Component 3: Random</h2>
          <Random min={1} max={6} />
          <Random min={1} max={100} />

          <h2>Component 4: BoxColor</h2>
          <BoxColor r={255} g={0} b={0} />
          <BoxColor r={128} g={255} b={0} />

          <h2>State 1: LikeButton</h2>
          <LikeButton />
          <LikeButton />

          <h2>State 2: Dice</h2>
          <Dice />

          <h2>State 3: Carousel</h2>
          <Carousel
            imgs={["https://randomuser.me/api/portraits/women/1.jpg", "https://randomuser.me/api/portraits/men/1.jpg", "https://randomuser.me/api/portraits/women/2.jpg", "https://randomuser.me/api/portraits/men/2.jpg"]} />

          <h2>State 4: List and Keys</h2>
          <NumbersTable limit={20} />

          <h2>Lifting State Up 1: RGBColorPicker</h2>
          <RGBColorPicker />

        </div>
      </div>
    );
  }
}

export class IdCard extends Component {
  render() {
    return (
      <div className="IdCard box">
        <div className="left">
          <img src={this.props.picture} alt="randomImage" />
        </div>
        <div className="right">
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

export class Greetings extends Component {
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

export class Random extends Component {
  render() {
    let randomNumber = Math.floor(Math.random() * this.props.max) + this.props.min;
    return (
      <div className='box'>
        <p>Random value between {this.props.min} and {this.props.max} => {randomNumber}</p>
      </div>
    );
  }
}

export class BoxColor extends Component {
  render() {
    const divStyle = {
      'backgroundColor': `rgb(${this.props.r}, ${this.props.g}, ${this.props.b})`,
    };
    return (
      <div className='box' style={divStyle}>
        <p>
          {divStyle['backgroundColor']}
          <br />
          {"#" + ((1 << 24) + (this.props.r << 16) + (this.props.g << 8) + this.props.b).toString(16).slice(1)};
        </p>
      </div>
    );
  }
}

export class LikeButton extends Component {
  constructor(props) {
    super(props);
    // Define your state object here
    this.state = {
      likes: 0
    }
    this.colors = ['purple', 'blue', 'green', 'yellow', 'orange', 'red']

    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState(() => ({
      likes: this.state.likes + 1
    }));
  }
  render() {
    let colorIndex = this.state.likes % this.colors.length
    return (
      <button
        onClick={this.handleClick}
        style={{
          backgroundColor: this.colors[colorIndex],
          color: 'white',
        }}>{this.state.likes} Likes</button>
    );
  }
}

export class Dice extends Component {
  constructor(props) {
    super(props);
    // Define your state object here
    this.state = {
      dice: this.getRandomImg()
    }
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState(() => ({
      dice: 0
    }));
    setTimeout(() => {
      this.setState(() => ({
        dice: this.getRandomImg()
      }));
    }, 1000);
  }
  getRandomImg() {
    this.diceImgs = ['img/dice1.png', 'img/dice2.png', 'img/dice3.png', 'img/dice4.png', 'img/dice5.png', 'img/dice6.png']
    return
  }
  render() {
    var src;
    if (this.state.dice === 0) {
      src = "img/dice-empty.png"
    } else {
      src = this.diceImgs[Math.floor(Math.random() * this.diceImgs.length)]
    }
    return (
      <img
        onClick={this.handleClick}
        src={src}
        width="200"
        alt="dice" />
    );
  }
}

export class Carousel extends Component {
  constructor(props) {
    super(props);
    // Define your state object here
    this.state = {
      imgSource: 0
    }
    this.allImgs = this.props.imgs
  }
  getNextImg() {
    if (this.state.imgSource === 0) {
      this.setState({ imgSource: this.allImgs.length - 1 });
    } else {
      this.setState({ imgSource: this.state.imgSource - 1 });
    }
  }
  getLastImg() {
    if (this.state.imgSource === this.allImgs.length - 1) {
      this.setState({ imgSource: 0 });
    } else {
      this.setState({ imgSource: this.state.imgSource + 1 });
    }
  }
  render() {
    return (
      <div>
        <button onClick={() => { this.getNextImg() }}>Links</button>
        <button onClick={() => { this.getLastImg() }}>Rechts</button>
        <br />
        <img src={this.allImgs[this.state.imgSource]} alt="randomImg" />
      </div>
    )
  }
}

export class NumbersTable extends Component {
  render() {
    var rows = [];
    var amountOfNumbers = this.props.limit;
    for (var i = 1; i < amountOfNumbers + 1; i++) {
      if (i % 2 === 0) {
        rows.push(<div className="numberBox even">{i}</div>);
      } else {
        rows.push(<div className="numberBox">{i}</div>);
      }

    }
    return (
      <div className="numberContainer">
        {rows}
      </div>
    )
  }
}

export class RGBColorPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rValue: Math.floor(Math.random() * 255) + 0,
      gValue: Math.floor(Math.random() * 255) + 0,
      bValue: Math.floor(Math.random() * 255) + 0
    }
    this.changeColor = this.changeColor.bind(this);
  }
  changeColor(event) {
    var newColorValue = event.currentTarget.value;
    var color = event.currentTarget.id;
    switch (color) {
      case 'r':
        this.setState({ rValue: newColorValue });
        break;
      case 'g':
        this.setState({ gValue: newColorValue });
        break;
      case 'b': 
        this.setState({ bValue: newColorValue });
        break;
      default:
        break;
    }
  }
  render() {
    var divStyle = {
      backgroundColor: 'rgb('+this.state.rValue.toString() + ',' + this.state.gValue.toString() + ',' + this.state.bValue.toString()+')',
      padding: '200px'
    }
    return (
      <div style={divStyle}>
        <ColorValue changeColor={this.changeColor} colorNr='1' color='r' colorValue={this.state.rValue} />
        <ColorValue changeColor={this.changeColor} colorNr='2' color='g' colorValue={this.state.gValue} />
        <ColorValue changeColor={this.changeColor} colorNr='3' color='b' colorValue={this.state.bValue} />
      </div>
    )
  }
}

export class ColorValue extends Component {
  render() {
    var rgb = ['0','0'];
    for(var i = 0; i < 3; i++){
      if (this.props.colorNr === (i+1).toString()) rgb.splice(i, 0, this.props.colorValue)
    }
    var divStyle = {
      backgroundColor: 'rgb('+[...rgb]+')'
    };
    return (
      <div className="colorContainer">
        <span className="colorBox" style={divStyle}>{this.props.color}</span>
        <input type="number" min="0" max="255" onChange={this.props.changeColor} value={this.props.colorValue} id={this.props.color}/><br />
      </div>
    )
  }
}


export default App;