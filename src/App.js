import React, { Component } from 'react';
import './App.css';
import Form from './components/Form';
import Weather from './components/Weather';
import Header from './components/Header';
const key = '8e0a9d7809e51984fbfc4e1ada1d6265';

class App extends Component {
  state = {
    city: undefined,
    country: undefined,
    temp: undefined,
    condition: undefined,
    humidity: undefined,
    icon: undefined,
    unit: 'C'
  };

  fetchWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;

    if (city) {
      try {
        const call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`);

        const data = await call.json();

        console.log(data);

        this.setState({
          city: data.name,
          country: data.sys.country,
          temp: data.main.temp,
          humidity: data.main.humidity,
          condition: data.weather[0].description,
          icon: data.weather[0].icon
        });
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
    const call = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=London&appid=${key}`);
    const data = await call.json();
    console.log(data);
  };

  componentDidMount() {
    this.testFetch();
  }

  render() {
    const { unit } = this.state;

    return (
      <div>
        <header>
          <h1>Weather app</h1>
          <form onChange={this.handleUnits}>
            <input type='radio' value='C' name='unit' checked={unit === 'C'} />C
            <input type='radio' value='F' name='unit' checked={unit === 'F'} />F
          </form>
        </header>

        <Form loadWeather={this.fetchWeather} />
        <Weather {...this.state} />
      </div>
    );
  }
}

export default App;
