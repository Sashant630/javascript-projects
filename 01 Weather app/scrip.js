const key = "2821cccb7634477ab37121740232009"

const inputEl = document.querySelector("#inputEl")
const infoBox = document.querySelector("#info-box")
const formSubmit = document.querySelector("form")
const iconImg = document.querySelector(".icon-image")
const temp = document.querySelector(".temp")
const condition = document.querySelector(".status")
const feels = document.querySelector(".feels")
const humidity = document.querySelector(".humidity")
const windSpeed = document.querySelector(".wind-speed")


const getWeather = async () => {
    let city = inputEl.value;
    try{
        let url = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}`
        const response = await fetch(url)

        if(!response.ok){
            throw new Error("Network reponse was not ok")
        }

        const data = await response.json()
        // console.log(data);
        // console.log(data.current.temp_c);
        
        iconImg.src = data.current.condition.icon;
        temp.textContent = data.current.temp_c + "°C";
        condition.textContent = data.current.condition.text;
        feels.textContent = "Feels like: " + data.current.feelslike_c + "°C";
        humidity.textContent = "Humifity : " + data.current.humidity + "%";
        windSpeed.textContent = "Wind speed : " + data.current.wind_kph + "m/s";
        
        
    }catch(error){
        iconImg.style.display = "none"
        temp.style.display = "none"
        feels.style.display = "none"
        humidity.style.display = "none"
        windSpeed.style.display = "none"
        condition.textContent = "Please enter correct city/country"
        

    }


}

formSubmit.addEventListener('submit', (e) => {
    e.preventDefault()
    getWeather()
})