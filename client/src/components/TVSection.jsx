import React, {Component} from 'react';

class TVSection extends Component{
  render(){
    return(
      <div className="bg-warning" id="tv-section">
        <div className="container">
          <iframe title="youtube-tv" width="86.5%" height="77.2%" src="https://www.youtube.com/embed/ZeDP-rzOnAA" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
      </div>
    )
  }
}

export default TVSection;
