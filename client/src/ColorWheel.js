import React, { Component } from 'react';
import { PieChart, Pie, Sector, Cell, Tooltip} from 'recharts';
import axios from 'axios';
 
class ColorWheel extends Component {
constructor(props){
    super(props);
    this.state = {
      img:null,
      emotions:null
    }
  }
render() {
    const data = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
                  {name: 'Group C', value: 300}, {name: 'Group D', value: 200}];
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']; 
    return (
      <div className="color-wheel">
            <PieChart width={410} height={410}>
                <Pie data={data} cx="45%" cy="45%" outerRadius="80%" /*fill="darkBlack"*/ paddingAngle={2}>
                    {data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)}
                </Pie>
            <Tooltip/>
        </PieChart>
      </div>
    );
  }
}
export default ColorWheel;