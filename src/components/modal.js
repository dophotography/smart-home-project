class Modal {
    constructor() {
        this.loginModal = loginModal
        this.loginCloseModal = loginCloseModal

        this.registerModal = registerModal
        this.registerCloseModal = registerCloseModal

        this.createAccount = createAccount
        this.signIn = signIn

        this.loginForm = loginForm
        this.registerForm = registerForm

        this.login = false
        this.body = body
        this.userBtn = userBtn
    }

    showLoginModal() {
        this.userBtn.onclick = () => {
            this.loginModal.classList.remove('hidden')
            this.body.classList.add('position-fixed')

            this.loginCloseModal.onclick = () => {
                this.loginModal.classList.add('hidden')
                this.body.classList.remove('position-fixed')
            }

            this.createAccount.onclick = () => {
                this.removeRequiredAttribute(this.loginForm)

                this.loginModal.classList.add('hidden')

                this.registerModal.classList.remove('hidden')
            }

            this.showRegisterModal()
        }
    }

    showRegisterModal() {
        this.createAccount.onclick = () => {
            this.removeRequiredAttribute(this.loginForm)

            this.loginModal.classList.add('hidden')

            this.registerModal.classList.remove('hidden')

            this.registerCloseModal.onclick = () => {
                this.registerModal.classList.add('hidden')
                this.body.classList.remove('position-fixed')
            }


            this.signIn.onclick = () => {
                this.removeRequiredAttribute(this.registerForm)

                this.registerModal.classList.add('hidden')

                this.loginModal.classList.remove('hidden')
            }
        }
    }

    removeRequiredAttribute(enteredForm) {
        const inputFields = enteredForm.querySelectorAll('input')

        inputFields.forEach(inputField => {
          inputField.removeAttribute('required');
        })
    }
}

export { Modal }