const citySelect = document.getElementById("citySelect");
const refreshBtn = document.getElementById("refreshBtn");

const loading = document.getElementById("loading");
const errorMessage = document.getElementById("errorMessage");
const errorText = document.getElementById("errorText");
const retryBtn = document.getElementById("retryBtn");

const weatherContainer = document.getElementById("weatherContainer");

const cityName = document.getElementById("cityName");
const countryName = document.getElementById("countryName");
const weatherIcon = document.getElementById("weatherIcon");
const temperature = document.getElementById("temperature");
const weatherDescription = document.getElementById("weatherDescription");
const weatherTime = document.getElementById("weatherTime");

const feelsLike = document.getElementById("feelsLike");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const precipitation = document.getElementById("precipitation");


const cities = {
    chennai: {
        name: "Chennai",
        latitude: 13.0827,
        longitude: 80.2707
    },

    coimbatore: {
        name: "Coimbatore",
        latitude: 11.0168,
        longitude: 76.9558
    },

    madurai: {
        name: "Madurai",
        latitude: 9.9252,
        longitude: 78.1198
    },

    trichy: {
        name: "Tiruchirappalli",
        latitude: 10.7905,
        longitude: 78.7047
    },

    thanjavur: {
        name: "Thanjavur",
        latitude: 10.7870,
        longitude: 79.1378
    },

    salem: {
        name: "Salem",
        latitude: 11.6643,
        longitude: 78.1460
    },

    tirunelveli: {
        name: "Tirunelveli",
        latitude: 8.7139,
        longitude: 77.7567
    },

    erode: {
        name: "Erode",
        latitude: 11.3410,
        longitude: 77.7172
    },

    vellore: {
        name: "Vellore",
        latitude: 12.9165,
        longitude: 79.1325
    },

    pattukkottai: {
        name: "Pattukkottai",
        latitude: 10.4236,
        longitude: 79.3199
    }
};


function getWeatherInfo(code) {

    const weatherMap = {
        0: ["Clear Sky", "☀️"],
        1: ["Mainly Clear", "🌤️"],
        2: ["Partly Cloudy", "⛅"],
        3: ["Overcast", "☁️"],
        45: ["Fog", "🌫️"],
        48: ["Fog", "🌫️"],
        51: ["Light Drizzle", "🌦️"],
        53: ["Drizzle", "🌦️"],
        55: ["Heavy Drizzle", "🌧️"],
        61: ["Light Rain", "🌦️"],
        63: ["Rain", "🌧️"],
        65: ["Heavy Rain", "🌧️"],
        71: ["Light Snow", "🌨️"],
        73: ["Snow", "❄️"],
        75: ["Heavy Snow", "❄️"],
        80: ["Rain Showers", "🌦️"],
        81: ["Rain Showers", "🌧️"],
        82: ["Heavy Rain Showers", "⛈️"],
        95: ["Thunderstorm", "⛈️"],
        96: ["Thunderstorm with Hail", "⛈️"],
        99: ["Thunderstorm with Hail", "⛈️"]
    };

    return weatherMap[code] || ["Unknown Weather", "🌤️"];
}


function showLoading() {

    loading.classList.remove("hidden");
    errorMessage.classList.add("hidden");
    weatherContainer.classList.add("hidden");
}


function hideLoading() {

    loading.classList.add("hidden");
    errorMessage.classList.add("hidden");
    weatherContainer.classList.remove("hidden");
}


function showError(message) {

    loading.classList.add("hidden");
    weatherContainer.classList.add("hidden");
    errorMessage.classList.remove("hidden");

    errorText.textContent = message;
}


async function fetchWeather() {

    const selectedCity = citySelect.value;
    const city = cities[selectedCity];

    if (!city) {
        showError("Please select a valid city.");
        return;
    }

    showLoading();

    try {

        const url =
            `https://api.open-meteo.com/v1/forecast` +
            `?latitude=${city.latitude}` +
            `&longitude=${city.longitude}` +
            `&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,is_day` +
            `&timezone=auto`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("API request failed.");
        }

        const data = await response.json();

        if (!data.current) {
            throw new Error("Weather data not available.");
        }

        updateWeather(city, data);

    } catch (error) {

        console.error(error);

        showError(
            "Unable to load weather data. Please check your internet connection."
        );
    }
}


function updateWeather(city, data) {

    const current = data.current;
    const units = data.current_units;

    const [description, icon] =
        getWeatherInfo(current.weather_code);


    cityName.textContent = city.name;

    countryName.textContent =
        "Tamil Nadu, India";


    weatherIcon.textContent =
        icon;


    temperature.textContent =
        `${Math.round(current.temperature_2m)}${units.temperature_2m}`;


    weatherDescription.textContent =
        description;


    weatherTime.textContent =
        current.time.replace("T", " ");


    feelsLike.textContent =
        `${Math.round(current.apparent_temperature)}${units.apparent_temperature}`;


    humidity.textContent =
        `${current.relative_humidity_2m}${units.relative_humidity_2m}`;


    windSpeed.textContent =
        `${Math.round(current.wind_speed_10m)} ${units.wind_speed_10m}`;


    precipitation.textContent =
        `${current.precipitation} ${units.precipitation}`;


    hideLoading();
}


citySelect.addEventListener("change", fetchWeather);

refreshBtn.addEventListener("click", fetchWeather);

retryBtn.addEventListener("click", fetchWeather);


fetchWeather();