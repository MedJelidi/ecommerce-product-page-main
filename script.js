const menuOpen = document.querySelector('.icon-menu')
const menuClose = document.querySelector('.icon-close')
const menu = document.querySelector('.menu')
const blackLayer = document.querySelector('.black-layer')
const cartIcon = document.querySelector('.cart-icon')
const cartContainer = document.querySelector('.cart-container')
const images = document.querySelector('.images')
const imagesNumber = images.querySelectorAll('img').length
const prevArrow = document.querySelector('.prev-arrow')
const nextArrow = document.querySelector('.next-arrow')

let activeIndex = 0

menuOpen.addEventListener('click', openMenu)
menuClose.addEventListener('click', closeMenu)
cartIcon.addEventListener('click', toggleCart)
nextArrow.addEventListener('click', () => slide('next'))
prevArrow.addEventListener('click', () => slide('prev'))

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

function slide(direction) {
    if (direction === 'next') {
        activeIndex = activeIndex >= imagesNumber - 1 ? 0 : activeIndex + 1
    } else {
        activeIndex = activeIndex <= 0 ? imagesNumber - 1 : activeIndex - 1
    }
    images.style.transform = `translateX(-${100 * activeIndex}%)`
}