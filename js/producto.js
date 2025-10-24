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

// Array de productos (se cargará desde JSON)
let productos = [];

// Función para cargar productos desde JSON
async function cargarProductos() {
  try {
    const response = await fetch('data/productos.json');
    
    if (!response.ok) {
      throw new Error('Error al cargar los productos');
    }

    const data = await response.json();
    
    // Convertir los objetos JSON a instancias de la clase Producto
    productos = data.map(item => 
      new Producto(item.id, item.nombre, item.precio, item.stock, item.icono)
    );

    return productos;
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudieron cargar los productos. Por favor, recarga la página.',
      confirmButtonColor: '#667eea'
    });
    return [];
  }
}

// Función para obtener un producto por ID
function obtenerProductoPorId(id) {
  return productos.find(p => p.id === id);
}