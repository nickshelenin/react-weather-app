import React from 'react';

const Weather = (props) => {
  const unixConverter = (timestamp) => {
    const date = new Date(timestamp * 1000);
    var formattedDate = ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
    return formattedDate;
  };

  const unitsConverter = (unit) => {
    const data = (unit * 9) / 5 + 32;
    return data;
  };

  const capitalizeFirstLetter = (letter) => {
    return letter.charAt(0).toUpperCase() + letter.slice(1);
  };

  const sliceString = (string) => {
    return string.slice(0, 16);
  };

  const sliceCel = (unit) => {
    let string = unit.toString();
    for (let i = 0; i < string.length; i++) {
      return string.slice(0, 3);
    }
  };

  const sliceFar = (unit) => {
    let string = unit.toString();
    for (let i = 0; i < string.length; i++) {
      return string.slice(0, 4);
    }
  };

  const city = props.weather.name;
  const country = props.weather.sys.country;
  const temp = props.weather.main.temp;
  const condition = props.weather.weather[0].description;
  const unit = props.unit;
  const icon = props.weather.weather[0].icon;
  const sunrise = props.weather.sys.sunrise;
  const sunset = props.weather.sys.sunset;
  const humidity = props.weather.main.humidity;
  const pressure = props.weather.main.pressure;

  return (
    <>
      {city && country && (
        <>
          <h1 className='text--orange mb'>Current weather and forecasts in any city</h1>

          <div className='weather-container'>
            <div className='main-weather-container'>
              <h2>
                Weather in {city}, {country}
              </h2>

              <h1 className='flex'>
                <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} />
                {unit === 'F' ? Math.round(unitsConverter(temp)) + '°F' : Math.round(temp) + '°C'}
              </h1>
              <p> {capitalizeFirstLetter(condition)}</p>
              <p>
                {new Date().getHours() + ':' + new Date().getMinutes() + ' '}
                {new Date().toLocaleString('default', { month: 'long' }) + ' ' + new Date().getDate()}
              </p>

              <table className='weather-table'>
                <tbody>
                  <tr>
                    <td className='weather-table__data'>Wind</td>
                    <td>{props.weather.wind.speed} m/s</td>
                  </tr>

                  <tr>
                    <td>Cloudiness</td>
                    <td>{condition}</td>
                  </tr>

                  <tr>
                    <td>Pressure</td>
                    <td>{pressure} hpa</td>
                  </tr>

                  <tr>
                    <td>Humidity</td>
                    <td>{humidity} %</td>
                  </tr>

                  <tr>
                    <td>Sunrise</td>
                    <td>{unixConverter(sunrise)}</td>
                  </tr>

                  <tr>
                    <td>Sunset</td>
                    <td>{unixConverter(sunset)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div>
              <h2 className='mb'>
                Hourly weather and forecasts in {city}, {country}
              </h2>

              {props.hourForecast !== undefined &&
                props.hourForecast.map((forecast) => {
                  return (
                    <table className='forecast-table'>
                      <tr className='forecast-table__row'>
                        <td className='forecast-table__data'>
                          {sliceString(forecast.dt_txt)}
                          <img className='forecast-table__image' src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`} />
                        </td>
                      </tr>

                      <tr className='forecast-table__row forecast-table__row--right'>
                        <td className='forecast-table__data--right'>
                          <div className='data--top'>
                            <span className='bg--dark'>
                              {unit === 'F' ? sliceFar(unitsConverter(forecast.main.temp)) + '°F' : sliceCel(forecast.main.temp) + '°C'}
                            </span>
                            <span className='text--italic'>{forecast.weather[0].description}</span>
                          </div>
                          <div className='data--bottom'>
                            <span>{forecast.wind.speed}, m/s</span>
                            <span>
                              clouds: {'  '}
                              {forecast.clouds.all} %
                            </span>
                            <span>{forecast.main.pressure} hpa</span>
                          </div>
                        </td>
                      </tr>
                    </table>
                  );
                })}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Weather;
