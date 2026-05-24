# 🔧 DOCUMENTACIÓN TÉCNICA - CLASES Y FUNCIONES

## 📦 Estructura de Archivos Nuevos

```
jvs/
├── advanced-features.js      (450+ líneas) - Lógica principal
├── ux-enhancements.js        (400+ líneas) - Componentes UI
└── user-dashboard.js         (350+ líneas) - Panel de usuario

CSS/
└── ux-improvements.css       (1000+ líneas) - Estilos nuevos
```

---

## 📘 CLASES Y MÉTODOS

### 1. **WishlistManager** (advanced-features.js)

**Propósito**: Gestionar lista de favoritos del usuario

**Métodos**:
```javascript
addToWishlist(product)           // Agregar producto
removeFromWishlist(productId)    // Remover producto
isInWishlist(productId)          // Verificar si está en lista
getWishlist()                    // Obtener toda la lista
clear()                          // Limpiar la lista
```

**Ejemplo de uso**:
```javascript
// Agregar a favoritos
const product = { id: 1, nombre: "Hoodie", precio: 85000, imagen: "..." };
wishlist.addToWishlist(product);

// Verificar si es favorito
if (wishlist.isInWishlist(1)) {
    console.log("Es favorito");
}

// Remover de favoritos
wishlist.removeFromWishlist(1);
```

**LocalStorage Key**: `ceurban-wishlist`

---

### 2. **LoyaltySystem** (advanced-features.js)

**Propósito**: Sistema de puntos y niveles de membresía

**Métodos**:
```javascript
addPoints(amount)              // Agregar puntos
removePoints(amount)           // Remover puntos
getPoints()                    // Obtener puntos actuales
getLevel()                     // Obtener nivel actual
addPurchase(amount, items)    // Registrar compra
getPurchaseHistory()          // Obtener historial
getTotalSpent()               // Total gastado
```

**Niveles**:
```javascript
// Devuelve objeto con: { name, color, discount }
getLevel()
// Bronze:   0-999      (0% descuento)
// Silver:   1000-2999  (5% descuento)
// Gold:     3000-4999  (10% descuento)
// Platinum: 5000+      (15% descuento)
```

**Ejemplo de uso**:
```javascript
// Agregar puntos por compra
loyalty.addPoints(50000 * 0.1); // 10% de puntos

// Obtener información del usuario
const nivel = loyalty.getLevel();
console.log(`${nivel.name} - ${nivel.discount * 100}% descuento`);

// Registrar compra
const compra = loyalty.addPurchase(50000, items);
```

**LocalStorage Keys**:
- `ceurban-loyalty-points`
- `ceurban-purchase-history`

---

### 3. **ShoppingCart** (advanced-features.js)

**Propósito**: Carrito mejorado con manejo de cantidades

**Métodos**:
```javascript
addItem(product, quantity)     // Agregar producto (con cantidad)
updateQuantity(productId, qty) // Actualizar cantidad
removeItem(productId)          // Remover producto
getCart()                      // Obtener carrito completo
getTotal()                     // Obtener total
getItemCount()                 // Contar artículos
clear()                        // Vaciar carrito
applyDiscount(percent)         // Aplicar descuento %
```

**Ejemplo de uso**:
```javascript
// Agregar producto con cantidad
const product = { id: 1, nombre: "Hoodie", precio: 85000, imagen: "..." };
cart.addItem(product, 2);

// Actualizar cantidad
cart.updateQuantity(1, 3);

// Obtener total
const total = cart.getTotal();

// Contar items
const count = cart.getItemCount();
```

**LocalStorage Key**: `carrito`

---

### 4. **ViewHistory** (advanced-features.js)

**Propósito**: Historial de productos visualizados

**Métodos**:
```javascript
addView(product)   // Agregar visualización
getHistory()       // Obtener historial
clear()            // Limpiar historial
```

**Límite**: 10 productos máximo

**Ejemplo de uso**:
```javascript
// Agregar a historial (automático en mostrarProductos)
viewHistory.addView(product);

// Obtener historial
const historial = viewHistory.getHistory();
historial.forEach(item => {
    console.log(`${item.nombre} - $${item.precio}`);
});
```

**LocalStorage Key**: `ceurban-view-history`

---

### 5. **RecommendationEngine** (advanced-features.js)

**Propósito**: Sistema de recomendaciones inteligentes

**Métodos**:
```javascript
getRecommendations(count)      // Obtener recomendaciones (def: 5)
getPopularProducts(count)      // Productos populares
getSimilarProducts(productId)  // Productos similares
```

**Algoritmo**:
1. Lee el historial de visualización
2. Obtiene categorías vistas
3. Recomienda productos no vistos de esas categorías
4. Completa con productos populares si es necesario

**Ejemplo de uso**:
```javascript
const engine = new RecommendationEngine(listaProductos);
const recomendaciones = engine.getRecommendations(5);

// Productos similares
const similares = engine.getSimilarProducts(1);
```

---

