import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
/* Auth */
import Signup from './auth/Signup.js';
import Login from './auth/Login.js';
/*Pages*/
import Home from './Home.js';
import GetMood from  './GetMood.js';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: {},
      emotion:null
    }
  }
  setEmotion = (data) =>{
    this.setState({
      emotion:data
    })
    console.log("emotion",this.state.emotion);
  }
  render() {
    return (
      <div className="App">
        <Router>
          <div>
             <div className="space">
                <Route exact path="/" component={() => (<Home user={this.state.user} />)} />
                <Route exact path="/getmood" component={() => (<GetMood setEmotion={this.setEmotion} user={this.state.user} />)} />
              </div>
            </div>
          </Router>
      </div>
    );
  }
}

export default App;
