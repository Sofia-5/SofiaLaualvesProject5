import React, { Component } from 'react';
import firebase from './firebase';
import House from './House';
import './App.css';

// Listen for a click event when the user clicks on the image part (button), using onClick method 
// Grab specific ID in the object in Firebase to find the correct/matching key of the key associated with the user's chosen image part (button)
// Print the key and value from Firebase to the page ternary operator 

// What do I need? 
  // SVG image with unique key names 
  // Some state!
  // componentDidMount
  // handeClick

  // Home Feature Clicked = selectedHomeFeature
  // Sustainable Alternatives = selectedOption
  
  

class App extends Component {
  constructor() {
    super();
    this.state = {
      selectedHomeFeature: "",
      data: {},
      selectedOption: {},
      nextOption: []
    }
  }

  componentDidMount() { 
    const dbRef = firebase.database().ref();
    dbRef.on('value', (snapshot) => {
          
      this.setState({
        data: snapshot.val(),
      })
    })
  }
  // ask teacher about loading states 

  handleClick = (id) => {
    console.log(id);
 
    // const category = this.state.data[event.target.id]
    const category = this.state.data[id]
  
    this.setState({
      selectedOption: category[Object.keys(category)[0]],
      selectedHomeFeature: Object.keys(category)[0]

    })
  }

  // incrementCounter = (nextObj) => {
  //   const goToNextObject = this.state.data[id] 
  //   this.setState({
  //     nextIndex 
  //   })
  // }

  render () {
    return (

      <div className="App wrapper">
        <h1>A Sustainable Home</h1>


        <House handleClickProp={this.handleClick}/>
        

        {/* <button id="Roof" onClick={this.handleClick}>Roof</button>

        <button id="Windows" onClick={this.handleClick}>Windows</button>

        <button id="Door" onClick={this.handleClick}>Door</button> */}

        { 
        this.state.selectedHomeFeature !== "" ? 
        <div className="displayContainer"> 
          <div className="content">
            <h2>{this.state.selectedHomeFeature}</h2>
            <p>{this.state.selectedOption.Description}</p>
          </div>
          <div className="imgContainer">
            <img src={this.state.selectedOption.Image}/> 
          </div>
        </div> 
        : <p className="instructions">Click on a part of the house or trees above to learn about sustainable features to help save you on your energy bill and help improve the health of our planet.</p>  
        }
      </div>
    );
  }
}

export default App;
