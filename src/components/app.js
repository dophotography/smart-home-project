import { Lights, HeatingSystem, Lamp, TV, SmartHome } from './smart-elements.js';
import { AudioPlayer } from './player.js'
import { Weather } from './weather.js'
import { Burger } from './burger.js'
import { Modal } from './modal.js'
import { Documentation } from './docs.js';
import { abi } from './contract/abi.js' 

const burger = new Burger()
const modal = new Modal(abi, window.CONTRACT_ADDRESS)
const doc = new Documentation()

const lamp = new Lamp()
const tv = new TV()
const heatingSystem = new HeatingSystem()
const lights = new Lights()
const audioPlayer = new AudioPlayer()
const weather = new Weather()

const smartHome = new SmartHome()

smartHome.addComponent('lamp', lamp)
smartHome.addComponent('lights', lights)
smartHome.addComponent('tv', tv)
smartHome.addComponent('heating', heatingSystem)
smartHome.addComponent('player', audioPlayer)
smartHome.addComponent('weather', weather)



lightsToggle.onclick = () => {
    lights.toggle()
    localStorage.setItem('lightsState', JSON.stringify(lights))
}

tvChannels.addEventListener('change', (event) => {
    const selectedChannel = event.target.value
    tv.changeChannel(selectedChannel)
    localStorage.setItem('tvState', JSON.stringify(tv))
})

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
    audioPlayer.playPreviousSong()
}

nextButton.onclick = () => {
    audioPlayer.playNextSong()
}

songSelect.addEventListener('change', () => {
    audioPlayer.showSongTags()
    audioPlayer.playSelectedSong()
    localStorage.setItem('audioPlayerState', JSON.stringify(audioPlayer))
})

weather.getWeatherData()
modal.showAuthModal()
burger.burgerWork()
doc.listenForClicks()

window.addEventListener('load', () => {
    audioPlayer.showSongTags()
    audioPlayer.updateSelectedSong()
    
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