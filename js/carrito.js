// Recuperar carrito del localStorage o inicializar vacío
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Función para guardar carrito en localStorage
function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Función para actualizar el contador del carrito
function actualizarContadorCarrito() {
  const contadorElemento = document.getElementById("cart-count");
  contadorElemento.textContent = carrito.length;
}

// Función para calcular el total del carrito
function calcularTotal() {
  return carrito.reduce((total, item) => total + item.precio, 0);
}

// Función para actualizar el total en pantalla
function actualizarTotal() {
  const totalElemento = document.getElementById("cart-total");
  totalElemento.textContent = calcularTotal().toLocaleString('es-AR');
}

// Función para imprimir productos en el HTML
function imprimirProductos() {
  const contenedor = document.getElementById("products-container");
  contenedor.innerHTML = "";

  productos.forEach(producto => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <div class="product-icon">${producto.icono}</div>
      <h3>${producto.nombre}</h3>
      <p class="product-price">$${producto.precio.toLocaleString('es-AR')}</p>
      <p class="product-stock">Stock: ${producto.stock}</p>
      <button id="btn-${producto.id}" class="btn-add" ${producto.stock === 0 ? 'disabled' : ''}>
        ${producto.stock === 0 ? 'Sin Stock' : 'Agregar al Carrito'}
      </button>
    `;

    contenedor.appendChild(card);

    const boton = document.getElementById(`btn-${producto.id}`);
    boton.addEventListener("click", () => agregarAlCarrito(producto));
  });
}

// Función para agregar producto al carrito
function agregarAlCarrito(producto) {
  if (producto.reducirStock()) {
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio
    });

    guardarCarrito();
    imprimirProductos();
    imprimirCarrito();
    actualizarContadorCarrito();
    actualizarTotal();
    actualizarBotones();

    // Notificación con Toastify
    Toastify({
      text: `${producto.nombre} agregado al carrito`,
      duration: 2000,
      gravity: "top",
      position: "right",
      style: {
        background: "linear-gradient(to right, #667eea, #764ba2)",
      }
    }).showToast();
  }
}

// Función para eliminar producto del carrito
function eliminarDelCarrito(index, productoId) {
  const itemEliminado = carrito[index];
  carrito.splice(index, 1);
  
  const producto = obtenerProductoPorId(productoId);
  if (producto) {
    producto.aumentarStock();
  }

  guardarCarrito();
  imprimirProductos();
  imprimirCarrito();
  actualizarContadorCarrito();
  actualizarTotal();
  actualizarBotones();

  // Notificación con Toastify
  Toastify({
    text: `${itemEliminado.nombre} eliminado del carrito`,
    duration: 2000,
    gravity: "top",
    position: "right",
    style: {
      background: "#ff4757",
    }
  }).showToast();
}

// Función para imprimir el carrito en el HTML
function imprimirCarrito() {
  const contenedor = document.getElementById("cart-container");

  if (carrito.length === 0) {
    contenedor.innerHTML = '<p class="empty-cart">El carrito está vacío</p>';
    return;
  }

  contenedor.innerHTML = "";

  carrito.forEach((item, index) => {
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";

    cartItem.innerHTML = `
      <div class="cart-item-info">
        <div class="cart-item-name">${item.nombre}</div>
        <div class="cart-item-price">$${item.precio.toLocaleString('es-AR')}</div>
      </div>
      <button class="btn-remove" id="remove-${index}">Eliminar</button>
    `;

    contenedor.appendChild(cartItem);

    const botonEliminar = document.getElementById(`remove-${index}`);
    botonEliminar.addEventListener("click", () => eliminarDelCarrito(index, item.id));
  });
}

// Función para vaciar el carrito
function vaciarCarrito() {
  if (carrito.length === 0) {
    return;
  }

  Swal.fire({
    title: '¿Estás seguro?',
    text: "Se eliminarán todos los productos del carrito",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#667eea',
    cancelButtonColor: '#ff4757',
    confirmButtonText: 'Sí, vaciar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      carrito.forEach(item => {
        const producto = obtenerProductoPorId(item.id);
        if (producto) {
          producto.aumentarStock();
        }
      });

      carrito.length = 0;
      guardarCarrito();
      imprimirProductos();
      imprimirCarrito();
      actualizarContadorCarrito();
      actualizarTotal();
      actualizarBotones();

      Toastify({
        text: "Carrito vaciado",
        duration: 2000,
        gravity: "top",
        position: "right",
        style: {
          background: "#ff4757",
        }
      }).showToast();
    }
  });
}

// Función para finalizar la compra
function finalizarCompra() {
  if (carrito.length === 0) {
    return;
  }

  const total = calcularTotal();

  Swal.fire({
    title: '¡Compra Exitosa! 🎉',
    html: `
      <p>Total de la compra: <strong>$${total.toLocaleString('es-AR')}</strong></p>
      <p>¡Gracias por tu compra en Poco Fulbo!</p>
    `,
    icon: 'success',
    confirmButtonColor: '#667eea',
    confirmButtonText: 'Cerrar'
  });

  carrito.length = 0;
  guardarCarrito();
  imprimirProductos();
  imprimirCarrito();
  actualizarContadorCarrito();
  actualizarTotal();
  actualizarBotones();
}

// Función para actualizar el estado de los botones
function actualizarBotones() {
  const botonCheckout = document.getElementById("checkout-btn");
  const botonVaciar = document.getElementById("clear-cart-btn");

  if (carrito.length === 0) {
    botonCheckout.disabled = true;
    botonVaciar.disabled = true;
  } else {
    botonCheckout.disabled = false;
    botonVaciar.disabled = false;
  }
}

// Función para restaurar el stock al cargar la página
function restaurarStockDesdeCarrito() {
  if (carrito.length > 0) {
    carrito.forEach(item => {
      const producto = obtenerProductoPorId(item.id);
      if (producto && producto.stock > 0) {
        producto.reducirStock();
      }
    });
  }
}

// Inicializar la aplicación
async function inicializar() {
  // Cargar productos desde JSON
  await cargarProductos();

  // Restaurar stock basado en el carrito guardado
  restaurarStockDesdeCarrito();

  // Renderizar productos y carrito
  imprimirProductos();
  imprimirCarrito();
  actualizarContadorCarrito();
  actualizarTotal();
  actualizarBotones();

  // Event listeners
  const botonVaciar = document.getElementById("clear-cart-btn");
  botonVaciar.addEventListener("click", vaciarCarrito);

  const botonCheckout = document.getElementById("checkout-btn");
  botonCheckout.addEventListener("click", finalizarCompra);
}

// Iniciar cuando el DOM esté listo
inicializar();