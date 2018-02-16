import React, { Component } from 'react';

class GetMood extends Component {
    render() {
      return (
        <form className="Mood">
            <h1>The Moodies App</h1>
            <img src="https://d1o50x50snmhul.cloudfront.net/wp-content/uploads/2017/02/15180000/gettyimages-158781036-800x533.jpg" alt="Moodie Logo" class="mood-logo"/>
            <h2>Take a Picture</h2>
            <input class="mood-img-input" name="img" type="file" accept="image/*" capture="camera" />
            <h2>Write a few words about how you feel</h2>
            <textarea  cols="40" rows="5" class="mood-txt-input" name="txt" type="text"/>
            <input type="submit" class="mood-submit"/>
        </form>
      );
    }
  }
  
  export default GetMood;