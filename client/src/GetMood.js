import React, { Component } from 'react';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
class GetMood extends Component {
    constructor(props){
      super(props);
      this.state = {
        img:null,
        emotions:null
      }
    }
    handleFormSubmit = (e) =>{
      e.preventDefault();
        if(this.state.img !== null){
          document.getElementsByClassName("Mood")[0].innerHTML = "Loading"; //Set loading wheel here
          axios({ 
            method: 'POST', 
            url: 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=emotion', 
            headers: {
              "Content-Type":"application/octet-stream",
              "Ocp-Apim-Subscription-Key": process.env.REACT_APP_API_KEY
            }, 
            data: this.state.img ,
            processData: false
          }).then((response)=>{
            let emotionsArr = [];
            let emotions = response.data[0].faceAttributes.emotion;
            for(let key in emotions){
              if(emotions[key] > 0){
                emotionsArr.push({
                  mood:key,
                  value:emotions[key]
                })
              }
            }
            this.props.setEmotion(emotionsArr);
            console.log(emotionsArr);
            localStorage.setItem('hackathon-emotions', JSON.stringify(emotionsArr));
            window.location.href = "/colorwheel";
          })
      }
    }
    handleImgChange = (e) =>{
      /*Blob*/
      // let img = window.URL.createObjectURL(e.target.files[0]);
      // this.setState({
      //   img:img
      // })
      // console.log(img);
      /*Binary*/
      // let file = e.target.files[0];
      // var reader = new FileReader();
      // reader.onloadend = () =>{
      //   this.setState({
      //     img:reader.result
      //   })
      //   console.log(reader.result);
      // }
      // console.log(reader.readAsDataURL(file));
      /*Stuff*/
      this.setState({
        img:e.target.files[0]
      })
    }
    
    makeblob = function (dataURL) {
                var BASE64_MARKER = ';base64,';
                if (dataURL.indexOf(BASE64_MARKER) == -1) {
                    var parts = dataURL.split(',');
                    var contentType = parts[0].split(':')[1];
                    var raw = decodeURIComponent(parts[1]);
                    return new Blob([raw], { type: contentType });
                }
                var parts = dataURL.split(BASE64_MARKER);
                var contentType = parts[0].split(':')[1];
                var raw = window.atob(parts[1]);
                var rawLength = raw.length;

                var uInt8Array = new Uint8Array(rawLength);

                for (var i = 0; i < rawLength; ++i) {
                    uInt8Array[i] = raw.charCodeAt(i);
                }

                return new Blob([uInt8Array], { type: contentType });
            }
    render() {
      return (
        <form onSubmit={this.handleFormSubmit} method="POST" className="Mood">
            <h1>The Moodies App</h1>
            <img src="https://d1o50x50snmhul.cloudfront.net/wp-content/uploads/2017/02/15180000/gettyimages-158781036-800x533.jpg" alt="Moodie Logo" className="mood-logo"/>
            <h2>Take a Picture</h2>
            <input onChange={this.handleImgChange} className="mood-img-input" name="img" type="file" accept="image/*" capture="camera" />
            <input type="submit" className="mood-submit"/>
        </form>
      );
    }
  }
  
  export default GetMood;