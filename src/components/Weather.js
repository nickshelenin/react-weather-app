import React from 'react';

const Weather = (props) => {
  const convertUnits = () => {
    return (2 * 9) / 5 + 32;
  };

  return (
    <div>
      {props.city && props.country && (
        <p>
          {props.city}, {props.country}
        </p>
      )}
      {props.temp && <p>Temperature: {props.unit === 'F' ? Math.round((props.temp * 9) / 5 + 32) + '°F' : Math.round(props.temp) + '°C'}</p>}

      {props.humidity && <p>Humidity: {props.humidity} %</p>}
      {props.condition && <p> {props.condition}</p>}
      {props.icon && <img src={`http://openweathermap.org/img/wn/${props.icon}@2x.png`} />}
    </div>
  );
};

export default Weather;
