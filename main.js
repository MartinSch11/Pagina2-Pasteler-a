//Cambio de cantidad de articulos ingresado por el usuario
let minusBtn = document.querySelector('.input__minus');
let plusBtn = document.querySelector('.input__plus');
let userInput = document.querySelector('.input__number');

let userInputNumber = 0;

plusBtn.addEventListener('click', () => {
    userInputNumber++;
    userInput.value = userInputNumber;
    console.log(userInputNumber)
});

minusBtn.addEventListener('click', () => {
    userInputNumber--;
    if (userInputNumber <= 0) {
        userInputNumber = 0;
    }
    userInput.value = userInputNumber;
    console.log(userInputNumber)
});

// Se agregan el total de productos al carrito cuando se presiona el botón
const addToCartBtn = document.querySelector('.details__button');
let cartNotification = document.querySelector('.header__cart--notification');
let lastValue = parseInt(cartNotification.innerText);

addToCartBtn.addEventListener('click', () => {
    lastValue = lastValue + userInputNumber;

    // Actualizar la notificación del carrito con el valor actual de userInputNumber
    cartNotification.innerText = lastValue;
    cartNotification.style.display = 'block';

    // Llamar a drawProductInModal() para dibujar el producto en el modal
    drawProductInModal();

    // Actualizar el precio en el modal
    updatePrice();

    // Restablecer el valor de userInputNumber y userInput.value a 0
    userInputNumber = 0;
    userInput.value = 0;
});

//Modal el carrito
const cartIconBtn = document.querySelector('.header__cart');
const cartModal = document.querySelector('.cart-modal');
const productContainer = document.querySelector('.cart-modal__checkout-container');

let modalOpen = false;

cartIconBtn.addEventListener('click', () => {
    cartModal.classList.toggle('show');
    modalOpen = !modalOpen;
 
    document.addEventListener('click', (event) => {
        if (modalOpen && !cartModal.contains(event.target) && !cartIconBtn.contains(event.target)) {
            cartModal.classList.remove('show');
            modalOpen = false;
        }
    });

});

//Borrar el contenido del carrito
function deleteProduct(){
    const deleteBtn = document.querySelector('.cart-modal__delete');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', () => {
            productContainer.innerHTML = '<p class="cart-empty">El carrito está vacío</p>';
            lastValue = 0;
            cartNotification.innerText = lastValue;
        });
    }
}

//Cambiar imagenes cuando se presionan las flechas


//Funciones
function drawProductInModal(){
    let html;
    if (lastValue > 0) {
        // Si hay productos en el carrito, mostrar los detalles del producto
        html = `
        <div class="cart-modal__details-container">
            <img class="cart-modal__image" src="./imagen/brownie.jpg" alt="">
            <div>
                <p class="cart-modal__product">Brownie de chocolate</p>
                <p class="cart-modal__price">$125 x${lastValue}<span> $${lastValue * 125}</span></p>
            </div>
            <img class="cart-modal__delete" src="./imagen/trash-can.svg" alt="delete">
        </div>
        <div class="cart-modal__container">
            <button class="cart-modal__checkout">Confirmar compra</button>
        </div>`;
    } else {
        // Si el carrito está vacío, mostrar un mensaje indicando que está vacío
        html = '<p class="cart-empty">El carrito está vacío</p>';
    }

    // Insertar el HTML generado en el contenedor del carrito
    productContainer.innerHTML = html;

    // Adjuntar el evento de borrar producto
    deleteProduct();

    // Actualizar el precio en el modal
    updatePrice();
}

// Función para actualizar el precio en el modal
function updatePrice() {
    let priceModal = document.querySelector('.cart-modal__price');
    priceModal.innerHTML = `$125 x${lastValue}<span> $${lastValue * 125}</span>`;
}
