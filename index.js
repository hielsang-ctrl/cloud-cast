const { cities, describeWeather, buildForecastUrl, formatTemperature, buildAlert } = window.weatherUtils;

const cityName = document.querySelector("#current-city-name");
const temp = document.querySelector("#current-temp");
const condition = document.querySelector("#current-condition");
const wind = document.querySelector("#current-wind");
const humidity = document.querySelector("#current-humidity");
const icon = document.querySelector("#current-icon");
const forecast = document.querySelector("#forecast-cards");
const alerts = document.querySelector("#alerts-display");
const status = document.querySelector("#status-message");

async function fetchWeather(city) {
    const response = await fetch(buildForecastUrl(city), {
        method: "GET",
        headers: {
            Accept: "application/json"
        }
    });

    if (!response.ok) {
        throw new Error(`Weather request failed with status ${response.status}`);
    }

    return response.json();
}

async function loadCity(key) {
    const city = cities[key];
    if (!city) {
        return;
    }

    status.textContent = `Loading weather for ${city.name}...`;

    try {
        const data = await fetchWeather(city);
        const [text, emoji] = describeWeather(data.current.weather_code);
        const highestRainChance = Math.max(...data.daily.precipitation_probability_max);

        cityName.textContent = city.name;
        temp.textContent = formatTemperature(data.current.temperature_2m);
        condition.textContent = text;
        wind.textContent = `${Math.round(data.current.wind_speed_10m)} km/h`;
        humidity.textContent = `${Math.round(data.current.relative_humidity_2m)}%`;
        icon.textContent = emoji;
        status.textContent = `Live weather loaded for ${city.name}.`;

        forecast.innerHTML = data.daily.time.map((day, i) => {
            const [label, dayIcon] = describeWeather(data.daily.weather_code[i]);
            return `
                <article class="forecast-card">
                    <p class="day-label">${new Date(day).toLocaleDateString("en-KE", { weekday: "short", day: "numeric", month: "short" })}</p>
                    <h3>${dayIcon} ${label}</h3>
                    <p class="forecast-temp">${formatTemperature(data.daily.temperature_2m_max[i])} / ${formatTemperature(data.daily.temperature_2m_min[i])}</p>
                    <p class="forecast-meta">Rain chance: ${data.daily.precipitation_probability_max[i] ?? 0}%</p>
                </article>
            `;
        }).join("");

        alerts.innerHTML = `
            <article class="alert-card ${highestRainChance < 70 ? "safe" : ""}">
                <h3>${highestRainChance >= 70 ? "Rain alert" : "No major alert"}</h3>
                <p>${buildAlert(highestRainChance)}</p>
            </article>
        `;
    } catch (error) {
        status.textContent = `Unable to load weather for ${city.name} right now.`;
        forecast.innerHTML = "";
        alerts.innerHTML = `
            <article class="alert-card">
                <h3>Weather unavailable</h3>
                <p>Please try again in a moment.</p>
            </article>
        `;
        console.error(error);
    }
}

document.querySelector("#nairobi-btn")?.addEventListener("click", () => loadCity("nairobi"));
document.querySelector("#eldoret-btn")?.addEventListener("click", () => loadCity("eldoret"));
document.querySelector("#kisumu-btn")?.addEventListener("click", () => loadCity("kisumu"));
document.querySelector("#nakuru-btn")?.addEventListener("click", () => loadCity("nakuru"));

if (cityName && forecast && alerts) {
    loadCity("nairobi");
}
