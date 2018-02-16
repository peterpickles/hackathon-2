import React, { Component } from 'react';
import axios from 'axios';
import dotenv from 'dotenv'
require('dotenv').config()
dotenv.config();
class GetMood extends Component {
    constructor(props){
      super(props);
      this.state = {
        img:"https://media.licdn.com/media/AAEAAQAAAAAAAAnAAAAAJDJmYzUwNTU2LTc3YjQtNDNjNC1iMDM3LTBhYjQwMmQ0YWQ0Ng.jpg",
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
          "Ocp-Apim-Subscription-Key":process.env.REACT_APP_API_KEY
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
      let img = e.target.files[0];
      // this.setState({
      //   img:img
      // })
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