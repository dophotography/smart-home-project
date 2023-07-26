class Burger {
    constructor() {
        this.sidebar = drawerNavigation
        this.burgerBtn = burgerBtn
    }

    burgerWork() {
        this.burgerBtn.onclick = () => {
            this.sidebar.classList.toggle('-translate-x-full')
        }
    }
    
}

export { Burger }