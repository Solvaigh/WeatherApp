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
            
            var proxy = "https://cors-anywhere.herokuapp.com/";
            var appId = "a03e764ac19cc224e87a100ab518b340";
            var api = `${proxy}https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=${appId}`;
        
        fetch(api).then((response) => {
            return response.json();
        })
        .then((data) => {
            temperatureDegree.innerText = Math.round(data.main.temp - 273,15);
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
        console.log(data);

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

      update();
}

function update() {
    setInterval(currencyWidget, 3600000);
}

currencyWidget();
});