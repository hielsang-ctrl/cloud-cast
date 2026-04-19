(function (global) {
  const apiReference = "https://api.open-meteo.com/v1/forecast";
  const cities = {
    nairobi: { name: "Nairobi, Kenya", lat: -1.2864, lon: 36.8172 },
    eldoret: { name: "Eldoret, Kenya", lat: 0.5143, lon: 35.2698 }
  };

  function buildForecastUrl(city) {
    return `${apiReference}?latitude=${city.lat}&longitude=${city.lon}&timezone=Africa%2FNairobi&forecast_days=5&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min`;
  }

  const exported = { apiReference, cities, buildForecastUrl };
  if (typeof module !== "undefined" && module.exports) module.exports = exported;
  global.weatherUtils = exported;
})(typeof window !== "undefined" ? window : globalThis);
