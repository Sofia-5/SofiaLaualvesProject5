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
      nextOption: [],
      selectedAlternatives: [],
      currentIndex: 0
    }
  }

  componentDidMount() { 
    const dbRef = firebase.database().ref();
    dbRef.on('value', (snapshot) => {
      const data = snapshot.val();
      console.log(data)
          

      const nextOptionArray = []; 

      for (let selectedCategory in data) {
        const nextOptionObject = {
          category: selectedCategory,
          selectedHomeFeature: selectedCategory.sAlternatives[0]
        }
        nextOptionArray.push(nextOptionObject)
      }
      console.log(nextOptionArray)

      this.setState({
        data: snapshot.val(),
        nextOption: nextOptionArray
        
      })
    })
  }
  // ask teacher about loading states 

  handleClick = (id) => {
    console.log(id);
 
    // const category = this.state.data[event.target.id]
    const category = this.state.data[id]
    
    this.setState({
      selectedCategory: id,
      selectedOption: category[Object.keys(category)[0]],
      selectedHomeFeature: Object.keys(category)[0],
      selectedAlternatives: Object.keys(category)
    })
  }
  
  // clickOtherOptions = () => {
    
  //   const category = this.state.data[this.state.selectedCategory]
  //   console.log(category)
  //   if (Object.keys(category).length > this.state.currentIndex) return 
    
  //   console.log(this.state.currentIndex)
  //   this.setState({
  //     selectedOption: category[Object.keys(category)[this.state.currentIndex]],
  //     selectedHomeFeature: Object.keys(category)[this.state.currentIndex],
  //     selectedAlternatives: Object.keys(category),
  //     currentIndex: this.state.currentIndex + 1
  //   })
  // }

  render () {
    return (

      <div className="App wrapper">
        <h1>A Sustainable Home</h1>

        <House handleClickProp={this.handleClick}/>

        { 
        this.state.selectedHomeFeature !== "" ? 
      
        <div className="displayCategory"> 
          <div className="flex">
            <h2> Selected: {this.state.selectedCategory} </h2>
            <button onClick={this.clickOtherOptions}>Other Options</button>
          </div>
          <div className="displayContainer">
            <div className="content">
              <h2>{this.state.selectedHomeFeature}</h2>
              <p>{this.state.selectedOption.Description}</p>
            </div>
            <div className="imgContainer">
              <img src={this.state.selectedOption.Image}/> 
            </div>
          </div>
        </div> 
        : <p className="instructions">Click on a part of the house or trees above to learn about sustainable features to help save you on your energy bill and help improve the health of our planet.</p>  
        }
      </div>
    );
  }
}

export default App;
