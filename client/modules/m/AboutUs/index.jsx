import React from 'react';
import './AboutUs.scss';

class AboutUs extends React.Component{
	render () {
		return (
      <img className="about-us" src={require('./images/about_us.png')}></img>
    );
	}
}

export default AboutUs;
