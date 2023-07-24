class Weather {
    constructor() {
        this.lat
        this.lon
        this.API_KEY = window.OPENWEATHER_API_KEY
    }

    async showTheWeather() {
        this.setCoords()
        const weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&appid=${this.API_KEY}`)
        console.log(this.API_KEY);
        const weatherData = await weather.json()
        console.log(weatherData)
    }

    setCoords() {
        navigator.geolocation.getCurrentPosition((pos) => {
            if(pos) {
                this.lat = pos.coords.latitude
                this.long = pos.coords.longitude
            } else {
                this.lat = 0
                this.lat = 0
            }
        })
    }
}

export { Weather }