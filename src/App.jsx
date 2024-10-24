import React, { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [cityData, setCityData] = useState();
  const [error, setError] = useState("");

  const getWeatherData = async () => {
    // check if the input field is blank
    if (document.getElementById("input").value === "") {
      setError("Please enter city!");
      return;
    }

    const request = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ENTER_YOUR_OWN_DATA&units=imperial`
    );
    const data = await request.json();

    if (data.cod != 200) {
      setError("Error fetching data, please try again.");
      setCityData([]);
    } else {
      setCityData(data);
      console.log(data);
      setError("");
    }
  };

  return (
    <div>
      <h1>React Weather App</h1>
      <div>
        <input
          value={input}
          id="input"
          onChange={(e) => {
            setInput(e.target.value);
          }}
          type="text"
          placeholder="Enter city name!"
        ></input>
        <button onClick={getWeatherData}>Search</button>
        {cityData && error === "" ? (
          <div>
            <h2>
              {cityData.name}, {cityData.sys.country}
            </h2>
            <h2>Temp: {cityData.main.temp}</h2>
            <h2>Feels like: {cityData.main.feels_like}</h2>
            <h2>Low today: {cityData.main.temp_min}</h2>
            <h2>High today: {cityData.main.temp_max}</h2>
            <h2>Weather: {cityData.weather[0].description}</h2>
          </div>
        ) : null}

        {error ? <h2>{error}</h2> : null}
      </div>
    </div>
  );
}

export default App;
