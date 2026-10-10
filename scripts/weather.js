async function getAntarcticaWeather() {
    const latitude = -90.0;
    const longitude = 0.0;
    const weatherInfoDiv = document.getElementById('weather-info')

    try{
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
        if (!response.ok){
            throw new Error('Failed to retrieve weather data.')
        }

        const data = await response.json();
        const currentWeather = data.current_weather;

        weatherInfoDiv.className = '';
        weatherInfoDiv.innerHTML = `
        <div class="weather-item"><strong>Location:</strong> Geographic South Pole</div>
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



// Flight trips stuff
const flightSchedule = [];
const cities = ["Paris", "Dubai", "New York", "Canada", "Scotland", "England", "Netherland", "Kuwait", "London", "India", "Tokyo", "Thailand", "Denmark", "Spain", "Italy", "Barcelona", "Lagos", "Abuja", "Jos"];

for (let i = 0; i < 50; i++){
    flightSchedule.push({
        number : `MIA-SC${650 + i}`,
        baseDeptHour: 6 + i,
        baseDeptMin: (i % 2 === 0) ? 0 : 30,
        durationHours: 2,
        origin: cities[i % cities.length],
        destination: cities[(i + 1) % cities.length]
    });
}

// Helper function to format time
function formatTime(date){
    return date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: true});
}



 let selectedFlight = null;

            // Function to open Booking modal
            function openBookingTicket(flightNumber, origin, destination, departureTime){
                selectedFlight = {flightNumber,origin, destination,departureTime};

                document.getElementById('ticket-num').textContent = flightNumber;
                document.getElementById('ticket-route').textContent = `${origin} to ${destination}`;
                document.getElementById('boarding-ticket').style.display = 'flex';
            }

            function closeTicket(){
                document.getElementById('boarding-ticket').style.display = 'none';
            }

            function confirmBooking(){
                const passengerName = document.getElementById('pass-name').value.trim();
                const travelingClass = document.getElementById('class-select').value;

                if (!passengerName){
                    alert('Please enter your full name.');
                    return;
                }


                //populate boarding pass confirmation

                document.getElementById('passenger-name').textContent = passengerName;
                document.getElementById('passenger-flight').textContent = selectedFlight.flightNumber;
                document.getElementById('passenger-origin').textContent = selectedFlight.origin;
                document.getElementById('passenger-destination').textContent = selectedFlight.destination;
                document.getElementById('passenger-departure').textContent = selectedFlight.departureTime;
                document.getElementById('passenger-class').textContent = travelingClass;

                closeTicket();
                document.getElementById('ticket-confirmation').style.display = 'flex';
            }

            function closeConfirmation(){
                document.getElementById('ticket-confirmation').style.display = 'none';
                document.getElementById('pass-name').value = '';
            }



async function flightSystem(){
    const latitude = -90.0;
    const longitude = 0.0;

    const announcementCase = document.getElementById('flight-announcement');
    const table = document.getElementById('flight-table');

    try{
        //fetch real time weather
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
        if (!response.ok){
            throw new Error('Weather retrieval error.')
        }

        const data = await response.json();
        const windSpeed = data.current_weather.windspeed;
        const temperature = data.current_weather.temperature;

        // Calculate delay hours
        let delayHours = 0;
        if (windSpeed > 25 || temperature < -65){
            delayHours = 2;
        } else if (windSpeed > 16 || temperature < -55 ){
            delayHours = 1;
        }

        //Clear existing table content
        table.innerHTML = '';

        let cumulativeDelay = delayHours;

        // loop through 15 generated flights
        let rows = "";
        flightSchedule.forEach((flight) => {
            //set base departure time
            let deptDate = new Date();
            deptDate.setHours(flight.baseDeptHour, flight.baseDeptMin, 0);
            //Apply weather delay offset
            deptDate.setHours(deptDate.getHours() + cumulativeDelay);
            // Calculate arrival time based on delayed departure if there be
            let arrivalTime = new Date(deptDate.getTime());
            arrivalTime.setMinutes(arrivalTime.getMinutes() + (flight.durationHours * 60));

            const now = new Date();

            let statusText = "Available";
            let statusClass = "status-available";

            // Time logic checks

            if (now >= arrivalTime){
                statusText = "\u2708\uFE0E - ✅";
                statusClass = "status-done";
            } else if(now >= deptDate && now < arrivalTime){
                statusText = "\u2708\uFE0E - In Flight";
                statusClass = "status-inflight";
            } else {
                //Difference in minutes until departure 
                const diffMinutes = Math.floor((deptDate - now) / (1000 * 60));

                if (diffMinutes <= 10 && diffMinutes > 0) {
                    statusText = "Boarding Final call";
                    statusClass = "status-boarding";
                } else if (diffMinutes <= 30 && diffMinutes > 10) {
                    statusText = "Now Boarding";
                    statusClass = "status-boarding";
                } else if (diffMinutes <= 90 && diffMinutes > 30){
                    statusText = "Check-In(s)";
                    statusClass = "status-checkin";
                } else {
                    statusText = "Available";
                    statusClass = "status-available"
                }
            }


            let bookingAct = '-';

            if (statusText === 'Available'){
                bookingAct = `<button onclick="openBookingTicket('${flight.number}', '${flight.origin}', '${flight.destination}', '${formatTime(deptDate)}')" class= "btn-book">Book</button>`;
            }


            //Render row in table
            const rowHTML = `
                <tr>
                    <td><strong>${flight.number}</strong></td>
                    <td>${flight.origin}</td>
                    <td>${flight.destination}</td>
                    <td>${formatTime(deptDate)}</td>
                    <td>${formatTime(arrivalTime)}</td>
                    <td class="${statusClass}">${statusText}</td>
                    <td>${bookingAct}</td>
                </tr>            
            `;
            rows += rowHTML;
        });


        table.innerHTML = `
            <table border="1">
                <thead>
                    <tr>
                        <th><strong>Flight</strong></th>
                        <th><strong>From</strong></th>
                        <th><strong>To</strong></th>
                        <th><strong>Departure</strong></th>
                        <th><strong>Arrival</strong></th>
                        <th><strong>Status</strong></th>
                        <th><strong>Bookings</strong></th>
                    </tr>
                </thead>
                <tbody>${rows}</tbody>
            </table>
        
        `



        //Update announcement banner using first flight
        const boardingFlight = flightSchedule.find(f => {
            let d = new Date();
            d.setHours(f.baseDeptHour + delayHours, f.baseDeptMin);
            let diff = Math.floor((d - new Date()) / (1000 * 60));
            return diff <=  30 && diff > 0;
        }) || flightSchedule[0];

        if (delayHours > 0){
            announcementCase.innerHTML = ` <strong>Flight - ${boardingFlight.number}</strong> from <strong>${boardingFlight.origin}</strong> to <strong>${boardingFlight.destination}</strong> and subsequent flights will be delayed for <strong>${delayHours}hour(s)</strong> due to extreme weather conditions. We sincerely apologize for the inconvenience and will do our best to compensate for the delay.`;
        } else {
            announcementCase.innerHTML = `<strong>${boardingFlight.number}</strong> to <strong>${boardingFlight.destination}</strong> is now <strong>Boarding</strong>`;
        }
    } catch (error) {
        announcementCase.textContent = 'We are unable to evaluate flight schedules at this time.';
        console.error('System error:', error);
    }
}

//Execute the function
flightSystem();