import React, { Component } from 'react';

export class Weather extends Component {
  render() {
    return (
      <div>
        {this.props.city && this.props.country && (
          <p>
            {this.props.city}, {this.props.country}
          </p>
        )}
        {this.props.temp && <p>Temperature: {this.props.temp}</p>}
        {this.props.humidity && <p>Humidity: {this.props.humidity}</p>}
        {this.props.description && <p>Description: {this.props.description}</p>}
      </div>
    );
  }
}

export default Weather;
