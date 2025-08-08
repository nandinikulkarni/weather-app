const apiKey = 'b0261bbfe2755800a9cbd1ba2b596f59';
const cityInput = document.getElementById('cityInput');
const searchButton = document.querySelector('.search-box button');
const cityName = document.querySelector('.city-name');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const icon = document.querySelector('.weather-icon');

searchButton.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city === '') return;

  fetchWeather(city);
});

function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error('City not found');
      return response.json();
    })
    .then(data => {
      // Update UI with fetched data
      cityName.textContent = data.name;
      temperature.textContent = `${Math.round(data.main.temp)}°C`;
      description.textContent = data.weather[0].description;

      const iconCode = data.weather[0].icon;
      icon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    })
    .catch(error => {
      cityName.textContent = 'City not found';
      temperature.textContent = '';
      description.textContent = '';
      icon.src = '';
    });
}