### 6. **PriceFilter** (advanced-features.js)

**Propósito**: Filtrado de productos por precio

**Métodos**:
```javascript
filterByPriceRange(min, max)       // Filtrar por rango
getMinMaxPrice()                   // Obtener min y max
filterByMultipleCriteria(filters)  // Filtrado avanzado
```

**Ejemplo de uso**:
```javascript
const filter = new PriceFilter(listaProductos);

// Filtro simple
const porPrecio = filter.filterByPriceRange(50000, 100000);

// Filtro múltiple
const filtrados = filter.filterByMultipleCriteria({
    category: 'ropa',
    minPrice: 50000,
    maxPrice: 100000,
    search: 'hoodie'
});
```

---

### 7. **NotificationManager** (advanced-features.js)

**Propósito**: Sistema de notificaciones toast

**Métodos**:
```javascript
show(message, type, duration)  // Mostrar notificación
success(message)               // Notificación éxito
error(message)                 // Notificación error
warning(message)               // Notificación advertencia
info(message)                  // Notificación información
```

**Tipos**:
- `success` (verde) ✅
- `error` (rojo) ❌
- `warning` (naranja) ⚠️
- `info` (azul) ℹ️

**Ejemplo de uso**:
```javascript
notifier.success("Producto agregado");
notifier.error("Error al procesar");
notifier.warning("Intenta nuevamente");
notifier.info("Información importante");
```

---

### 8. **QuickViewModal** (ux-enhancements.js)

**Propósito**: Modal de vista rápida de productos

**Métodos**:
```javascript
open(product)           // Abrir modal con producto
close()                 // Cerrar modal
changeQuantity(change)  // Cambiar cantidad (+1 o -1)
addToCart()            // Agregar al carrito
toggleWishlist()       // Agregar/remover de favoritos
```

**Ejemplo de uso**:
```javascript
// Abrir vista rápida
const product = listaProductos[0];
quickViewModal.open(product);

// Se cierra con el botón ✖ o click afuera
```

---

### 9. **AnimationManager** (ux-enhancements.js)

**Propósito**: Gestor de animaciones

**Métodos**:
```javascript
addAnimation(element, name, duration)  // Animación genérica
fadeIn(element, duration)              // Desvanecer entrada
fadeOut(element, duration)             // Desvanecer salida
slideDown(element, duration)           // Deslizar abajo
slideUp(element, duration)             // Deslizar arriba
scaleIn(element, duration)             // Escalar entrada
bounce(element, duration)              // Rebote
pulse(element)                         // Pulso infinito
```

**Ejemplo de uso**:
```javascript
// Animación simple
AnimationManager.fadeIn(miElemento, 400);

// Con espera
await AnimationManager.scaleIn(elemento, 500);
console.log("Animación completada");
```

---

### 10. **ProductComparator** (ux-enhancements.js)

**Propósito**: Comparador de productos lado a lado

**Métodos**:
```javascript
addProduct(product)           // Agregar a comparación
removeProduct(productId)      // Remover de comparación
isSelected(productId)         // Verificar si está seleccionado
getComparableItems()         // Obtener items comparables
clear()                      // Limpiar comparación
generateComparisonHTML()     // Generar tabla HTML
```

**Límite**: 4 productos máximo

**Ejemplo de uso**:
```javascript
comparator.addProduct(product1);
comparator.addProduct(product2);

// Generar tabla
const html = comparator.generateComparisonHTML();
document.getElementById('comparison').innerHTML = html;
```

**LocalStorage Key**: `ceurban-compare`

---

### 11. **ReviewSystem** (ux-enhancements.js)

**Propósito**: Sistema de reseñas y calificaciones

**Métodos**:
```javascript
addReview(productId, rating, comment, authorName)  // Agregar reseña
getReviews(productId)                               // Obtener reseñas
getAverageRating(productId)                        // Promedio
getRatingDistribution(productId)                   // Distribución
deleteReview(productId, reviewId)                  // Eliminar
renderStars(rating)                                // Renderizar ⭐
```

**Ejemplo de uso**:
```javascript
// Agregar reseña
reviews.addReview(
    1,                          // productId
    5,                          // rating (1-5)
    "Excelente producto!",      // comment
    "Juan Pérez"                // nombre
);

// Obtener promedio
const avg = reviews.getAverageRating(1);
console.log(`${avg}/5 ⭐`);

// Distribución
const dist = reviews.getRatingDistribution(1);
console.log(`5 estrellas: ${dist[5]}`);
```

**LocalStorage Key**: `ceurban-reviews`

---

### 12. **UserDashboardPanel** (user-dashboard.js)

**Propósito**: Panel de usuario completo

**Métodos**:
```javascript
open()           // Abrir panel
close()          // Cerrar panel
switchTab(name)  // Cambiar tab
updateContent()  // Actualizar contenido
```

**Tabs disponibles**:
- `loyalty` - Nivel de lealtad
- `favorites` - Lista de favoritos
- `history` - Historial de visualización
- `points` - Información de puntos

