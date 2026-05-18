# C&E Urban - Backend Integration

Este proyecto configura un backend Node.js para guardar clientes y pedidos en SQLite, y enviar un correo de confirmación cuando se completa una compra.

## Archivos nuevos

- `package.json` - dependencias y script de inicio.
- `server.js` - servidor Express con ruta `POST /api/orders`.
- `db.js` - inicializa SQLite con tablas `clientes`, `pedidos` y `pedido_items`.
- `.env.example` - ejemplo de configuración SMTP.
- `.gitignore` - excluye `node_modules`, `.env` y `store.db`.

## Cómo usar

1. Instala dependencias:

```bash
npm install
```

2. Copia `.env.example` a `.env` y configura tu SMTP:

```bash
copy .env.example .env
```

3. Ejecuta el servidor:

```bash
npm start
```

4. Abre `http://localhost:3000/pago.html` en tu navegador.

## Flujo de compra

- El formulario en `pago.html` envía los datos del cliente y el carrito a `/api/orders`.
- El backend guarda o actualiza el cliente en `store.db`.
- Guarda el pedido y los items asociados.
- Envía un correo de confirmación al cliente.

## Notas

Si no configuras SMTP en `.env`, el servidor usará una cuenta de prueba de Ethereal y mostrará la información en la consola.
