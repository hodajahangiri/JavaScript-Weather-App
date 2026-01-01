const APIKey = "afc283ac3bf7ba5f4ebb26b9ef4124bc";

const cityInput = document.getElementById("searchBar");
const searchButton = document.getElementById("searchButton");
const searchForm = document.getElementById("searchForm");

const cardContainer = document.getElementsByClassName("card-container")[0];

searchForm.addEventListener("submit", async(event) => {
    event.preventDefault();
    searchButton.disabled = true;
    cardContainer.innerHTML="";
    cardContainer.style.display = "none";
    const cityName = cityInput.value;
    if(cityName === ''){
        alert("You have enter a city to search!");
        searchButton.disabled = false;
    }else{
        const weatherData = await getCurrentWeather(cityName);
        if(weatherData !== ""){
            displayCurrentWeather(weatherData);
        }
        cityInput.value = "";
    };
});


const getCurrentWeather = async (cityName) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}`);
    const data = await response.json();
    if(response.status === 404){
        alert("Invalid city name, Enter correct city name....");
        searchButton.disabled = false;
        return "";
    }
    const weatherData = {
        name: `${data.name}, ${data.sys.country}`,
        highTemp: `${((data.main.temp_max - 273.15)*9/5 + 32).toFixed(2)}°F`,
        lowTemp: `${((data.main.temp_min - 273.15)*9/5 + 32).toFixed(2)}°F`,
        forecast: data.weather[0].main,
        humidity: `${data.main.humidity}%`
    };
    return weatherData;
};

const displayCurrentWeather = (weatherData) => {
    const weatherCardDiv = document.createElement("div");
    weatherCardDiv.className = "weather-card";
    weatherCardDiv.innerHTML = `
    <div class="weather-card">
        <h2>${weatherData.name}</h2>
        <div class="weather-info red-border">
            <div class="title red-background">
                <h3>High</h3>
            </div>
            <p>${weatherData.highTemp}</p>
        </div>
        <div class="weather-info blue-border">
            <div class="title blue-background">
                <h3>Low</h3>
            </div>
            <p>${weatherData.lowTemp}</p>
        </div>
        <div class="weather-info green-border">
            <div class="title green-background">
                <h3>Forecast</h3>
            </div>
            <p>${weatherData.forecast}</p>
        </div>
        <div class="weather-info yellow-border">
            <div class="title yellow-background">
                <h3>Humidity</h3>
            </div>
            <p>${weatherData.humidity}</p>  
        </div>
    </div>  
    `
    cardContainer.style.display = "flex";
    cardContainer.appendChild(weatherCardDiv);
    searchButton.disabled = false;
};