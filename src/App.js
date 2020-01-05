import React, { Component } from 'react';
import './App.css';
import Form from './components/Form';
import Weather from './components/Weather';
import Header from './components/Header';
const key = '8e0a9d7809e51984fbfc4e1ada1d6265';

class App extends Component {
  state = {
    weather: undefined,
    unit: 'C',
    hourForecast: undefined
  };

  fetchWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;

    if (city) {
      try {
        const call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`);
        const data = await call.json();

        this.setState({
          weather: { ...data }
        });

        if (city !== undefined) {
          const call = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&units=metric`);
          const data = await call.json();
          console.log(data.list);

          this.setState({
            hourForecast: data.list
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  handleUnits = (e) => {
    this.setState({
      unit: e.target.value
    });
  };

  testFetch = async () => {
    const call = await fetch(``);
    const data = await call.json();

    console.log(data);
  };

  componentDidMount() {
    // this.fetchWeather();
  }

  render() {
    const { unit } = this.state;

    return (
      <div>
        <header>
          <h1>Weather app</h1>
          <form onChange={this.handleUnits}>
            <input type='checkbox' className='checkbox' value='C' name='unit' checked={unit === 'C'} />
            °C
            <input type='checkbox' className='checkbox' value='F' name='unit' checked={unit === 'F'} />
            °F
          </form>
        </header>

        <Form loadWeather={this.fetchWeather} />
        {this.state.weather !== undefined && <Weather {...this.state} />}
      </div>
    );
  }
}

export default App;
