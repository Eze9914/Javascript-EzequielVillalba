// Variables y arrays
const productos = ["Camiseta Poco Fulbo", "Short Oficial", "Pelota"];
const precios = [5000, 3500, 7000];
let carrito = [];
let total = 0;

// Función para mostrar productos
function mostrarProductos() {
  console.log("Productos disponibles:");
  for (let i = 0; i < productos.length; i++) {
    console.log(i + 1 + " - " + productos[i] + " ($" + precios[i] + ")");
  }
}

// Función para agregar al carrito
function agregarAlCarrito() {
  let opcion = parseInt(prompt("Elige un producto (1 a 3). Ingresa 0 para terminar:"));
  while (opcion !== 0) {
    if (opcion >= 1 && opcion <= productos.length) {
      carrito.push(productos[opcion - 1]);
      total += precios[opcion - 1];
      alert("Agregaste: " + productos[opcion - 1] + "\nTotal parcial: $" + total);
    } else {
      alert("Opción no válida.");
    }
    opcion = parseInt(prompt("Elige un producto (1 a 3). Ingresa 0 para terminar:"));
  }
}

// Función para finalizar compra
function finalizarCompra() {
  if (carrito.length > 0) {
    alert("Tu compra fue exitosa!\nProductos: " + carrito.join(", ") + "\nTotal: $" + total);
  } else {
    alert("No compraste nada.");
  }
}

// Flujo del simulador
mostrarProductos();
agregarAlCarrito();
finalizarCompra();
