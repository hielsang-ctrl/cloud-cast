const api = "https://api.open-meteo.com/v1/forecast";
const cities = {
    nairobi: { name: "Nairobi, Kenya", lat: -1.2864, lon: 36.8172 },
    eldoret: { name: "Eldoret, Kenya", lat: 0.5143, lon: 35.2698 },
    kisumu: { name: "Kisumu, Kenya", lat: -0.0917, lon: 34.768 },
    nakuru: { name: "Nakuru, Kenya", lat: -0.3031, lon: 36.08 }
};

const cityName = document.querySelector("#current-city-name");
const temp = document.querySelector("#current-temp");
const condition = document.querySelector("#current-condition");
const wind = document.querySelector("#current-wind");
const humidity = document.querySelector("#current-humidity");
const icon = document.querySelector("#current-icon");
const forecast = document.querySelector("#forecast-cards");
const alerts = document.querySelector("#alerts-display");
const status = document.querySelector("#status-message");

const weatherIcons = {
    0: ["Clear sky", "☀️"],
    1: ["Mainly clear", "🌤️"],
    2: ["Partly cloudy", "⛅"],
    3: ["Overcast", "☁️"],
    61: ["Rain", "🌧️"],
    63: ["Rain", "🌧️"],
    65: ["Heavy rain", "🌧️"],
    80: ["Showers", "🌦️"],
    95: ["Thunderstorm", "⛈️"]
};

const describe = (code) => weatherIcons[code] || ["Cloudy", "☁️"];

async function loadCity(key) {
    const city = cities[key];
    const url = `${api}?latitude=${city.lat}&longitude=${city.lon}&timezone=Africa%2FNairobi&forecast_days=5&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max`;
    const res = await fetch(url);
    const data = await res.json();
    const [text, emoji] = describe(data.current.weather_code);

    cityName.textContent = city.name;
    temp.textContent = `${Math.round(data.current.temperature_2m)}°C`;
    condition.textContent = text;
    wind.textContent = `${Math.round(data.current.wind_speed_10m)} km/h`;
    humidity.textContent = `${Math.round(data.current.relative_humidity_2m)}%`;
    icon.textContent = emoji;
    status.textContent = `Live weather loaded for ${city.name}.`;

    forecast.innerHTML = data.daily.time.map((day, i) => {
        const [label, dayIcon] = describe(data.daily.weather_code[i]);
        return `
            <article class="forecast-card">
                <p class="day-label">${new Date(day).toLocaleDateString("en-KE", { weekday: "short", day: "numeric", month: "short" })}</p>
                <h3>${dayIcon} ${label}</h3>
                <p class="forecast-temp">${Math.round(data.daily.temperature_2m_max[i])}°C / ${Math.round(data.daily.temperature_2m_min[i])}°C</p>
                <p class="forecast-meta">Rain chance: ${data.daily.precipitation_probability_max[i] ?? 0}%</p>
            </article>
        `;
    }).join("");

    alerts.innerHTML = `
        <article class="alert-card ${Math.max(...data.daily.precipitation_probability_max) < 70 ? "safe" : ""}">
            <h3>${Math.max(...data.daily.precipitation_probability_max) >= 70 ? "Rain alert" : "No major alert"}</h3>
            <p>${Math.max(...data.daily.precipitation_probability_max) >= 70 ? "High rainfall chance expected in the next few days." : "Forecast is stable for the next few days."}</p>
        </article>
    `;
}

document.querySelector("#nairobi-btn")?.addEventListener("click", () => loadCity("nairobi"));
document.querySelector("#eldoret-btn")?.addEventListener("click", () => loadCity("eldoret"));
document.querySelector("#kisumu-btn")?.addEventListener("click", () => loadCity("kisumu"));
document.querySelector("#nakuru-btn")?.addEventListener("click", () => loadCity("nakuru"));

if (cityName && forecast && alerts) {
    loadCity("nairobi");
}
