window.addEventListener("DOMContentLoaded", () => {

    /* User Location Weather */

function userLocationWeather () {
    var long = null;
    var lat = null;
    var temperatureDescription = document.querySelector(".temperature-description");
    var temperatureDegree = document.querySelector(".temperature-degree");
    var weatherIcon = document.querySelector(".weather-icon");
    var locationName = document.querySelector(".location-name");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            
            var appId = "a03e764ac19cc224e87a100ab518b340";
            var api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=${appId}`;
        
            fetch(api).then((response) => {
                return response.json();
            })
            .then((data) => {
                temperatureDegree.innerText = Math.round(data.main.temp - 273,15)+ " °C";
                temperatureDescription.innerText = data.weather[0].description;
                weatherIcon.src = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
                locationName.innerText = data.name;
            }).catch(error => {
                console.log(error);
            });
        });
    }
}

userLocationWeather();

/* Currency */

function currencyWidget() {

    var nameCont = document.querySelector(".name");
    var buyCont = document.querySelector(".buy");
    var saleCont = document.querySelector(".sale");
     
    var api = `https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11`;

    fetch(api).then((response) => {
        return response.json();
    }).then((data) => { 
        for(i=0; i < data.length; i++) {
            var ccy = document.createElement("div");
            ccy.innerText = data[i].ccy;
            nameCont.appendChild(ccy);
  
            var buy = document.createElement("div");
            buy.innerText = data[i].buy;
            buyCont.appendChild(buy);
  
            var sale = document.createElement("div");
            sale.innerText = data[i].sale;
            saleCont.appendChild(sale);
        }
    }).catch(error => {
        console.log(error);
    });
}

currencyWidget();

/* SearchWeather */

window.onload = function() {
    check();
    showCityWeather(); 
}
    var cityWeatherList = [];
    var searchBtn = document.getElementById("search-btn");
    var weatherContainer = document.querySelector(".weather-container");
     
    function getWeatherData () {
        var city = document.getElementById("search-input");
        var api = `http://api.openweathermap.org/data/2.5/weather?q=${city.value}&APPID=a03e764ac19cc224e87a100ab518b340`;

          fetch(api).then(response => {
            return response.text();
            }).then(data => {
            var data = JSON.parse(data);
            cityWeatherList.push(data);
            localStorage.setItem("cities",JSON.stringify(cityWeatherList));
            console.log(cityWeatherList);
            showCityWeather();
        })
    }
    
    function check () {
        if(localStorage.getItem("cities") != null) {
            cityWeatherList = JSON.parse(localStorage.getItem("cities"));}  
    }
    function showCityWeather () {
        var item = "";
        for(let i=0; i< cityWeatherList.length; i++) {
            item = item +'<div class = "city-weather">';
            item = item + '<h2 class = "city-name">' + cityWeatherList[i].name + ', ' + cityWeatherList[i].sys.country + '</h2>';
            item = item + '<div class = "city-weather-icon"> '+ '<img src="https://openweathermap.org/img/w/'+ cityWeatherList[i].weather[0].icon + '.png">' +'</div>';
            item = item + '<div class = "city-weather-info">' + Math.round(cityWeatherList[i].main.temp - 273,15)+ " °C" +'</div>';
            item = item + '<div class = "city-weather-info">' + cityWeatherList[i].weather[0].description+"<br>"+"humidity: "+cityWeatherList[i].main.humidity+"%"+'</div>'; 
            item = item + '<div class = "city-weather-info">' + '<button dataArt ="' + [i] + '" class = "remove">Delete</button>'+'</div>';
            item = item + '</div>';
        }
        weatherContainer.innerHTML = item;
    }
    
    function remove (event) {
    if (event.target.className === "remove") {
    var attribut = event.target.getAttribute("dataArt");
    cityWeatherList.splice([attribut],1);
    showCityWeather();
    localStorage.setItem("cities",JSON.stringify(cityWeatherList));
        }
    }
    
    document.addEventListener('click', remove);
    searchBtn.addEventListener('click', getWeatherData);

});