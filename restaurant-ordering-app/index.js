import { menuArray } from "./data.js";



let orderArray = []
let selectedRating = 0;
let hoverRating = 0;


const cardOverlay = document.getElementById('cardmodal-bg-overlay')
const checkout = document.getElementById('checkout-section')
const thankYouName = document.getElementById('username-thanks')
const thankYouContainer = document.getElementById('thank-you-container')
const itemList = document.getElementById('order-item-list')
// Rating modal elements
const ratingOverlay =document.getElementById('rating-bg-overlay')
const ratingContainer = document.getElementById('rating-container')
const resultContainer = document.getElementById('result-container')
const rateBtn = document.getElementById('rate-btn')
const cancelBtn = document.getElementById('cancel-btn')
const ratingStars = document.getElementById('rating-stars')
const closeBtn = document.getElementById('close-result-btn')
const stars = document.querySelectorAll('.fa-star')


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
// Rating modal events 

rateBtn.addEventListener('click', function() {
    ratingContainer.classList.add('hidden')
    resultContainer.classList.remove('hidden')
    document.getElementById('rating-message').innerHTML = 
                    `Thanks for giving us a ${selectedRating} 
                    <i class="fa-solid fa-star" id="result-star"></i> rating!`

})

cancelBtn.addEventListener('click', function() {
    refreshResults()
})

closeBtn.addEventListener('click', function() {
    refreshResults()
})

stars.forEach(star => {
    star.addEventListener('mouseover', function() {
        hoverRating = star.getAttribute('data-value')

        stars.forEach(s => {
            s.classList.toggle('fa-solid', s.getAttribute('data-value') <= hoverRating)
        })
    })

    star.addEventListener('click', function() {
        selectedRating = star.getAttribute('data-value')
        rateBtn.disabled = false

        stars.forEach(s => {
            s.classList.toggle('fa-solid', s.getAttribute('data-value') <= selectedRating)
        })
    })
})

ratingStars.addEventListener('mouseleave', () => {
    stars.forEach(s => {
            s.classList.toggle('fa-solid', s.getAttribute('data-value') <= selectedRating)
        })
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
    cardOverlay.classList.remove('hidden')
}
function handlePayClick(formData) {
    const userDetails = Object.fromEntries(formData)
    thankYouName.innerText = userDetails.username
    thankYouContainer.classList.remove('hidden')
    cardOverlay.classList.add('hidden')
    checkout.classList.add('hidden')
    itemList.innerHTML = ''
    ratingOverlay.classList.remove('hidden')
    refreshResults()
    

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
         const finalPrice = checkMealDeal(orderPrice)
    return finalPrice
}

function renderCheckout() {
    if (orderArray.length) {
        checkout.classList.remove('hidden') 
    } else {checkout.classList.add('hidden')}
    itemList.innerHTML= updateCheckoutHtml()
    document.getElementById('order-price').textContent = '$' + getOrderTotal().toFixed(2)
}

function checkMealDeal(orderPrice) {
    
    const drink = orderArray.find((element) =>element.type === 'drink')
    const food = orderArray.find(element => element.type === 'food')

    if (drink && food) {
        document.getElementById('meal-deal').classList.remove('hidden')
        const discount = (drink.price + food.price) * 0.2
        return orderPrice - discount
    } else {
        document.getElementById('meal-deal').classList.add('hidden')
        return orderPrice
    }

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

function refreshResults() {
    ratingOverlay.classList.add('hidden')
    ratingContainer.classList.remove('hidden')
    resultContainer.classList.add('hidden')
    selectedRating = 0
    hoverRating = 0
}

function renderMenu() {
    document.getElementById('menu-container-id').innerHTML = getMenuHtml()

}
renderMenu()