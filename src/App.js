import React, { Component } from 'react';
import firebase from './firebase';
import './App.css';

// Listen for a click event when the user clicks on the image part, using onClick method 
// filter() through my array in Firebase to find the correct/matching property/key of the property/key associated with the user's chosen image part
// Print the property/key and value from Firebase to the page, using .map()

// What do I need? 
  // SVG image with unique property/key names 
  // Some state!
  // componentDidMount

  // Home Feature Clicked = selectedHomeFeature
  // Sustainable Alternatives = option
  
  

class App extends Component {
  constructor() {
    super();
    this.state = {
      selectedHomeFeature: [],
      data: {},
      selectedOption: {}
    }
  }

  componentDidMount() { 
    const dbRef = firebase.database().ref();
    dbRef.on('value', (snapshot) => {
      const data = snapshot.val();
      console.log( data );
      
      this.setState({
        data,
      })
    })
  }
  // ask teacher about loading states 

  handleClick = (event) => {
    console.log(event.target.id);
    const category = this.state.data[event.target.id]
    const selectedOptionTitle = Object.keys(category)[0]
    const selectedOption = category[Object.keys(category)[0]]
  
    this.setState({
      selectedOption, selectedOptionTitle,
    })
  }

  render () {
    return (

      <div className="App">
        <h1>A Sustainable Home</h1>
        <button id="Roof" onClick={this.handleClick}>Roof</button>

        { 
        this.state.selectedOption? 
        <div className="displayContainer"> 
          <div className="content">
            <h2>{this.state.selectedOptionTitle}</h2>
            <p> {this.state.selectedOption.Description}</p>
          </div>
          <img src={this.state.selectedOption.Image}/> 
        </div> 
        : null  
        }
      </div>
    );
  }
}

export default App;
