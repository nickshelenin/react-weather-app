import React, { Component } from 'react';
import './App.css';
import Form from './components/Form';
import Weather from './components/Weather';

const api_key = '8e0a9d7809e51984fbfc4e1ada1d6265';

class App extends Component {
  state = {
    city: undefined,
    country: undefined,
    temp: undefined,
    humidity: undefined,
    description: undefined
  };

  fetchWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    const call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${api_key}`);
    const data = await call.json();

    if (city && country) {
      this.setState({
        city: data.name,
        country: data.sys.country,
        temp: data.main.temp,
        humidity: data.main.humidity,
        description: data.weather[0].description
      });
    }

    console.log(data);
  };

  render() {
    return (
      <div>
        <h1>Weather App </h1>

        <Form loadWeather={this.fetchWeather} />
        <Weather
          city={this.state.city}
          country={this.state.country}
          temp={this.state.temp}
          humidity={this.state.humidity}
          description={this.state.description}
        />
      </div>
    );
  }
}

export default App;