**Ejemplo de uso**:
```javascript
// Abrir panel
userDashboard.open();

// Cambiar tab
userDashboard.switchTab('favoritos');

// Actualizar contenido (automático)
userDashboard.updateContent();
```

---

## 🎨 FUNCIONES GLOBALES

### **updateCartUI()**
Actualiza la interfaz del carrito con los datos más recientes.

```javascript
updateCartUI();
```

### **applyFilters()**
Aplica filtros activos (categoría, precio, búsqueda).

```javascript
function applyFilters() {
    const category = document.querySelector('input[name="category"]:checked').value;
    const minPrice = parseInt(document.getElementById('min-price').value) || 0;
    // ... filtrado
}
```

### **applySort()**
Ordena los productos según la selección.

```javascript
function applySort() {
    const sortValue = document.getElementById('sort-select').value;
    // ... ordenamiento
}
```

---

## 🔗 VARIABLES GLOBALES

```javascript
// Instancias globales disponibles en toda la app
wishlist              // WishlistManager
loyalty              // LoyaltySystem
cart                 // ShoppingCart
viewHistory          // ViewHistory
notifier             // NotificationManager
quickViewModal       // QuickViewModal
comparator           // ProductComparator
reviews              // ReviewSystem
userDashboard        // UserDashboardPanel

// Arrays
listaProductos       // Lista de todos los productos cargados
```

---

## 🔄 FLUJO DE DATOS

```
index.html
    ↓
advanced-features.js (Inicializar clases globales)
    ↓
ux-enhancements.js (Crear modales y managers)
    ↓
user-dashboard.js (Crear panel de usuario)
    ↓
index.js (Cargar productos y configurar eventos)
    ↓
carrito.js (Configurar eventos del carrito)
    ↓
user-state.js (Configurar autenticación)
```

---

## 🔌 INTEGRACIÓN CON BACKEND

Para conectar con un servidor:

```javascript
// Endpoint para guardar compra y puntos
POST /api/orders
{
    customerEmail: "...",
    items: [...],
    total: 50000,
    points: 5000  // Puntos ganados
}

// Sincronizar puntos
GET /api/loyalty/points?email=...

// Sincronizar favoritos
GET/POST /api/wislist
```

---

## 🚀 EXTENSIÓN FUTURA

Para agregar nuevas funcionalidades:

1. **Crear nueva clase** en `advanced-features.js` o `ux-enhancements.js`
2. **Instanciar globalmente** al final del archivo
3. **Agregar eventos** en `index.js` o `carrito.js`
4. **Agregar estilos** en `CSS/ux-improvements.css`
5. **Actualizar documentación**

---

## 📊 EJEMPLO: AGREGAR NUEVA FUNCIONALIDAD

**Crear sistema de cupones:**

```javascript
class CouponSystem {
    constructor() {
        this.coupon = localStorage.getItem('ceurban-coupon') || null;
    }
    
    applyCoupon(code) {
        const discounts = {
            'DESCUENTO10': 0.10,
            'DESCUENTO20': 0.20
        };
        
        if (discounts[code]) {
            this.coupon = { code, discount: discounts[code] };
            localStorage.setItem('ceurban-coupon', JSON.stringify(this.coupon));
            return true;
        }
        return false;
    }
    
    getDiscount() {
        return this.coupon?.discount || 0;
    }
}

// Global
const coupon = new CouponSystem();

// Usar en carrito
const total = cart.getTotal();
const conDescuento = total * (1 - coupon.getDiscount());
```

---

## 🐛 DEBUGGING

Para depurar en la consola:

```javascript
// Ver carrito
console.log(cart.getCart());

// Ver favoritos
console.log(wishlist.getWishlist());

// Ver puntos
console.log(loyalty.getPoints(), loyalty.getLevel());

// Ver historial
console.log(viewHistory.getHistory());

// Ver todas las reseñas
console.log(reviews.reviews);

// Ver comparación
console.log(comparator.getComparableItems());
```

---

## ✅ TESTING

Para probar nuevas características:

```javascript
// Test: Agregar al carrito
cart.addItem({ id: 1, nombre: "Test", precio: 100, imagen: "..." }, 2);
console.assert(cart.getItemCount() === 2, "Debe tener 2 items");

// Test: Sistema de puntos
loyalty.addPoints(100);
console.assert(loyalty.getPoints() >= 100, "Debe tener al menos 100 puntos");

// Test: Favoritos
wishlist.addToWishlist({ id: 1, nombre: "Test", precio: 100 });
console.assert(wishlist.isInWishlist(1), "Debe estar en favoritos");
```

---

## 📖 REFERENCIAS

- **Documentación**: `MEJORAS_IMPLEMENTADAS.md`
- **Guía de Usuario**: `GUIA_RAPIDA.md`
- **Archivo Principal**: `index.html`
- **Estilos**: `CSS/ux-improvements.css`

---

¡Usa esta documentación como referencia para mantener y extender el sistema! 🚀
