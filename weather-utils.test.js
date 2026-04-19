const { cities, describeWeather, buildForecastUrl, formatTemperature, buildAlert } = require('./weather-utils');

test('describeWeather returns a readable label', () => {
  expect(describeWeather(0)).toEqual(["Clear sky", "☀️"]);
});

test('buildForecastUrl includes Nairobi coordinates', () => {
  expect(buildForecastUrl(cities.nairobi)).toContain('latitude=-1.2864');
});

test('formatTemperature rounds values', () => {
  expect(formatTemperature(24.2)).toBe('24°C');
});

test('buildAlert responds to rain probability', () => {
  expect(buildAlert(80)).toMatch(/High rainfall chance/);
  expect(buildAlert(20)).toMatch(/Forecast is stable/);
});
