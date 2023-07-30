class AuthContract {
    constructor(abi) {
        this.abi = abi
        this.contractAddress = '0x0fB3c24bfE5C57298E3019CD3A6367D779919B04'
        this.web3 = new Web3(window.ethereum)
    }

    async checkMetaMask() {
        if(typeof window.ethereum === 'undefined') {
            alert('Install MetaMask to use this app')
            return false
        }
        return true
    }

    contractQuery() {
        return new this.web3.eth.Contract(this.abi, this.contractAddress)
    }

    async connectWallet() {
        if (!(await this.checkMetaMask())) {
            return
        }
      
        try {
            const accounts = await this.web3.eth.getAccounts()
            const sender = accounts[0]

            const isLoggedIn = await this.contractQuery().methods.isUserLoggedIn().call()

            if (!isLoggedIn) {
                await this.contractQuery().methods.connectWallet().send({ from: sender })
            }
            console.log(`You are succesfully logged in, ${sender}`)
        
        } catch (error) {
            console.warn('Error while connecting wallet:', error)
            alert('Error while connecting wallet.')
        }
    }

    async changeHouseName(newHouseName) {
        console.log(newHouseName)
        if (!newHouseName) {
            alert('Please provide a valid name.')
            return
        }
        
        try {
            const accounts = await this.web3.eth.getAccounts()
            const sender = accounts[0]
            const gasLimit = 300000

            await this.contractQuery().methods.setHouseName(newHouseName).send({ from: sender, gas: gasLimit })

            shTitle.textContent = newHouseName
        } catch (error) {
            console.warn('Error while changing house name:', error)
            alert('Error while changing house name.')
        }
    }

    async showHouseName() {
        if (!(await this.checkMetaMask())) {
            return
        }
        
        try {
            const houseName = await this.contractQuery().methods.getHouseName().call()
            console.log(houseName)

            // shTitle.textContent = houseName
        } catch (err) {
            console.warn('Error while getting house name:', err)
            alert('Error while getting house name.')
        }
    }

    async isUserLoggedIn() {
        if (!(await this.checkMetaMask())) {
          return
        }
      
        try {
            const isLoggedIn = await this.contractQuery().methods.isUserLoggedIn().call()
            if (isLoggedIn) {
                console.log('User is logged in.')
                return true
            } else {
                console.log('User is not logged in. Connect your wallet.')
                return false
            }
        } catch (err) {
            console.warn('Error while getting login status: ', err)
            alert('Error while getting login status.')
        }
    }

}

export { AuthContract }