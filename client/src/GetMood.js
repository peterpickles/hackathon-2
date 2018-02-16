import React, { Component } from 'react';
import axios from 'axios';
import dotenv from 'dotenv'
dotenv.config();
class GetMood extends Component {
    constructor(props){
      super(props);
      this.state = {
        img:null,
        txt:""
      }
    }
    handleFormSubmit = (e) =>{
      e.preventDefault();
      axios({ 
        method: 'POST', 
        url: 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=emotion', 
        headers: {
          "Content-Type":"application/json",
          "Ocp-Apim-Subscription-Key":"0e637b6fb8944f5fac5bbae74dc69705"
        }, 
        data: { url: this.state.img } 
      }).then((response)=>{
        console.log(response.data[0].faceAttributes.emotion);
      })
    }
    handleTextChange = (e) =>{
      this.setState({
        txt:e.target.value
      })
    }
    handleImgChange = (e) =>{
      // let img = window.URL.createObjectURL(e.target.files[0]);
      // this.setState({
      //   img:img
      // })
      // console.log(img);
      let file = e.target.files[0];
      var reader = new FileReader();
      reader.onloadend = () =>{
        this.setState({
          img:encodeURIComponent(reader.result)
        })
        console.log(reader.result);
      }
      console.log(reader.readAsDataURL(file));
    }
    render() {
      return (
        <form onSubmit={this.handleFormSubmit} method="POST" className="Mood">
            <h1>The Moodies App</h1>
            <img src="https://d1o50x50snmhul.cloudfront.net/wp-content/uploads/2017/02/15180000/gettyimages-158781036-800x533.jpg" alt="Moodie Logo" className="mood-logo"/>
            <h2>Take a Picture</h2>
            <input onChange={this.handleImgChange} className="mood-img-input" name="img" type="file" accept="image/*" capture="camera" />
            <h2>Write a few words about how you feel</h2>
            <textarea onChange={this.handleTextChange} value={this.state.txt} cols="40" rows="5" className="mood-txt-input" name="txt" type="text"/>
            <input type="submit" className="mood-submit"/>
        </form>
      );
    }
  }
  
  export default GetMood;