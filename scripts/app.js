const cityForm = document.querySelector('form');

const card = document.querySelector('.weather-card');
const details = document.querySelector('.weather-details');

const errorMsg = document.querySelector('.error-msg');

const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

console.log(time);
console.log(icon);





const updateUI = (data) => {

	console.log(data);
    const cityDetails = data.cityDetails;
    const weather = data.weather;
    // console.log(weather);
    // const weather = data.weather.DailyForecasts;


    //update details template

    let state = '';

    if (cityDetails.AdministrativeArea.CountryID === 'US') {
        // state = cityDetails.AdministrativeArea.EnglishName;
        state = cityDetails.AdministrativeArea.ID;

    } else {
        state = cityDetails.Country.EnglishName;


    }

      details.innerHTML = `
				<h3 class="fourth-level-heading">${cityDetails.EnglishName}, ${state}</h3>
				<h4 class="body-copy">${weather.WeatherText}</h4>
				<div class="temp-container fourth-level-heading">
				    <span class="body-copy">${weather.Temperature.Imperial.Value}</span>
				    <span class="body-copy">&deg;${weather.Temperature.Imperial.Unit}</span>
				</div>

	`;

	let timeSrc = null;

	if(weather.IsDayTime) {
		timeSrc = 'images/day.svg';
	} else {
		timeSrc = 'images/night.svg';

	};

	time.setAttribute('src', timeSrc);





 

    errorMsg.style.display = 'none';
    card.style.display = 'flex';


}



const updateCity = async (city) => {

    const cityDetails = await getCity(city);
    const weather = await getWeather(cityDetails.Key);

    return {
        cityDetails: cityDetails,
        weather: weather
    };

};

cityForm.addEventListener('submit', e => {
    //prevent default action
    e.preventDefault();

    //get city value
    const city = cityForm.city.value.trim();
    cityForm.reset(); //reset city form after submit


    //update ui with new city
    updateCity(city)
        .then(data => {
            console.log(data);
            updateUI(data);
        })
        .catch(error => {
            console.log(error);
            card.style.display = 'none';
            errorMsg.style.display = 'flex';


        });
})