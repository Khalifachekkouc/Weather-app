const apiKey = "a93e3b6da6f0cb3bed5aa3d2da30fe03";
const inputSection = document.querySelector(".input-section");
const resultSection = document.querySelector(".result-section");
const cityInput = document.getElementById("city-input");
const geoBtn = document.getElementById("geo-btn");
const backBtn = document.querySelector(".back-btn");

cityInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter" && cityInput.value !== "") {
        fetchWeather(cityInput.value);
    }
});

geoBtn.addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
            const { latitude, longitude } = pos.coords;
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
            getData(api);
        }, err => {
            alert("Unable to retrieve your location");
        });
    }
});

function fetchWeather(city) {
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    getData(api);
}

function getData(api) {
    fetch(api)
        .then(res => res.json())
        .then(data => {
            if (data.cod == 200) {
                showResult(data);
            } else {
                alert("City not found");
            }
        })
        .catch(() => {
            alert("Error fetching data");
        });
}

function showResult(data) {
    inputSection.style.display = "none";
    resultSection.style.display = "block";
    backBtn.style.display = "block";

    document.querySelector(".temp").innerText = Math.round(data.main.temp) + "°C";
    document.querySelector(".description").innerText = data.weather[0].description;
    document.querySelector(".city-name").innerText = `${data.name}, ${data.sys.country}`;
    document.querySelector(".humidity").innerText = data.main.humidity + "%";
    document.querySelector(".feels-like").innerText = Math.round(data.main.feels_like) + "°C";
}

backBtn.addEventListener("click", () => {
    inputSection.style.display = "block";
    resultSection.style.display = "none";
    backBtn.style.display = "none";
    cityInput.value = "";
});