class Alexa {
    constructor() {
        this.isOn = false
    }

    toggle() {
        this.isOn = !this.isOn
        this.updateUI()
    }

    updateUI() {
        if (this.isOn) {
            alexaToggle.textContent = 'Turn Off Alexa'
            alexaToggle.classList.add('bg-red-500')
            alexaToggle.classList.remove('bg-blue-500')
        } else {
            alexaToggle.textContent = 'Turn On Alexa'
            alexaToggle.classList.add('bg-blue-500')
            alexaToggle.classList.remove('bg-red-500')
        }
    }
}

class Lamp {
    constructor() {
        this.isOn = false
    }

    toggle() {
        this.isOn = !this.isOn
        this.updateUI()
    }

    updateUI() {
        if (this.isOn) {
            lampToggle.textContent = 'Turn Off lamp'
            lampToggle.classList.add('bg-red-500')
            lampToggle.classList.remove('bg-blue-500')
        } else {
            lampToggle.textContent = 'Turn On lamp'
            lampToggle.classList.add('bg-blue-500')
            lampToggle.classList.remove('bg-red-500')
        }
    }
}

class Lights {
    constructor() {
        this.isOn = false
    }

    toggle() {
        this.isOn = !this.isOn
        this.updateUI()
    }

    updateUI() {
        if (this.isOn) {
            lightsToggle.textContent = 'Turn Off lights'
            lightsToggle.classList.add('bg-red-500')
            lightsToggle.classList.remove('bg-blue-500')
        } else {
            lightsToggle.textContent = 'Turn On lights'
            lightsToggle.classList.add('bg-blue-500')
            lightsToggle.classList.remove('bg-red-500')
        }
    }
}

class TV {
    constructor() {
        this.isOn = false
        this.currentChannel = 'Channel 1'
        this.channels = ['Channel 1', 'Channel 2', 'Channel 3']
    }

    toggle() {
        this.isOn = !this.isOn
        this.updateUI()
    }

    changeChannel(channel) {
        this.currentChannel = channel
        this.updateUI()
    }

    updateUI() {
        // Update the TV UI elements based on the state of the TV
        // ...
    }
}
  
class HeatingSystem {
    constructor() {
        this.temperature = 20
    }

    increaseTemperature() {
        this.temperature++
        this.updateUI()
    }

    decreaseTemperature() {
        this.temperature--
        this.updateUI()
    }

    setTemperature(newTemperature) {
        if (typeof newTemperature === 'number') {
            if (newTemperature >= 10 && newTemperature <= 30) {
                this.temperature = newTemperature
                this.updateUI()
            } else {
                console.error('Invalid temperature value. Temperature must be between 10°C and 30°C.')
            }
        } else {
            console.error('Invalid temperature value. Temperature must be a number.')
        }
    }

    updateUI() {
        // Update the Heating System UI elements based on the temperature
        // ...
    }
}

  
  // Implement other component classes (Blinds, Alarm, etc.) similarly...
  
class SmartHome {
    constructor() {
        this.components = new Map();
    }

    addComponent(name, component) {
        this.components.set(name, component)
    }

    removeComponent(name) {
        this.components.delete(name)
    }

    getComponent(name) {
        return this.components.get(name)
    }
}
  
export { Lights, TV, HeatingSystem, SmartHome, Lamp, Alexa }
  