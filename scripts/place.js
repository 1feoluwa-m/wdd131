const temperature = 10;
const windSpeed = 7

const currentYear = document.querySelector("#currentyear");
const windChillElement = document.querySelector("#wind-chiller");
const calculateWindChiller = (temp, speed) => (13.12 + 0.6215 * temp - 11.37 * Math.pow(speed, 0.16) + 0.3965 * temp * Math.pow(speed, 0.16)).toFixed(1);
if(temperature <= 10 && windSpeed > 4.8) {
    windChillElement.textContent = `${calculateWindChiller(temperature, windSpeed)} °C`;
} else{
    windChillElement.textContent = "N/A"
}

const today = new Date()
currentYear.textContent = today.getFullYear();

const lastModified = document.querySelector("#lastModified")
lastModified.textContent = `Last Modification: ${document.lastModified}`;