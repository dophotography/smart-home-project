// app.js
import { Lights, HeatingSystem, TV, Alexa, SmartHome } from './smart-elements.js';

const alexa = new Alexa()
const tv = new TV()
const heatingSystem = new HeatingSystem()
const lights = new Lights()

const smartHome = new SmartHome()

smartHome.addComponent('alexa', alexa)
smartHome.addComponent('lights', lights)
smartHome.addComponent('tv', tv)
smartHome.addComponent('heating', heatingSystem)

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


heatingSlider.addEventListener('input', (event) => {
    const temperature = parseInt(event.target.value)
    heatingSystem.setTemperature(temperature)
    document.getElementById('heating-temp').textContent = `${temperature}°C`
    localStorage.setItem('heatingState', JSON.stringify(heatingSystem))
})

window.addEventListener('load', () => {
    const savedTvState = localStorage.getItem('tvState')
    if (savedTvState) {
      const tvState = JSON.parse(savedTvState)
      tv.isOn = tvState.isOn
      tv.updateUI()
    }

    const savedAlexaState = localStorage.getItem('alexaState')
    if(savedAlexaState) {
        const alexaState = JSON.parse(savedAlexaState)
        alexa.isOn = alexaState.isOn
        alexa.updateUI()
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
        document.getElementById('heating-temp').textContent = `${heatingSystem.temperature}°C`
    }
})