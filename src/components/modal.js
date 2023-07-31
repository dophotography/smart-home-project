import { AuthContract } from './contract/auth-contract.js'


class Modal {
    constructor(abi, address) {
        this.authModal = authModal
        this.contract = new AuthContract(abi, address)
        this.connectionStatus = connectionStatus
        this.openModal = openModal
        this.houseName = houseName
        this.body = body
        this.authCloseModal = authCloseModal
        this.connectWallet = connectWallet
        this.changeHouseName = changeHouseName
        this.shTitle = shTitle

        this.connected = null
    }

    showAuthModal() {
        this.openModal.onclick = async () => {
            const web3 = await this.contract.initWeb3()

            this.authModal.classList.remove('hidden')
            this.body.classList.add('position-fixed')

            this.authCloseModal.onclick = () => {
                this.authModal.classList.add('hidden')
                this.body.classList.remove('position-fixed')
            }

            this.connectWallet.onclick = async () => {
                if(web3) {
                    if(this.contract.isUserLoggedIn()) {
                        await this.contract.connectWallet()
                        await this.contract.getHouseName()
                    } else {
                        alert('Connect the wallet')
                    }
                }
            }

            this.changeHouseName.onclick = async () => {
                if(this.contract.sender !== null) {
                    try {
                        await this.contract.setHouseName(this.houseName.value)
                        // this.shTitle.textContent = this.houseName.value
                        await this.contract.getHouseName().then(() => {
                            this.authModal.classList.add('hidden')
                            this.body.classList.remove('position-fixed')
                        })
                        
                    } catch(err) {
                        console.warn('Wallet is not connected: ', err)
                    }
                }
            }
        }
    }
}

export { Modal }