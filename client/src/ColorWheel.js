import React, { Component } from 'react';
import { PieChart, Pie, Sector, Cell, Tooltip} from 'recharts';
import axios from 'axios';
 
class ColorWheel extends Component {
    constructor(props){
        super(props);
        this.state = {
            emotions:localStorage.getItem("hackathon-emotions")
        }
    }
handleChartClick = (e) =>{
    localStorage.setItem('hackathon-selected-emo', e.name);
    localStorage.setItem('hackathon-selected-clr', e.fill);
    window.location.href = "/helpemotion";
}
render() {
    const data = JSON.parse(this.state.emotions);
    const COLORS={
        anger:"#fc0d1b",
        contempt:"#f0daea",
        disgust:"#ddaddd",
        fear:"#149517",
        happiness:"#fee661",
        neutral:"#cfd2d6",
        sadness:"#8d8ffc",
        surprise:"#5ebefc"
      }
    console.log(typeof data);
    return (
      <div className="color-wheel">
        <h1 className="color-wheel-label">Are you feeling...</h1>
        <PieChart width={410} height={410}>
            <Pie onClick={this.handleChartClick} data={data} cx="45%" cy="45%" outerRadius="80%" paddingAngle={2}>
            {
                data.map((entry, index) => {
                        return <Cell fill={COLORS[entry.name]}/>
                })
            }
            </Pie>
            <Tooltip/>
        </PieChart>
      </div>
    );
  }
}
export default ColorWheel;