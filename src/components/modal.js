import { AuthContract } from './contract/auth-contract.js'


class Modal {
    constructor(abi) {
        this.authModal = authModal
        this.authContract = new AuthContract(abi)
        this.connectionStatus = connectionStatus
        this.openModal = openModal
        this.houseName = houseName
        this.body = body
        this.authCloseModal = authCloseModal
        this.connectWallet = connectWallet
        this.changeHouseName = changeHouseName
        this.shTitle = shTitle
    }

    showAuthModal() {
        this.openModal.onclick = () => {
            this.authModal.classList.remove('hidden')
            this.body.classList.add('position-fixed')

            this.authCloseModal.onclick = () => {
                this.authModal.classList.add('hidden')
                this.body.classList.remove('position-fixed')
            }

            this.connectWallet.onclick = () => {
                if(this.authContract.isUserLoggedIn()) {
                    this.authContract.connectWallet()
                    this.connectionStatus.textContent = 'Connected'

                    this.authModal.classList.add('hidden')
                    this.body.classList.remove('position-fixed')
                } else {
                    alert('Connect the wallet')
                }
            }

            this.changeHouseName.onclick = () => {
                this.authContract.changeHouseName(this.houseName.value)
                this.authContract.showHouseName()
            }
        }
    }

}

export { Modal }