import { menuArray } from "./data.js";



let orderArray = []


document.addEventListener('click', function(e) {
    if (e.target.dataset.buy) {
        handleBuyClick(e.target.dataset.buy)
    } else if (e.target.dataset.remove) {
        handleRemoveClick(e.target.dataset.remove)
    }
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
        document.getElementById('checkout-section').classList.remove('hidden') 
    } else {document.getElementById('checkout-section').classList.add('hidden')}
    document.getElementById('order-item-list').innerHTML= updateCheckoutHtml()
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