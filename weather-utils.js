(function (global) {
  const apiReference = "https://api.open-meteo.com/v1/forecast";
  const cities = {
    nairobi: { name: "Nairobi, Kenya", lat: -1.2864, lon: 36.8172 },
    eldoret: { name: "Eldoret, Kenya", lat: 0.5143, lon: 35.2698 },
    kisumu: { name: "Kisumu, Kenya", lat: -0.0917, lon: 34.768 },
    nakuru: { name: "Nakuru, Kenya", lat: -0.3031, lon: 36.08 }
  };
  const iconMap = { 0: ["Clear sky", "☀️"], 1: ["Mainly clear", "🌤️"], 2: ["Partly cloudy", "⛅"], 3: ["Overcast", "☁️"], 61: ["Rain", "🌧️"], 80: ["Showers", "🌦️"], 95: ["Thunderstorm", "⛈️"] };

  function describeWeather(code) { return iconMap[code] || ["Cloudy", "☁️"]; }
  function buildForecastUrl(city) { return `${apiReference}?latitude=${city.lat}&longitude=${city.lon}&timezone=Africa%2FNairobi&forecast_days=5&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max`; }
  function formatTemperature(value) { return `${Math.round(value)}°C`; }
  function buildAlert(probability) { return probability >= 70 ? "High rainfall chance expected in the next few days." : "Forecast is stable for the next few days."; }

  const exported = { apiReference, cities, describeWeather, buildForecastUrl, formatTemperature, buildAlert };
  if (typeof module !== "undefined" && module.exports) module.exports = exported;
  global.weatherUtils = exported;
})(typeof window !== "undefined" ? window : globalThis);
