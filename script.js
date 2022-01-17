const menuOpen = document.querySelector('.icon-menu')
const menuClose = document.querySelector('.icon-close')
const menu = document.querySelector('.menu')
const blackLayer = document.querySelector('.black-layer')
const cartIcon = document.querySelector('.cart-icon-container')
const cartIconImg = cartIcon.querySelector('img')
const cartContainer = document.querySelector('.cart-container')
const cartBody = document.querySelector('.cart-body')
const images = document.querySelector('.images')
const imagesNumber = images.querySelectorAll('img').length
const thumbnailImages = document.querySelectorAll('main>.gallery>.thumbnail-images>div')
const thumbnailImagesInLightbox = document.querySelectorAll('.lightbox>.container>.thumbnail-images>div')
const imagesInLightbox = document.querySelector('.lightbox>.container>.gallery>.images')
const prevArrow = document.querySelector('main>.gallery>.prev-arrow')
const nextArrow = document.querySelector('main>.gallery>.next-arrow')
const prevArrowInLightbox = document.querySelector('.lightbox>.container>.gallery>.prev-arrow')
const nextArrowInLightbox = document.querySelector('.lightbox>.container>.gallery>.next-arrow')
const minusIcon = document.querySelector('.icon-minus')
const plusIcon = document.querySelector('.icon-plus')
const quantityElem = document.querySelector('.quantity')
const closeLightboxIcon = document.querySelector('.close-lightbox')
const lightbox = document.querySelector('.lightbox')
const addToCartBtn = document.querySelector('.add-to-cart')
const badgeElem = document.querySelector('.cart-badge')
const singleImage = document.querySelectorAll('main>.gallery>.images>img')[0]

let activeIndex = 0
let activeIndexInLightbox = 0
let quantity = 0
let currentThumb = 0
let currentThumbInLightBox = 0
let cartItems = []
let itemID = 0

menuOpen.addEventListener('click', openMenu)
menuClose.addEventListener('click', closeMenu)
cartIcon.addEventListener('click', toggleCart)
nextArrow.addEventListener('click', () => slide('next'))
prevArrow.addEventListener('click', () => slide('prev'))
nextArrowInLightbox.addEventListener('click', () => slideInLightbox('next'))
prevArrowInLightbox.addEventListener('click', () => slideInLightbox('prev'))
minusIcon.addEventListener('click', removeQuantity)
plusIcon.addEventListener('click', addQuantity)
thumbnailImages.forEach((i, k) => i.addEventListener('click', () => clickThumbnail(i, k)))
thumbnailImagesInLightbox.forEach((i, k) => i.addEventListener('click', () => clickThumbnailInLightBox(i, k)))
images.addEventListener('click', openLightbox)
closeLightboxIcon.addEventListener('click', closeLightbox)
addToCartBtn.addEventListener('click', updateCart)

function openLightbox() {
    if (window.innerWidth >= 1468) {
        lightbox.classList.add('lightbox-on')
            // console.log(thumbnailImagesInLightbox[activeIndex])
        console.log(thumbnailImagesInLightbox[activeIndex])
        clickThumbnailInLightBox(thumbnailImagesInLightbox[activeIndex], activeIndex)
    }
}

function closeLightbox() {
    lightbox.classList.remove('lightbox-on')
}

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
    cartIconImg.classList.toggle('black-cart')
}

function slide(direction) {
    const checkpoint = window.innerWidth < 1468 ? 100 : 25
    if (direction === 'next') {
        activeIndex = activeIndex >= imagesNumber - 1 ? 0 : activeIndex + 1
    } else {
        activeIndex = activeIndex <= 0 ? imagesNumber - 1 : activeIndex - 1
    }
    images.style.transform = `translateX(-${checkpoint * activeIndex}%)`
    clickThumbnail(thumbnailImages[activeIndex], activeIndex)
}

function slideInLightbox(direction) {
    const checkpoint = window.innerWidth < 1468 ? 100 : 25
    if (direction === 'next') {
        activeIndexInLightbox = activeIndexInLightbox >= imagesNumber - 1 ? 0 : activeIndexInLightbox + 1
    } else {
        activeIndexInLightbox = activeIndexInLightbox <= 0 ? imagesNumber - 1 : activeIndexInLightbox - 1
    }
    imagesInLightbox.style.transform = `translateX(-${checkpoint * activeIndexInLightbox}%)`
    clickThumbnailInLightBox(thumbnailImagesInLightbox[activeIndexInLightbox], activeIndexInLightbox)
}

