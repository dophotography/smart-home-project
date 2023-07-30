class Documentation {
    constructor() {
        this.dashboardBtn = dashboardBtn
        this.logoBtn = logoBtn

        this.core = core
        this.player = player
        this.weath = weath
        this.modal = modal
        this.auth = auth

        this.coreBtn = coreBtn
        this.playerBtn = playerBtn
        this.weathBtn = weathBtn
        this.modalBtn = modalBtn
        this.authBtn = authBtn

        this.components = document.querySelectorAll('.component')
        this.docs = document.querySelectorAll('.docs')
    }

    listenForClicks() {
        this.coreBtn.onclick = () => {
            this.hideMainComponents()
            this.hideOtherDocs()
            this.openCoreDoc()
        }

        this.playerBtn.onclick = () => {
            this.hideMainComponents()
            this.hideOtherDocs()
            this.openPlayerDoc()
        }

        this.authBtn.onclick = () => {
            this.hideMainComponents()
            this.hideOtherDocs()
            this.openAuthDoc()
        }

        this.modalBtn.onclick = () => {
            this.hideMainComponents()
            this.hideOtherDocs()
            this.openModalDoc()
        }

        this.weathBtn.onclick = () => {
            this.hideMainComponents()
            this.hideOtherDocs()
            this.openWeathDoc()
        }

        this.dashboardBtn.onclick = () => {
            this.docs.forEach(doc => {
                doc.classList.add('hidden')
            })
            this.components.forEach(component => {
                component.classList.remove('hidden')
            })
        }

        this.logoBtn.onclick = () => {
            this.docs.forEach(doc => {
                doc.classList.add('hidden')
            })
            this.components.forEach(component => {
                component.classList.remove('hidden')
            })
        }
    }

    openCoreDoc() {
        this.core.classList.remove('hidden')
    }

    openPlayerDoc() {
        this.player.classList.remove('hidden')
    }

    openModalDoc() {
        this.modal.classList.remove('hidden')
    }

    openAuthDoc() {
        this.auth.classList.remove('hidden')
    }

    openWeathDoc() {
        this.weath.classList.remove('hidden')
    }

    hideMainComponents() {
        this.components.forEach(component => {
            component.classList.add('hidden')
        })
    }

    hideOtherDocs() {
        this.docs.forEach(doc => {
            doc.classList.add('hidden')
        })
    }
}

export { Documentation }