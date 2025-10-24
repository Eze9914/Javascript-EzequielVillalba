# ⚽ Tienda Poco Fulbo - Proyecto Final JavaScript

## 📋 Descripción

Simulador interactivo de e-commerce desarrollado como proyecto final del curso de JavaScript en CoderFlex. La aplicación simula una tienda online de artículos deportivos con carrito de compras funcional.

## 👨‍💻 Autor

**Ezequiel Villalba** - Proyecto Final CoderFlex

## 🚀 Funcionalidades

### ✅ Características Principales

- **Catálogo de productos**: Cargados dinámicamente desde archivo JSON
- **Carrito de compras**: Agregar/eliminar productos con control de stock
- **Persistencia de datos**: El carrito se guarda en localStorage
- **Gestión de stock**: Control automático de disponibilidad
- **Interfaz responsive**: Adaptable a dispositivos móviles
- **Notificaciones**: Feedback visual con Toastify y SweetAlert2
- **Validaciones**: Control de errores y casos límite

### 🛒 Flujo de Compra

1. El usuario visualiza los productos disponibles
2. Puede agregar productos al carrito (con control de stock)
3. El carrito se actualiza en tiempo real
4. Puede eliminar productos individuales o vaciar el carrito completo
5. Al finalizar la compra, se muestra el total y un mensaje de confirmación
6. El carrito se vacía y el stock se actualiza

## 📁 Estructura del Proyecto

```
tienda-poco-fulbo/
│
├── index.html              # Página principal
├── README.md              # Este archivo
│
├── css/
│   └── styles.css         # Estilos de la aplicación
│
├── js/
│   ├── producto.js        # Clase Producto y carga de JSON
│   └── carrito.js         # Lógica del carrito y DOM
│
└── data/
    └── productos.json     # Base de datos de productos
```

## 🛠️ Tecnologías Utilizadas

### Lenguajes

- HTML5
- CSS3
- JavaScript (ES6+)

### Librerías Externas

- **SweetAlert2**: Modales personalizados para confirmaciones
- **Toastify JS**: Notificaciones toast elegantes

### Características JavaScript

- Programación Orientada a Objetos (Clases)
- Fetch API para cargar datos JSON
- LocalStorage para persistencia
- Manipulación del DOM
- Event Listeners
- Async/Await
- Template Strings
- Arrow Functions
- Array Methods (map, forEach, reduce, find)

## 🎯 Requisitos Cumplidos de la Consigna

✅ **Estructura del proyecto**

- Documentos HTML, CSS y JavaScript separados
- Al menos 2 archivos JavaScript (`producto.js` y `carrito.js`)
- Archivo JSON como base de datos (`productos.json`)
- Framework CSS (estilos propios con diseño moderno)

✅ **Objetivos específicos**

- Uso de DOM y eventos
- Arrays de objetos cargados desde JSON mediante Fetch
- Lógica completa del proceso de compra
- Librería JS externa (SweetAlert2 y Toastify)
- Sin uso de alert, prompt o confirm
- Código limpio y comentado

✅ **Sugerencias implementadas**

- HTML dinámico con Template Strings
- Interfaz visual atractiva
- Control de errores con try-catch
- WebStorage para persistencia del carrito
- Circuito de compra completo

## 🔧 Instalación y Uso

### Opción 1: Servidor Local

1. Clona o descarga el repositorio
2. Abre el proyecto con un servidor local (recomendado):
   - **VS Code**: Usa la extensión "Live Server"
   - **Python**: `python -m http.server 8000`
   - **Node.js**: `npx http-server`
3. Abre `http://localhost:puerto` en tu navegador

### Opción 2: Abrir Directamente

⚠️ **Nota**: Algunos navegadores pueden bloquear la carga del archivo JSON por políticas CORS al abrir directamente el HTML. Se recomienda usar un servidor local.

## 📝 Guía de Uso

1. **Explorar productos**: Visualiza el catálogo con precios y stock disponible
2. **Agregar al carrito**: Click en "Agregar al Carrito" en el producto deseado
3. **Ver carrito**: El carrito se actualiza automáticamente en la columna derecha
4. **Eliminar productos**: Click en "Eliminar" junto a cada producto en el carrito
5. **Vaciar carrito**: Click en "Vaciar Carrito" para eliminar todos los productos
6. **Finalizar compra**: Click en "Finalizar Compra" para completar la operación
7. **Persistencia**: Si cierras y vuelves a abrir la página, tu carrito se mantiene

## 🎨 Características de Diseño

- **Gradiente moderno**: Fondo con degradado púrpura
- **Tarjetas con hover**: Efectos de elevación al pasar el mouse
- **Animaciones suaves**: Transiciones y apariciones animadas
- **Diseño responsive**: Adaptable a móviles y tablets
- **Notificaciones visuales**: Feedback inmediato en cada acción
- **Modal personalizado**: Confirmación de compra elegante

## 🐛 Manejo de Errores

- Validación al cargar el JSON
- Control de stock antes de agregar productos
- Prevención de acciones cuando el carrito está vacío
- Mensajes de error amigables (sin códigos técnicos)
- Confirmación antes de vaciar el carrito

## 📦 Extensiones Futuras Posibles

- Filtrado y búsqueda de productos
- Categorías de productos
- Variantes de productos (tallas, colores)
- Sistema de cupones de descuento
- Historial de compras
- Modo oscuro/claro
- Múltiples métodos de pago simulados

## 📄 Licencia

Este proyecto fue desarrollado con fines educativos como parte del curso de JavaScript en CoderFlex.

---

**⚽ ¡Gracias por visitar Tienda Poco Fulbo!**
