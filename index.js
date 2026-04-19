const cityName = document.querySelector("#current-city-name");
const statusMessage = document.querySelector("#status-message");
const currentTemp = document.querySelector("#current-temp");
const currentCondition = document.querySelector("#current-condition");

async function loadWeather() {
  const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=-1.2864&longitude=36.8172&current=temperature_2m,weather_code");
  const data = await response.json();
  cityName.textContent = "Nairobi, Kenya";
  currentTemp.textContent = `${Math.round(data.current.temperature_2m)}°C`;
  currentCondition.textContent = `Code ${data.current.weather_code}`;
  statusMessage.textContent = "Current weather loaded.";
}

loadWeather();
