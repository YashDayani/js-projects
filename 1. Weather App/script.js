const apiKey = "8a4bef8dbb69e38bbddc0b759ba43eaa";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search ");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city){
    const response = await fetch(apiURL + city + `&appid=${apiKey}`);
    var data = await response.json();

    console.log(data);

    document.querySelector(".city").innerHTML = data.name+", "+data.sys.country;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    if (data.weather[0].main == "Clouds") {
        weatherIcon.src="images/clouds.png";
    }
    else if (data.weather[0].main == "Clear") {
        weatherIcon.src="images/clear.png";
    }
    else if (data.weather[0].main == "Rain") {
        weatherIcon.src="images/rain.png";
    }
    else if (data.weather[0].main == "Drizzle") {
        weatherIcon.src="images/drizzle.png";
    }
    else if (data.weather[0].main == "Mist") {
        weatherIcon.src="images/mist.png";
    }
}

searchBtn.addEventListener("click",()=>{
    checkWeather(searchBox.value);
})