// app.js
import { Lights, HeatingSystem, Lamp, TV, Alexa, SmartHome } from './smart-elements.js';
import { AudioPlayer } from './player.js'
import { Weather } from './weather.js'
import { Burger } from './burger.js'
import { Modal } from './modal.js'

const burger = new Burger()
const modal = new Modal()

const lamp = new Lamp()
const alexa = new Alexa()
const tv = new TV()
const heatingSystem = new HeatingSystem()
const lights = new Lights()
const audioPlayer = new AudioPlayer()
const weather = new Weather()

const smartHome = new SmartHome()

smartHome.addComponent('lamp', lamp)
smartHome.addComponent('alexa', alexa)
smartHome.addComponent('lights', lights)
smartHome.addComponent('tv', tv)
smartHome.addComponent('heating', heatingSystem)
smartHome.addComponent('player', audioPlayer)
smartHome.addComponent('weather', weather)

weather.getWeatherData()

lightsToggle.onclick = () => {
    lights.toggle()
    localStorage.setItem('lightsState', JSON.stringify(lights))
}

tvChannels.addEventListener('change', (event) => {
    const selectedChannel = event.target.value
    tv.changeChannel(selectedChannel)
    localStorage.setItem('tvState', JSON.stringify(tv))
})

alexaToggle.onclick = () => {
    alexa.toggle()
    localStorage.setItem('alexaState', JSON.stringify(lights))
}

lampToggle.onclick = () => {
    lamp.toggle()
    localStorage.setItem('lampToggle', JSON.stringify(lamp))
}

heatingSlider.addEventListener('input', (event) => {
    const temperature = parseInt(event.target.value)
    heatingSystem.setTemperature(temperature)
    heatingTemp.textContent = `${temperature}°C`
    localStorage.setItem('heatingState', JSON.stringify(heatingSystem))
})

prevButton.onclick = () => {
    setTimeout(() => audioPlayer.playPreviousSong(), 1000)
}

nextButton.onclick = () => {
    setTimeout(() => audioPlayer.playNextSong(), 1000)
}

songSelect.addEventListener('change', () => {
    audioPlayer.showSongTags()
    setTimeout(() => audioPlayer.playSelectedSong(), 1000)
    localStorage.setItem('audioPlayerState', JSON.stringify(audioPlayer))
})

burger.burgerWork()

modal.showLoginModal()


window.addEventListener('load', () => {

    audioPlayer.showSongTags()
    setTimeout(() => audioPlayer.updateSelectedSong(), 1000)
    
    const savedTvState = localStorage.getItem('tvState')
    if (savedTvState) {
      const tvState = JSON.parse(savedTvState)
      tv.isOn = tvState.isOn
      tv.updateUI()
    }

    const savedAudioPlayerState = localStorage.getItem('audioPlayerState')
    if(savedAudioPlayerState) {
        const audioPlayerState = JSON.parse(savedAudioPlayerState)
        audioPlayer.selectedSongIndex = audioPlayerState.selectedSongIndex
        audioPlayer.updateSelectedSong()
    }

    const savedAlexaState = localStorage.getItem('alexaState')
    if(savedAlexaState) {
        const alexaState = JSON.parse(savedAlexaState)
        alexa.isOn = alexaState.isOn
        alexa.updateUI()
    }

    const savedLampState = localStorage.getItem('lampState')
    if(savedLampState) {
        const lampState = JSON.parse(savedLampState)
        lamp.isOn = lampState.isOn
        lamp.updateUI()
    }

    const savedLightsState = localStorage.getItem('lightsState')
    if (savedLightsState) {
      const lightsState = JSON.parse(savedLightsState)
      lights.isOn = lightsState.isOn
      lights.updateUI()
    }

    const savedHeatingState = localStorage.getItem('heatingState');
    if (savedHeatingState) {
        const heatingState = JSON.parse(savedHeatingState)
        heatingSystem.temperature = heatingState.temperature
        document.getElementById('heatingTemp').textContent = `${heatingSystem.temperature}°C`
    }
})