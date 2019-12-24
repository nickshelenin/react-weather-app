import React, { Component } from 'react';

export class Form extends Component {
  render() {
    return (
      <div>
        <form onSubmit={this.props.loadWeather}>
          <input type='text' placeholder='city' name='city' />
          <input type='text' placeholder='country' name='country' />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default Form;
