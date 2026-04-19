const { cities, buildForecastUrl } = window.weatherUtils;
const cityName = document.querySelector("#current-city-name");
const statusMessage = document.querySelector("#status-message");
const currentTemp = document.querySelector("#current-temp");
const currentCondition = document.querySelector("#current-condition");

async function loadWeather() {
  const response = await fetch(buildForecastUrl(cities.nairobi));
  const data = await response.json();
  cityName.textContent = cities.nairobi.name;
  currentTemp.textContent = `${Math.round(data.current.temperature_2m)}°C`;
  currentCondition.textContent = `Code ${data.current.weather_code}`;
  statusMessage.textContent = "Current weather loaded.";
}

loadWeather();
