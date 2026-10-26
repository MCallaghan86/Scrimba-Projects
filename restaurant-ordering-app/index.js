import { menuArray } from "./data.js";



let orderArray = []


const overlay = document.getElementById('modal-bg-overlay')
const checkout = document.getElementById('checkout-section')
const thankYouName = document.getElementById('username-thanks')
const thankYouContainer = document.getElementById('thank-you-container')
const itemList = document.getElementById('order-item-list')

document.addEventListener('click', function(e) {
    if (e.target.dataset.buy) {
        handleBuyClick(e.target.dataset.buy)
    } else if (e.target.dataset.remove) {
        handleRemoveClick(e.target.dataset.remove)
    } else if (e.target.id === 'complete-order-btn') {
        handleOrderClick()
    } 
})

document.getElementById('card-form').addEventListener('submit',function(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    handlePayClick(formData)
})

function handleBuyClick(menuItem) {
    const item = menuArray.find(food => food.name === menuItem)
    orderArray.push(item)
    renderCheckout()

}

function handleRemoveClick(itemIndex) {
     orderArray.splice(Number(itemIndex), 1)
     renderCheckout()
}

function handleOrderClick() {
    overlay.classList.remove('hidden')
}
function handlePayClick(formData) {
    const userDetails = Object.fromEntries(formData)
    thankYouName.innerText = userDetails.username
    thankYouContainer.classList.remove('hidden')
    overlay.classList.add('hidden')
    checkout.classList.add('hidden')
    itemList.innerHTML = ''
    

}

function updateCheckoutHtml() {

    let checkoutHtml = ''
    
    orderArray.forEach((item, index) => {
        checkoutHtml += `
                    <div class="order-item-selected">
                        <p class="order-item-name">${item.name}</p>
                        <button class="remove-item-btn" data-remove="${index}">remove</button>
                        <p class="order-item-price">$${item.price}</p>
                    </div>
                    `
    })
    return checkoutHtml

}

function getOrderTotal(){
    const orderPrice = orderArray.reduce(function(total, currentItem){
                return total + currentItem.price
        }, 0)
    return orderPrice
}

function renderCheckout() {
    if (orderArray.length) {
        checkout.classList.remove('hidden') 
    } else {checkout.classList.add('hidden')}
    itemList.innerHTML= updateCheckoutHtml()
    document.getElementById('order-price').textContent = '$' + getOrderTotal()
}


function getMenuHtml() {

    
    let menuHtml =''
    menuArray.forEach(item => {
         menuHtml += `  <div class="menu-item" data-name="${item.name}">
                            <div class="menu-image">    
                                <p class="emoji">${item.emoji}</p>
                            </div>
                            <div class="menu-details">
                                <p class="item-name">${item.name}</p>
                                <p class="ingredients">${item.ingredients}</p>
                                <p class="item-price">$${item.price}</p>
                            </div>
                            <div class="add-btn-container">
                                <button class="add-item-btn" data-buy="${item.name}">+</button>
                            </div>
                        </div>`
            
    })
    return menuHtml
    
}

function renderMenu() {
    document.getElementById('menu-container-id').innerHTML = getMenuHtml()

}
renderMenu()