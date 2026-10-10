async function getAntarcticaWeather() {
    const latitude = -90.0;
    const longitude = 0.0;
    const weatherInfoDiv = document.getElementById('flight-weather')

    try{
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
        if (!response.ok){
            throw new Error('Failed to retrieve weather data.')
        }

        const data = await response.json();
        const currentWeather = data.current_weather;

        weatherInfoDiv.className = '';
        weatherInfoDiv.innerHTML = `
        <div class="weather-item"><strong>Temperature: </strong> ${currentWeather.temperature}°C</div>
        <div class="weather-item"><strong>Wind Speed: </strong> ${currentWeather.windspeed} km/h</div>
        <div class="weather-item"><strong>Wind Direction: </strong> ${currentWeather.winddirection}°</div>
        `;
    } catch (error){
        weatherInfoDiv.textContent = 'Error loading weather data.';
        console.error('Error fetching South Pole weather:', error);
    }
}


getAntarcticaWeather();

//Get footer stuffs
const currentYear = document.querySelector("#currentyear");
const today = new Date()
currentYear.textContent = today.getFullYear();

const lastModified = document.querySelector("#lastModified")
lastModified.textContent = `Last Modification: ${document.lastModified}`;
