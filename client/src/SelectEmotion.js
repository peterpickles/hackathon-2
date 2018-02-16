import React, { Component } from 'react';
import { PieChart, Pie, Sector, Cell, Tooltip} from 'recharts';
import axios from 'axios';
 
class ColorWheel extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedEmotion:localStorage.getItem("hackathon-selected-emo"),
            color:localStorage.getItem("hackathon-selected-clr")
        }
    }
render() {
    var s = {
        background:this.state.color
    }
    return (
      <div style={s}  className="select-emotion">
        <h2 className="emotion-label"> When you're feeling {this.state.selectedEmotion}, Try this:</h2>
        <ul className="emotion-list">
            <li className="emotion-option">Sample Option</li>
            <li className="emotion-option">Sample Option</li>
            <li className="emotion-option">Sample Option</li>
            <li className="emotion-option">Sample Option</li>
        </ul>
      </div>
    );
  }
}
export default ColorWheel;