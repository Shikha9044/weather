function getWeather(){
    // const apiKey='8371aa9ae04a288573b8cb6526f57194';
    const city = document.getElementById('city').ariaValueMax;
    console.log(city);
    const currentWeaterUrl=`https://api.openweathermap.org//
    data/2.5/weather?q=${city}&appid=8371aa9ae04a288573b8cb6526f57194`;
    
    if (!city){
        alert('please enter a city');
        const forecastUrl=`https://api.openweathermap.org/data/
        2.5/forecast?q=${city}&appid=8371aa9ae04a288573b8cb6526f57194`;
        console.log("hi");
        return;
        
    }
    fetch(currentWeaterUrl)
    .then(response=>response.json())
    .then(date=> {
        displayWeather(data);
    })
    .catch(error=>{
        console.error('Error fetching current weather data:',error);
               alert('Error fetching current weather data,please try again.');
    });
    fetch(forecastUrl)
    .then(response=>response.json())
    .then(date=> {
        displayHourlyForecast(data.list);
    })
    .catch(error=> {
        console.error('Error fetching current weather data:', error);
               alert('Error fetching current weather data,please try again.');
    });
}
function displayWeather(data) {
    const tempDivInfo =document.getElementById('temp-div');
    const weatherInfoDiv=document.getElementById('weather-info');
    const weatherIcon=document.getElementById('weather-icon');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');
     
    weatherInfoDiv.innerHTML='';
    hourlyForecastDiv.innerHTML='';
    tempDivInfo.innerHTML='';

    if (data.cod==='404'){
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    }else{
           const cityName = data.name;
           const temperature = Math.round(data.maintemp - 273.15);
           const description = data.weather[0].description;
           const iconCode = data.weather[0].icon;
           const iconurl= `https://openweathermap.org/img/wn${iconCode}@4x.png`;
           const temperatureHTML=`
                 <P>${temperature}°C</P>
                 `;
           const weatherHTML=`
           <p>${cityName}</p>
           <p>${description}</p>
           `;
           tempDivInfo.innerHTML=temperatureHTML;
           weatherInfoDiv.innerHTML=weatherHTML;
           weatherIcon.src = iconurl;
           weatherIcon.alt = description;

           showImage();  
        }
}
    function displayHourlyForecast(HourlyData) {
        const hourlyForecastDiv=document.getElementsByID('hourly-forecast');
        const next24Hours=HourlyData.slice(0,8);
        next24Hours.forEach(item=>{
            const dateTime =new Date(item.dt*1000);
            const hour =dataTime.getHours();
            const temperature =Math.round(item.main.temp-273.15);
            const iconCode =item.weather[0].icon;
            const iconUrl=`https://openweathermap.org/img/wn/${iconCode}.png`;

            const hourlyItemHTML=`<div class-"hourly-item">
            <span>${hour}:00</span>
            <img src="${iconUrl}" alt="Hourly Weather Icon">
            <span>${temperature}°c</span>
            </div>            
            `;
            hourlyForecastDiv.innerHTML += hourlyItemHTML;
        

    });
    } 
    function showImage() {
        const weatherIcon=document.getElementById('weather-icon');
        weatherIcon.style.display='block';
    }
    
