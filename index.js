async function loadWeather() {
  const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=-1.2864&longitude=36.8172&current=temperature_2m,weather_code");
  const data = await response.json();
  console.log(data);
}

loadWeather();
