const apiKEY = "10d6e35f53d0281c0ddd7a75c5ff1148"

const searchHistory = localStorage.getItem('search') || []

var temp = document.querySelector("#temp")
var wind = document.querySelector("#wind")
var humidity = document.querySelector("#Humid")
var searchBar = document.querySelector("#search")
var searchButton = document.querySelector("#search-btn")
var cityTitle = document.querySelector("#city")
var block = document.querySelectorAll(".block")
var tempDisplay = document.querySelectorAll(".temp-dis")
if(searchHistory.length > 0){
  //append buttons to page
}

function weatherdisplay() {
  var city = searchBar.value
  searchHistory.push(city)
  localStorage.setItem('search', searchHistory);
  
  var requestGeocodeUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKEY;


  fetch(requestGeocodeUrl)
    .then(res => res.json())
    .then(dataGeo => {
      console.log(dataGeo)
      console.log(dataGeo.coord.lon)
      const lat = dataGeo.coord.lat
      const lon = dataGeo.coord.lon
      cityTitle.textContent = dataGeo.name
      temp.textContent = dataGeo.main.temp + "°F"
      wind.textContent = dataGeo.wind.speed + "MPH"
      humidity.textContent = dataGeo.main.humidity + "%"
      var requestWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=10d6e35f53d0281c0ddd7a75c5ff1148&units=imperial`;
      fetch(requestWeatherUrl)
        .then(res => res.json())
        .then(dataWeatherUrl => {
          console.log(dataWeatherUrl)
          const dtArray = dataWeatherUrl.list.filter(function (weatherObj) {
            if (weatherObj.dt_txt.split(' ')[1] == '12:00:00') {
              return weatherObj
            }
          });
          const fiveDayUl = document.getElementById('5Day')
          while(fiveDayUl.firstChild){
            fiveDayUl.firstChild.remove()
          }
          for (let i = 0; i < dtArray.length; i++) {
            const li = document.createElement('li');
            const h5 = document.createElement('h5')
            //const img = document.createElement('img')

            const tempP = document.createElement('p')
            const humidP = document.createElement('p')
            const windP = document.createElement('p')

            tempP.textContent = `Temperature: ${dtArray[i].main.temp}°F`
            humidP.textContent = `Humidity: ${dtArray[i].main.temp}%`
            windP.textContent = `Wind: ${dtArray[i].wind.speed} MPH`

            h5.textContent = `${dtArray[i].dt_txt.split(' ')[0]}`

            li.classList.add('block')
            li.append(h5, tempP,windP, humidP)

            fiveDayUl.appendChild(li)
          }
        })
    })
}




searchButton.addEventListener('click', weatherdisplay)