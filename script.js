function cityChange(event) {
  event.preventDefault();
  let searchInput = document.querySelector(".form-input");

  searchCity(searchInput.value);
}

function searchCity(city) {
  let key = "27t9e8541a0e05obf157969c1c9331ac";
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${key}`;
  axios.get(url).then(updateTemp);
}

function updateTemp(response) {
  let temperature = document.querySelector(".temperature");
  tempupdate = response.data.temperature.current;
  let city = document.querySelector("h1");
  let description = document.querySelector("#weather-condition");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let time = document.querySelector("#day-and-time");
  let date = new Date(response.data.time * 1000);
  let icon = document.querySelector("#icon");
  let iconupdate = `<img src="${response.data.condition.icon_url}" class="weather-icon"/>`;

  city.innerHTML = response.data.city;
  time.innerHTML = formatDate(date);
  description.innerHTML = response.data.condition.description;
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  wind.innerHTML = `${response.data.wind.speed}km/h`;
  temperature.innerHTML = Math.round(tempupdate);
  icon.innerHTML = iconupdate;
}

function formatDate(date) {
  let weekDay = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = weekDay[date.getDay()];
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes},`;
}

let searchForm = document.querySelector("#searchForm");
searchForm.addEventListener("submit", cityChange);

searchCity("Zürich");
