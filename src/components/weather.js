class Weather {
    constructor() {
        this.lat = 0
        this.lon = 0
        this.API_KEY = window.OPENWEATHER_API_KEY
    }

    setCoords() {
        return new Promise((res, rej) => {
            const success = (pos) => {
                this.lon = pos.coords.longitude
                this.lat = pos.coords.latitude
                res()
            }
            
            const error = (err) => {
                console.warn(`ERROR(${err.code}): ${err.message}`)
                rej(arr)
            }
            
            navigator.geolocation.getCurrentPosition(success, error)
        })
    }

    async getWeatherData() {
        await this.setCoords()
        const weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&appid=${this.API_KEY}`)
        const weatherData = await weather.json()
        this.weatherData = {
            city: weatherData.name,
            tempCelcius: (weatherData.main.temp - 273.15).toFixed(2),
            humidity: weatherData.main.humidity,
            windSpeed: weatherData.wind.speed,
            weatherIcon: weatherData.weather[0].icon
        }
        this.showTheWeather()
    }

    showTheWeather() {
        tempContainer.textContent = this.weatherData.tempCelcius
        humidityContainer.textContent = this.weatherData.humidity
        windContainer.textContent = this.weatherData.windSpeed
        cityContainer.textContent = this.weatherData.city

        const icon = document.createElement('img')
        icon.src = `https://openweathermap.org/img/wn/${this.weatherData.weatherIcon}@2x.png`
        iconContainer.appendChild(icon)
    }
      
}

export { Weather }