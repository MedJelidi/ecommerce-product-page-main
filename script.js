const menuOpen = document.querySelector('.icon-menu')
const menuClose = document.querySelector('.icon-close')
const menu = document.querySelector('.menu')
const blackLayer = document.querySelector('.black-layer')
const cartIcon = document.querySelector('.cart-icon')
const cartContainer = document.querySelector('.cart-container')

menuOpen.addEventListener('click', openMenu)
menuClose.addEventListener('click', closeMenu)
cartIcon.addEventListener('click', toggleCart)

function openMenu() {
    menu.classList.add('show-menu')
    blackLayer.classList.add('menu-on')
}

function closeMenu() {
    menu.classList.remove('show-menu')
    blackLayer.classList.remove('menu-on')
}

function toggleCart() {
    cartContainer.classList.toggle('show-cart')
}