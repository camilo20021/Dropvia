-- Base de datos para tienda C&E Urban
-- Este esquema cubre productos, categorías, clientes, pedidos y pagos.

CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    slug VARCHAR(120) NOT NULL UNIQUE,
    descripcion TEXT,
    creado_en TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    actualizado_en TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);

CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    sku VARCHAR(80) UNIQUE,
    descripcion TEXT,
    precio NUMERIC(12,2) NOT NULL,
    imagen_url VARCHAR(255),
    imagen_carrito_url VARCHAR(255),
    categoria_id INTEGER REFERENCES categorias(id) ON DELETE SET NULL,
    stock INTEGER DEFAULT 0,
    activo BOOLEAN DEFAULT TRUE,
    creado_en TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    actualizado_en TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);

CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(120) NOT NULL,
    email VARCHAR(160) UNIQUE,
    telefono VARCHAR(30),
    creado_en TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    actualizado_en TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);

CREATE TABLE direcciones (
    id SERIAL PRIMARY KEY,
    cliente_id INTEGER NOT NULL REFERENCES clientes(id) ON DELETE CASCADE,
    direccion TEXT NOT NULL,
    ciudad VARCHAR(100) NOT NULL,
    departamento VARCHAR(100),
    pais VARCHAR(80) DEFAULT 'Colombia',
    codigo_postal VARCHAR(20),
    tipo VARCHAR(30) DEFAULT 'envio',
    creado_en TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    actualizado_en TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);

CREATE TABLE pedidos (
    id SERIAL PRIMARY KEY,
    cliente_id INTEGER REFERENCES clientes(id) ON DELETE SET NULL,
    direccion_envio_id INTEGER REFERENCES direcciones(id) ON DELETE SET NULL,
    subtotal NUMERIC(12,2) NOT NULL,
    envio NUMERIC(12,2) DEFAULT 0,
    total NUMERIC(12,2) NOT NULL,
    metodo_pago VARCHAR(80),
    estado VARCHAR(50) DEFAULT 'pendiente',
    nota TEXT,
    creado_en TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    actualizado_en TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);

CREATE TABLE pedido_items (
    id SERIAL PRIMARY KEY,
    pedido_id INTEGER NOT NULL REFERENCES pedidos(id) ON DELETE CASCADE,
    producto_id INTEGER REFERENCES productos(id) ON DELETE SET NULL,
    nombre_producto VARCHAR(150) NOT NULL,
    cantidad INTEGER NOT NULL DEFAULT 1,
    precio_unitario NUMERIC(12,2) NOT NULL,
    total_item NUMERIC(12,2) NOT NULL
);

CREATE TABLE pagos (
    id SERIAL PRIMARY KEY,
    pedido_id INTEGER NOT NULL REFERENCES pedidos(id) ON DELETE CASCADE,
    metodo VARCHAR(80),
    monto NUMERIC(12,2) NOT NULL,
    estado VARCHAR(50) DEFAULT 'pendiente',
    referencia VARCHAR(120),
    pagado_en TIMESTAMP WITHOUT TIME ZONE,
    creado_en TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);

-- Vistas útiles
CREATE VIEW vista_pedidos_completos AS
SELECT
    p.id AS pedido_id,
    c.nombre AS cliente,
    c.email AS cliente_email,
    p.total,
    p.estado,
    p.metodo_pago,
    p.creado_en
FROM pedidos p
LEFT JOIN clientes c ON c.id = p.cliente_id;
