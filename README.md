# 🧱 TheBrother - Backend API

Este proyecto es una **API REST** construida con **Node.js**, **Express** y **MySQL**. Se encarga de la gestión de productos, usuarios, autenticación, pagos y otras funcionalidades clave para una plataforma de comercio electrónico.

## 🚀 Tecnologías

- Node.js
- Express.js
- MySQL
- JWT (autenticación)
- Zod (validación)
- Stripe / PayPal SDK
- Cookie-parser
- Dotenv

## 📦 Estructura del Proyecto

/controllers → Controladores (productos, usuarios, respuesta JSON) /models → Acceso a la base de datos /routers → Rutas Express (autenticación y productos) /utils → Middlewares, configuración, logger /scheme → Validación con Zod /app.js → Configuración de la app Express /index.js → Punto de entrada del servidor /db/schema.sql → Script SQL de base de datos

---

## 🛠️ Instalación

### 1. Clona el repositorio

```bash
git clone https://github.com/tuUsuario/thebrother-api.git
cd thebrother-api

2. Instala las dependencias
npm install

3. Crea el archivo .env
PORT=3000

SECRET_KEY=tu_clave_secreta
4. Configura la base de datos
Asegúrate de tener MySQL instalado y corriendo.
Ejecuta el script schema.sql dentro del cliente MySQL para crear la base de datos y las tablas:
mysql -u root -p < db/schema.sql

⚙️ Ejecución del servidor
npm run dev

🧪 Rutas Principales
🔐 Auth

| Método | Ruta              | Descripción                      |
|--------|------------------ |----------------------------------|
| GET    | /auth/            | Obtener todos los usuarios       |
| GET    | /auth/protected   | Ruta protegida (en construcción) |
| POST   | /auth/signup      | Registrar nuevo usuario          |
| POST   | /auth/login       | Iniciar sesión                   |
| POST   | /auth/logout      | Cerrar sesión                    |
| POST   | /auth/verifyc     | Verificar existencia de usuario  |

 Products


| Método | Ruta              | Descripción                      |
|--------|------------------ |----------------------------------|
| GET    | /products/        | Listar todos los productos       |
| GET    | /products/:id     | Obtener producto por ID          |

 Middleware
corssMiddleware
Permite el CORS para dominios específicos (localhost:5173).

Autenticación con JWT
Los tokens se almacenan en cookies.

Validados automáticamente en cada petición si están presentes.

🔐 Seguridad
JWT en cookies (httpOnly)

Protección contra acceso no autenticado a rutas sensibles

Contraseñas pueden ser hasheadas con bcrypt (comentado, se puede activar)

🧰 Herramientas adicionales
Logger personalizado (cl, err)

Validación de entrada con Zod

Stripe y PayPal integrados para futuros pagos

🧩 Pendientes o mejoras posibles
Añadir control de stock automático

Mejorar manejo de errores global

Crear dashboard admin

Hashear contraseñas con bcrypt

Añadir tests unitarios (Jest o Vitest)

🧑‍💻 Autor
Ezequiel
📧 marceloeequielf4@example.com
🔗 LinkedIn: [linkedin.com/in/adezequiel](https://www.linkedin.com/in/marcelo-ezequiel-ferreyra-37b117288)
