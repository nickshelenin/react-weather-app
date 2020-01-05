import React, { Component } from 'react';

export class Form extends Component {
  render() {
    return (
      <div>
        <form onSubmit={this.props.loadWeather} className='weather-search-form'>
          <input type='text' placeholder='Your city name' name='city' />
          <button>Search</button>
        </form>
      </div>
    );
  }
}

export default Form;
