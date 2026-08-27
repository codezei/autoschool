export default function () {
    let pricePositions = document.querySelectorAll('.calculation')
    
    let cart = {
        items: [],
        summary: 0,

        changeCount: function (item, delta) {
            const index = this.items.findIndex((i) => i.id === item.id);

            if (index === -1) {
                if (delta > 0) {
                    this.items.push({
                        ...item,
                        count: delta,
                        summary: delta * item.price,
                    });
                }
                return;
            }

            const existing = this.items[index];
            const newCount = existing.count + delta;

            if (newCount <= 0) {
                this.items.splice(index, 1);
                return;
            }

            this.items[index] = {
                ...existing,
                count: newCount,
                summary: newCount * existing.price,
            };
        },

        getSummary: function () {
            this.summary = this.items.reduce((acc, item) => acc + item.summary, 0);
        },
    };
    cart.increaseCount = function (item) {
        this.changeCount(item, 1);
    };

    cart.decreaseCount = function (item) {
        this.changeCount(item, -1);
    };

    cart.addToCart = function (item) {
        this.changeCount(item, item.count); // добавляем сразу нужное кол-во
    };
    for(let i = 0; i < pricePositions.length; i++) {
        pricePositions[i].addEventListener('submit', function (e) {
            e.preventDefault()
            cart.addToCart({
                id: e.currentTarget.dataset.id,
                name: e.currentTarget.dataset.name,
                price: +e.currentTarget.dataset.price, 
                count: +e.currentTarget.count.value,
                summary: +e.currentTarget.count.value * +e.currentTarget.dataset.price
            })
            cart.getSummary()
            renderCart()
            e.currentTarget.reset()
        })
    }

    let cartBody = document.querySelector('.cart__body')
    let cartTotalValue = document.querySelector('.cart__total-value')
    let cartCount = document.querySelectorAll('.cart-button__count')
    let cartItemTemplate = document.querySelector('#cart-item-template')

    function renderCart () {

        cartBody.innerHTML = ''
        for(let i = 0; i < cart.items.length; i++) {
            const cartItem = cartItemTemplate.content.cloneNode(true)
            cartItem.querySelector('.cart-item').dataset.id = cart.items[i].id
            cartItem.querySelector('.cart-item__name').textContent = cart.items[i].name
            cartItem.querySelector('.cart-item__price').textContent = cart.items[i].price + ' zl'
            cartItem.querySelector('.cart-item__count').textContent = cart.items[i].count + ' szt.'
            cartItem.querySelector('.cart-item__summary').textContent = cart.items[i].summary + ' zl'
            cartItem.querySelector('.cart-item__increase-count').addEventListener('click', function () {
                cart.increaseCount(cart.items[i])
                renderCart()
            })
            cartItem.querySelector('.cart-item__decrease-count').addEventListener('click', function () {
                cart.decreaseCount(cart.items[i])
                renderCart()
            })
            cartBody.appendChild(cartItem)
            for(let i = 0; i <cartCount.length; i++) {
                cartCount[i].textContent = cart.items.length
            }
            cart.getSummary()
            cartTotalValue.textContent = cart.summary + ' zl'
        }
    }

    
}
