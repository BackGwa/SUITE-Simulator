window.addEventListener("load", () => {
    parent.app_load();
})

function back_site() {
    parent.app_close();
}

const APIKEY = "c1a383a9a4482040661b054a0174d307";
let latitude = 0;
let longitude = 0;

const loading_text = document.querySelector("loading-text");
const location_text = document.querySelector("location-text");
const temp_text = document.querySelector("temp-text");
const help_text = document.querySelector("help-text");
const min_temp_text = document.querySelector("min-temp-text");
const max_temp_text = document.querySelector("max-temp-text");

function sync_weather(location, temp, min, max, help) {
    location_text.innerHTML = location;
    temp_text.innerHTML = `<temp-font>${temp}</temp-font>` + "°C";
    min_temp_text.innerHTML = "최저 기온 : " + min + "°C";
    max_temp_text.innerHTML = "최고 기온 : " + max + "°C";
    help_text.innerHTML = text_pretter(help);
    loading_text.innerHTML = "";
}

function text_pretter(text) {
    if(text == "맑음") {
        return `오늘은 화창해요,<br>밖에 나가서 노는 것은 어떤가요?`
    } else if (text == "연무") {
        return "안개가 좀 껴요,<br>바깥 활동을 조심하세요."
    }
    return text;
}

function success({ coords }) {
    latitude = coords.latitude;
    longitude = coords.longitude;
    reverseGeocode(latitude, longitude);
}

function getUserLocation() {
    navigator.geolocation.getCurrentPosition(success);
}

function reverseGeocode(latitude, longitude) {
    getWeatherByAddress(latitude, longitude)
        .then((weatherInfo) => {
            if (weatherInfo) {
                return_pin(latitude, longitude).then(() => {
                    sync_weather(address,
                        parseInt(weatherInfo.main.temp),
                        parseInt(weatherInfo.main.temp_min),
                        parseInt(weatherInfo.main.temp_max),
                        weatherInfo.weather[0].description);
                });
            }
        });
}

let address;

async function return_pin(latitude, longitude) {
    const RGAPI = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

    await fetch(RGAPI)
        .then(response => {
            return response.json();
        })
        .then(data => {
            address = data.address.province + " " + data.address.city;
        })
        .catch(error => {
            console.error(error);
        });
}

async function getWeatherByAddress(latitude, longitude) {
    try {
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIKEY}&lang=kr&units=metric`;
        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();
        return weatherData;
    } catch (error) {
        console.error(error);
        return null;
    }
}

getUserLocation();