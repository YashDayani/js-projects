const apiKey = "YOUR_API_KEY";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search ");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city){
    const response = await fetch(apiURL + city + `&appid=${apiKey}`);
    
    if (response.status == 404) {
        document.querySelector(".error").style.display="block";
        document.querySelector(".weather").style.display="none";
    }else{
        var data = await response.json();

        // console.log(data);

        document.querySelector(".city").innerHTML = data.name+", "+data.sys.country;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src="images/clouds.png";
            document.querySelector(".card").style.background="linear-gradient(135deg,#5ee1ff,#25acff)";
        }
        else if (data.weather[0].main == "Clear") {
            weatherIcon.src="images/clear.png";
            document.querySelector(".card").style.background="linear-gradient(135deg,#ffc444,#ee8e49)";
        }
        else if (data.weather[0].main == "Rain") {
            weatherIcon.src="images/rain.png";
            document.querySelector(".card").style.background="linear-gradient(135deg,#2a157f,#190033)";
        }
        else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src="images/drizzle.png";
            document.querySelector(".card").style.background="linear-gradient(135deg,#4f35df,#f5fd56)";

        }
        else if (data.weather[0].main == "Mist") {
            weatherIcon.src="images/mist.png";
            document.querySelector(".card").style.background="linear-gradient(135deg,#7d7c83,#303030)";
        }

        document.querySelector(".weather").style.display="block";
        document.querySelector(".error").style.display="none";
    }
}

searchBtn.addEventListener("click",()=>{
    checkWeather(searchBox.value);
})