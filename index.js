const { cities, describeWeather, buildForecastUrl, formatTemperature, buildAlert } = window.weatherUtils;
const cityName = document.querySelector("#current-city-name");
const forecast = document.querySelector("#forecast-cards");
const alerts = document.querySelector("#alerts-display");
const status = document.querySelector("#status-message");

async function loadCity(key) {
  try {
    const city = cities[key];
    if (!city) throw new Error("Selected city is not available.");
    const response = await fetch(buildForecastUrl(city));
    if (!response.ok) throw new Error("Weather data could not be loaded.");
    const data = await response.json();
    if (!data.current || !data.daily) throw new Error("Weather data is incomplete.");
    const [text] = describeWeather(data.current.weather_code);
    cityName.textContent = city.name;
    document.querySelector("#current-temp").textContent = formatTemperature(data.current.temperature_2m);
    document.querySelector("#current-condition").textContent = text;
    status.textContent = `Live weather loaded for ${city.name}.`;
    if (alerts) alerts.innerHTML = `<article class="forecast-card"><h3>Weather alert</h3><p>${buildAlert(Math.max(...data.daily.precipitation_probability_max))}</p></article>`;
  } catch (error) {
    if (status) status.textContent = error.message;
  }
}

if (cityName) loadCity("nairobi");
