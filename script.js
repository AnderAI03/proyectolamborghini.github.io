// Datos de ejemplo para los intercambios
const exchanges = [
    {
        id: 1,
        title: "Aguja",
        description: "La aguja con la que todo comenzó.",
        value: 1,
        date: "2023-01-01",
        image: "images/needle.jpg",
        details: "Historia detallada de cómo inició el proyecto con una simple aguja."
    },
    {
        id: 2,
        title: "Botón",
        description: "Intercambiado por la aguja.",
        value: 2,
        date: "2023-01-15",
        image: "images/button.jpg",
        details: "Un botón único que simboliza el primer paso."
    },
    // Agrega más intercambios según sea necesario
];

// Datos de ejemplo para los productos
const products = [
    {
        id: 1,
        name: "Camiseta Oficial",
        description: "Camiseta con el logo del proyecto.",
        price: 20.00,
        image: "images/shirt.jpg"
    },
    {
        id: 2,
        name: "Taza Personalizada",
        description: "Taza conmemorativa del proyecto.",
        price: 10.00,
        image: "images/mug.jpg"
    },
    // Agrega más productos según sea necesario
];

// Cargar intercambios dinámicamente
const exchangesContainer = document.getElementById('exchanges-container');

exchanges.forEach(exchange => {
    const card = document.createElement('div');
    card.classList.add('exchange-card');
    card.innerHTML = `
        <img src="${exchange.image}" alt="${exchange.title}">
        <div class="card-content">
            <h3>${exchange.title}</h3>
            <p>${exchange.description}</p>
            <p>Valor Aproximado: $${exchange.value}</p>
            <p>Fecha: ${exchange.date}</p>
        </div>
    `;
    card.addEventListener('click', () => {
        openExchangeModal(exchange);
    });
    exchangesContainer.appendChild(card);
});

// Función para abrir el modal de intercambios
function openExchangeModal(exchange) {
    const modal = document.getElementById('exchange-modal');
    const modalContent = document.getElementById('exchange-modal-content');
    modalContent.innerHTML = `
        <h3>${exchange.title}</h3>
        <img src="${exchange.image}" alt="${exchange.title}">
        <p>${exchange.details}</p>
    `;
    modal.style.display = 'block';
}

// Cerrar modal de intercambio
document.getElementById('close-exchange-modal').addEventListener('click', () => {
    document.getElementById('exchange-modal').style.display = 'none';
});

// Cargar productos dinámicamente
const productsContainer = document.getElementById('products-container');

products.forEach(product => {
    const card = document.createElement('div');
    card.classList.add('product-card');
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <div class="card-content">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p class="price">$${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Comprar</button>
        </div>
    `;
    productsContainer.appendChild(card);
});

// Carrito de compras
let cart = [];

// Función para añadir al carrito
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    Swal.fire({
        title: 'Añadido al Carrito',
        text: `${product.name} ha sido añadido al carrito.`,
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
    });
}

// Abrir carrito
document.querySelector('.cart-icon a').addEventListener('click', (e) => {
    e.preventDefault();
    const cartModal = document.getElementById('cart-modal');
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>El carrito está vacío.</p>';
    } else {
        cart.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item');
            itemDiv.innerHTML = `
                <p>${item.name} - $${item.price.toFixed(2)}</p>
                <button onclick="removeFromCart(${index})"><i class="fas fa-trash-alt"></i></button>
            `;
            cartItemsContainer.appendChild(itemDiv);
        });
    }

    updateCartTotal();
    cartModal.style.display = 'block';
});

// Cerrar carrito
document.getElementById('close-cart-modal').addEventListener('click', () => {
    document.getElementById('cart-modal').style.display = 'none';
});

// Actualizar total del carrito
function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById('cart-total').innerText = total.toFixed(2);
}

// Eliminar ítem del carrito
function removeFromCart(index) {
    cart.splice(index, 1);
    const cartModal = document.getElementById('cart-modal');
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>El carrito está vacío.</p>';
    } else {
        cart.forEach((item, idx) => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item');
            itemDiv.innerHTML = `
                <p>${item.name} - $${item.price.toFixed(2)}</p>
                <button onclick="removeFromCart(${idx})"><i class="fas fa-trash-alt"></i></button>
            `;
            cartItemsContainer.appendChild(itemDiv);
        });
    }

    updateCartTotal();
}

// Finalizar compra
document.getElementById('checkout-button').addEventListener('click', () => {
    if (cart.length === 0) {
        Swal.fire({
            title: 'Carrito Vacío',
            text: 'Agrega al menos un producto para finalizar la compra.',
            icon: 'warning',
            confirmButtonText: 'Aceptar'
        });
    } else {
        Swal.fire({
            title: 'Compra Exitosa',
            text: 'Gracias por tu compra!',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });
        cart = [];
        document.getElementById('cart-modal').style.display = 'none';
    }
});

// Animación de progreso
function animateProgressBar() {
    const progressBar = document.getElementById('progress');
    let progress = 0;
    const totalValue = 100000; // Valor aproximado del Lamborghini
    const currentValue = exchanges.reduce((sum, exchange) => sum + exchange.value, 0);
    const progressPercentage = (currentValue / totalValue) * 100;

    const interval = setInterval(() => {
        if (progress >= progressPercentage) {
            clearInterval(interval);
        } else {
            progress++;
            progressBar.style.width = progress + '%';
        }
    }, 10);
}

window.onload = () => {
    animateProgressBar();
    AOS.init({
        duration: 1000,
        once: true
    });
};

// Responsivo del menú
const nav = document.querySelector('nav ul');
const toggleMenu = document.querySelector('.toggle-menu');

toggleMenu.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// Cerrar modales al hacer clic fuera de ellos
window.addEventListener('click', (e) => {
    const offerModal = document.getElementById('offer-modal');
    const exchangeModal = document.getElementById('exchange-modal');
    const cartModal = document.getElementById('cart-modal');
    if (e.target === offerModal) {
        offerModal.style.display = 'none';
    }
    if (e.target === exchangeModal) {
        exchangeModal.style.display = 'none';
    }
    if (e.target === cartModal) {
        cartModal.style.display = 'none';
    }
});

// Mostrar Offer Modal
document.querySelector('.cta').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('offer-modal').style.display = 'block';
});

// Cerrar Offer Modal
document.getElementById('close-offer-modal').addEventListener('click', () => {
    document.getElementById('offer-modal').style.display = 'none';
});

// Manejar envío de formulario de oferta
document.getElementById('offer-form').addEventListener('submit', (e) => {
    e.preventDefault();
    Swal.fire({
        title: 'Oferta Enviada',
        text: 'Gracias por tu oferta, será revisada pronto.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });
    document.getElementById('offer-modal').style.display = 'none';
    e.target.reset();
});

/* SweetAlert2 para notificaciones */
(function() {
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/sweetalert2@11";
    script.async = true;
    document.head.appendChild(script);
})();
