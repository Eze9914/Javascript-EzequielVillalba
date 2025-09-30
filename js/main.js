// Clase Producto
class Producto {
  constructor(id, nombre, precio, stock, icono) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
    this.icono = icono;
  }

  reducirStock() {
    if (this.stock > 0) {
      this.stock--;
      return true;
    }
    return false;
  }

  aumentarStock() {
    this.stock++;
  }
}

// Array de productos
const productos = [
  new Producto(1, "Camiseta Poco Fulbo", 5000, 10, "👕"),
  new Producto(2, "Short Oficial", 3500, 15, "🩳"),
  new Producto(3, "Pelota", 7000, 8, "⚽")
];

// Recuperar carrito del localStorage o inicializar vacío
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

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
  totalElemento.textContent = calcularTotal();
}

// Función para imprimir productos en el HTML
function imprimirProductos() {
  const contenedor = document.getElementById("products-container");
  contenedor.innerHTML = "";

  for (const producto of productos) {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <div class="product-icon">${producto.icono}</div>
      <h3>${producto.nombre}</h3>
      <p class="product-price">$${producto.precio}</p>
      <p class="product-stock">Stock: ${producto.stock}</p>
      <button id="btn-${producto.id}" class="btn-add" ${producto.stock === 0 ? 'disabled' : ''}>
        ${producto.stock === 0 ? 'Sin Stock' : 'Agregar al Carrito'}
      </button>
    `;

    contenedor.appendChild(card);

    const boton = document.getElementById(`btn-${producto.id}`);
    boton.addEventListener("click", () => agregarAlCarrito(producto));
  }
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
  }
}

// Función para eliminar producto del carrito
function eliminarDelCarrito(index, productoId) {
  carrito.splice(index, 1);
  
  const producto = productos.find(p => p.id === productoId);
  if (producto) {
    producto.aumentarStock();
  }

  guardarCarrito();
  imprimirProductos();
  imprimirCarrito();
  actualizarContadorCarrito();
  actualizarTotal();
  actualizarBotones();
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
        <div class="cart-item-price">$${item.precio}</div>
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
  carrito.forEach(item => {
    const producto = productos.find(p => p.id === item.id);
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
}

// Función para finalizar la compra
function finalizarCompra() {
  if (carrito.length === 0) {
    return;
  }

  const total = calcularTotal();
  const modal = document.getElementById("modal");
  const mensaje = document.getElementById("modal-message");

  mensaje.textContent = `Total de la compra: $${total}. ¡Gracias por tu compra!`;
  modal.style.display = "block";

  carrito.length = 0;
  guardarCarrito();
  imprimirCarrito();
  actualizarContadorCarrito();
  actualizarTotal();
  actualizarBotones();
}

// Función para cerrar el modal
function cerrarModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
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

// Inicializar la aplicación
function inicializar() {
  imprimirProductos();
  
  if (carrito.length > 0) {
    carrito.forEach(item => {
      const producto = productos.find(p => p.id === item.id);
      if (producto && producto.stock > 0) {
        producto.reducirStock();
      }
    });
    imprimirProductos();
    imprimirCarrito();
  }

  actualizarContadorCarrito();
  actualizarTotal();
  actualizarBotones();

  const botonVaciar = document.getElementById("clear-cart-btn");
  botonVaciar.addEventListener("click", vaciarCarrito);

  const botonCheckout = document.getElementById("checkout-btn");
  botonCheckout.addEventListener("click", finalizarCompra);

  const botonCerrarModal = document.getElementById("modal-close-btn");
  botonCerrarModal.addEventListener("click", cerrarModal);

  const modal = document.getElementById("modal");
  modal.addEventListener("click", function(event) {
    if (event.target === modal) {
      cerrarModal();
    }
  });
}

inicializar();