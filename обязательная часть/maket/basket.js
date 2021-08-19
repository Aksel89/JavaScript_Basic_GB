'use strict'

const openBasket = document.querySelector('.cartIconWrap');
const basketEl = document.querySelector('.basket');

openBasket.addEventListener('click', function () {
    basketEl.classList.toggle('hidden');
});

let addToCartButton = document.querySelectorAll('.featuredItem button');

addToCartButton.forEach(function (button) {
    button.addEventListener('click', addProductHandler);
});

const featuredItems = document.querySelectorAll('.featuredItem');

function addProductHandler(event) {
    let productId = event.currentTarget.getAttribute('data-productId');
    let name = featuredItems[productId].getElementsByClassName('featuredName')[0].innerText;
    let price = Number(featuredItems[productId].getElementsByClassName('featuredPrice')[0].innerText.slice(1));
    addProductInBasket(productId, name, price);
}

function addProductInBasket(productId, name, price) {
    addProductToObject(productId);
    increaseProductsInBasket();
    displayingProductBasket(productId, name, price);
    totalAmount(price);
}

let basket = {};

function addProductToObject(productId) {
    if (!(productId in basket)) {
        basket[productId] = 1;
    }
    else {
        basket[productId]++;
    }
}

const basketCounter = document.querySelector('.cartIconWrap span');

function increaseProductsInBasket() {
    basketCounter.textContent++;
}

function displayingProductBasket(productId, name, price) {
    let productInBasket = document.querySelector(`.productCount[data-productId="${productId}"]`);
    if (productInBasket) {
        increaseProductInBasket(productId);
        recalculationSumProduct(productId, price);
    }
    else {
        displayingProductBasketNew(productId, name, price);
    }
}

const basketTotalValue = document.querySelector('.basketTotalValue');

function totalAmount(price) {
    let totalSum = 0;
    for (let productId in basket) {
        totalSum += basket[productId] * price;
    }
    basketTotalValue.textContent = totalSum.toFixed(2);
}

function increaseProductsInBasket() {
    basketCounter.textContent++;
}


function increaseProductInBasket(productId) {
    let productCountEl = document.querySelector(`.productCount[data-productId="${productId}"]`);
    productCountEl.textContent++;
}

function recalculationSumProduct(productId, price) {
    const productTotalRowEl = document.querySelector(`.productTotalRow[data-productId="${productId}"]`);
    let totalPriceForRow = (basket[productId] * price).toFixed(2);
    productTotalRowEl.textContent = totalPriceForRow;
}

function addEventListenerForAddInBasket() {
    let addToCartButton = document.querySelectorAll('button[productId]')
    addToCartButton.forEach(function (button) {
        button.addEventListener('click', addProduct);
    });
}

const basketTotal = document.querySelector('.basketTotal');

function displayingProductBasketNew(productId, name, price) {
    let productRow = `
        <div class="basketRow">
            <div>${name}</div>
            <div>
                <span class="productCount" data-productId="${productId}">1</span> шт.
            </div>
            <div>$${price}</div>
            <div>
                $<span class="productTotalRow" data-productId="${productId}">${price}</span>
            </div>
        </div>
    `;
    basketTotal.insertAdjacentHTML("beforebegin", productRow);
}
