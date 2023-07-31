class AuthContract {
    static sender = null
    constructor(abi, address) {
        this.abi = abi
        this.contractAddress = address
        this.web3 = null
        this.contract = null
    }

    async initWeb3() {
        if (window.ethereum) {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' })
                this.web3 = new Web3(window.ethereum)
            } catch (error) {
                console.warn('Error while connecting to MetaMask:', error)
                return false
            }
        } else if (window.web3) {
            this.web3 = new Web3(window.web3.currentProvider)
        } else {
            console.warn('No Ethereum provider detected. Please install MetaMask or use a DApp browser.')
            return false
        }

        this.contract = new this.web3.eth.Contract(this.abi, this.contractAddress)
        return true
    }

    async connectWallet() {
        if (!this.web3) {
            console.error('Web3 not initialized. Call initWeb3() first.')
            return
        }
    
        try {
            const accounts = await this.web3.eth.getAccounts()
            if (accounts.length === 0) {
                alert('Please connect your wallet to proceed.')
                return
            }
            this.sender = accounts[0]

            await this.contract.methods.connectWallet().send({ from: this.sender });
            connectionStatus.textContent = 'Connected'

            alert('Wait a few second for application to connect the blockchain...')
            console.log(`You are successfully logged in, ${this.sender}`)
            return true
        } catch (error) {
            console.warn('Error while connecting wallet:', error)
            alert('Error while connecting wallet.')
            return false
        }
    }    

    async setHouseName(houseName) {
        if (!this.web3) {
            console.error('Web3 not initialized. Call initWeb3() first.')
            return
        }
    
        try {
            await this.contract.methods.setHouseName(houseName).send({ from: this.sender })
            alert('Wait a few second for transaction to complete...')
        } catch (error) {
            console.error('Error while setting house name:', error)
            if(typeof this.sender === 'undefined' || this.sender === null) {
                alert('You should connect your wallet first!')
            }
        }
    }

    async isUserLoggedIn() {
        if (!this.web3) {
            console.error('Web3 not initialized. Call initWeb3() first.')
            return false
        }
    
        try {
            const isLoggedIn = await this.contract.methods.isUserLoggedIn().call({ from: this.sender })
            return isLoggedIn
        } catch (error) {
            console.error('Error while checking login status:', error)
            return false
        }
    }

    async getHouseName() {
        if (!this.web3) {
            console.error('Web3 not initialized. Call initWeb3() first.')
            return
        }
    
        try {
            const houseName = await this.contract.methods.getHouseName().call({ from: this.sender })
            shTitle.textContent = `${houseName}`
        } catch (error) {
            console.error('Error while getting house name:', error)
            return
        }
    }

}

export { AuthContract }