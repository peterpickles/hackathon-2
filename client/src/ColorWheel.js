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
    console.log(e.mood);
}
render() {
    const data = JSON.parse(this.state.emotions);
    const COLORS={
        anger:"#fc0d1b",
        contempt:"#f0daea",
        disgust:"#ddaddd",
        fear:"#149517",
        happiness:"#fee661",
        neutral:"#ffffff",
        sadness:"#8d8ffc",
        surprise:"#5ebefc"
      }
    console.log(typeof data);
    return (
      <div className="color-wheel">
        <PieChart width={410} height={410}>
            <Pie data={data} cx="50%" cy="50%" outerRadius="80%" paddingAngle={2}>
            {
                data.map((entry, index) => {
                    if(COLORS[entry.mood]){
                        return <Cell fill={COLORS[entry.mood]}/>
                    }
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