function addQuantity() {
    quantityElem.innerText = `${++quantity}`
}

function removeQuantity() {
    if (quantity <= 0) return
    quantityElem.innerText = `${--quantity}`
}

function clickThumbnail(img, k) {
    const checkpoint = window.innerWidth < 1468 ? 100 : 25
    images.style.transform = `translateX(-${k * checkpoint}%)`
    thumbnailImages[currentThumb].classList.remove('selected-image')
    currentThumb = k
    img.classList.add('selected-image')
    thumbnailImagesInLightbox[currentThumb].classList.add('selected-image')
    clickThumbnailInLightBox(thumbnailImagesInLightbox[k], k)
    activeIndex = k
}

function clickThumbnailInLightBox(img, k) {
    const checkpoint = window.innerWidth < 1468 ? 100 : 25
    imagesInLightbox.style.transform = `translateX(-${k * checkpoint}%)`
    thumbnailImagesInLightbox[currentThumbInLightBox].classList.remove('selected-image')
    currentThumbInLightBox = k
    img.classList.add('selected-image')
    activeIndexInLightbox = k
}

function updateCart() {
    if (quantity === 0) return
    cartBody.innerHTML = ''
    const itemToAddIdx = cartItems.findIndex(it => it.id === itemID)
    if (itemToAddIdx > -1) {
        cartItems[itemToAddIdx].quantity += quantity
    } else {
        cartItems.push({ id: itemID, name: 'Autumn Limited Edition Sneakers', price: 125, quantity, itemImg: { src: './images/image-product-1-thumbnail.jpg', alt: 'image-product-1-thumbnail' } })
    }
    cartItems.forEach(item => {
        const deleteIcon = document.createElement('img')
        deleteIcon.src = './images/icon-delete.svg'
        deleteIcon.alt = 'icon-delete'
        deleteIcon.classList.add('cart-item-delete')
        deleteIcon.addEventListener('click', () => {
            cartItem.remove()
            const itemToDeleteIdx = cartItems.findIndex(it => it.id === item.id)
            if (itemToDeleteIdx > -1) cartItems.splice(itemToDeleteIdx, 1)
            if (cartItems.length <= 0) cartBody.innerHTML = 'Your cart is empty.'
            updateBadge()
        })
        const name = document.createElement('h4')
        name.innerText = item.name
        const total = document.createElement('span')
        total.classList.add('total')
        total.innerText = `$${item.price * item.quantity}`
        const price = document.createElement('h4')
        price.innerText = `$${item.price} x ${item.quantity}`
        price.append(document.createTextNode(' '))
        price.append(total)
        const itemMetadata = document.createElement('div')
        itemMetadata.classList.add('cart-item-metadata')
        itemMetadata.append(name)
        itemMetadata.append(price)
        const itemImg = document.createElement('img')
        itemImg.src = item.itemImg.src
        itemImg.alt = item.itemImg.alt
        itemImg.classList.add('cart-item-picture')
        const cartItem = document.createElement('div')
        cartItem.classList.add('cart-item')
        cartItem.append(itemImg)
        cartItem.append(itemMetadata)
        cartItem.append(deleteIcon)
        cartBody.append(cartItem)
    })
    updateBadge()
    const checkoutBtn = document.createElement('button')
    checkoutBtn.classList.add(...['big-btn', 'checkout-btn'])
    checkoutBtn.innerText = 'Checkout'
    cartBody.append(checkoutBtn)
}

function updateBadge() {
    let totalQuantity = 0
    cartItems.forEach(item => totalQuantity += item.quantity)
    if (totalQuantity === 0) badgeElem.style.display = 'none'
    else {
        badgeElem.innerText = totalQuantity
        badgeElem.style.display = 'flex'
    }
}

const observer = new ResizeObserver((entries) => {
    if (entries[0].contentRect.width === 400) {
        if (window.innerWidth < 1000) images.style.transform = `translateX(-${100 * activeIndex}%)`
        else images.style.transform = `translateX(-${25 * activeIndex}%)`
    } else if (entries[0].contentRect.width === 500) {
        images.style.transform = `translateX(-${100 * activeIndex}%)`
    }
})
observer.observe(singleImage)