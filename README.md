# RiwiMediCare API

API REST desarrollada con Node.js, TypeScript, Express y PostgreSQL para gestionar usuarios, clínicas, medicamentos, almacenes y solicitudes del sistema.

## Desarrollado por

- Coder: Efrain Martinez
- Proyecto: Backend de gestión de inventario y atención clínica
- Enfoque: arquitectura modular, autenticación segura y manejo de datos médicos

## Descripción general

Este proyecto está pensado como una API modular para una plataforma de gestión clínica y farmacéutica. Permite administrar usuarios, clínicas, medicamentos, almacenes y solicitudes de entrega entre sedes, además de incluir autenticación con JWT, control de roles, documentación Swagger y carga de datos iniciales mediante un seeder JSON.

La aplicación usa Sequelize como ORM para PostgreSQL y está preparada para ejecutarse tanto localmente como con Docker.

---

## Stack tecnológico

- Node.js
- TypeScript
- Express
- PostgreSQL
- Sequelize
- JWT
- bcrypt
- Swagger UI / Swagger JSDoc
- Jest
- Docker / Docker Compose
- Multer

---

## Características principales

- Autenticación con JWT
- Roles y permisos por middleware
- CRUD de usuarios, clínicas, medicamentos y almacenes
- Gestión de solicitudes de medicamentos
- API documentada con Swagger
- Seeder de base de datos mediante archivo JSON
- Soporte para ejecución con Docker
- Estructura modular por capas

---

## Estructura del proyecto

```text
.
├── app/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── dto/
│   │   ├── docs/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── index.ts
│   │   ├── server.ts
│   │   └── ...
│   ├── Dockerfile
│   ├── jest.config.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── public/
├── docker-compose.yml
├── .env
├── README.md
└── .gitignore
```

---

## Requisitos previos

Antes de iniciar el proyecto asegúrate de tener instalado:

- Node.js 20+
- npm
- Docker y Docker Compose
- PostgreSQL (si vas a correrlo localmente, aunque el proyecto está preparado para Docker)

---

## Variables de entorno

El proyecto usa variables de entorno definidas en el archivo `.env` en la raíz del repositorio:

```env
DB_CONTAINER_NAME=RiwiMediCare-db
POSTGRES_USER=nodejs
POSTGRES_PASSWORD=123456
POSTGRES_DB=postgres
POSTGRES_PORT=5432

APP_CONTAINER_NAME=RiwiMediCare-backend
APP_PORT=3000

DB_CPU_LIMIT=1
DB_MEM_LIMIT=512MB

APP_CPU_LIMIT=1
APP_MEM_LIMIT=512MB

NODE_ENV=development

PORT=3000
JWT_SECRET=super_secret_jwt_key_here
JWT_EXPIRES_IN=1h
```

> El archivo `app/src/config/database.ts` usa estas variables para conectar con la base de datos PostgreSQL.

---

## Instalación local

1. Clona el repositorio:

```bash
git clone <url-del-repositorio>
cd prueba-node-js
```

2. Instala dependencias:

```bash
cd app
npm install
```

3. Asegúrate de que el archivo `.env` exista con las variables necesarias.

4. Inicia la aplicación en modo desarrollo:

```bash
npm run dev
```

La API quedará disponible en:

```text
http://localhost:3000
```

---

## Ejecución con Docker

Desde la raíz del proyecto:

```bash
docker compose up --build
```

Esto levantará:

- el backend Node.js
- la base de datos PostgreSQL

Para detener los contenedores:

```bash
docker compose down
```

Para ver logs:

```bash
docker compose logs -f
```

---

## Scripts disponibles

Dentro de la carpeta `app` puedes usar:

```bash
npm run dev
npm run build
npm run start
npm test
```

### Descripción

- `npm run dev`: ejecuta la app en modo desarrollo con recarga automática
- `npm run build`: compila TypeScript a JavaScript
- `npm run start`: ejecuta la versión compilada
- `npm test`: corre la suite de pruebas con Jest

---

## Documentación Swagger

La API incluye documentación OpenAPI con Swagger UI.

Ruta de acceso:

```text
http://localhost:3000/api/docs
```

La especificación raw está disponible en:

```text
http://localhost:3000/api/docs.json
```

---

## Rutas principales

### Autenticación

```text
POST /api/auth/login
```

### Usuarios

```text
POST /api/users
GET /api/users
PATCH /api/users/:email
DELETE /api/users/:email
```

### Clínicas

```text
POST /api/clinics
GET /api/clinics
GET /api/clinics/:id
PATCH /api/clinics/:id
DELETE /api/clinics/:id
```

### Medicamentos

```text
POST /api/medicines
GET /api/medicines
GET /api/medicines/:id
PATCH /api/medicines/:id
DELETE /api/medicines/:id
```

### Almacenes

```text
POST /api/warehouses
GET /api/warehouses
GET /api/warehouses/:id
PATCH /api/warehouses/:id
DELETE /api/warehouses/:id
```

### Solicitudes

```text
POST /api/requests
PATCH /api/requests/:id/status
GET /api/requests/active
GET /api/requests/clinic/:clinicId
GET /api/requests
```

### Seeder

```text
POST /api/seeder/upload
```

Este endpoint recibe un archivo JSON con la clave `file` y carga registros iniciales a la base de datos.

---

## Uso del seeder

1. Prepara un archivo JSON con este formato:

```json
{
    "users": [
        {
            "email": "admin@example.com",
            "password": "123456",
            "name": "Admin",
            "role": "admin"
        }
    ],
    "clinics": [
        {
            "name": "Clínica Central",
            "nit": "900123456-1",
            "manager": "Dr. Ramírez",
            "address": "Calle 1 # 2-3"
        }
    ],
    "warehouses": [
        {
            "name": "Almacén principal",
            "location": "Bogotá"
        }
    ],
    "medicines": [
        {
            "name": "Paracetamol",
            "description": "Analgésico",
            "stock": 100
        }
    ]
}
```

2. Envía el archivo con `multipart/form-data` usando el campo `file`:

```bash
curl -X POST http://localhost:3000/api/seeder/upload \
  -F "file=@seed.json"
```

---

## Base de datos

La aplicación utiliza Sequelize con PostgreSQL y sincroniza automáticamente los modelos al iniciar la app:

```ts
await sequelize.sync({ alter: true });
```

Esto permite crear o actualizar las tablas automáticamente para el entorno de desarrollo.

---

## Seguridad

La API incluye:

- JWT para autenticación
- Cookies HTTP-only para almacenamiento del token
- Middleware de autenticación
- Middleware de validación de roles
- Hashing de contraseñas mediante bcrypt

---

## Pruebas

El proyecto tiene configuración para Jest.

Para ejecutar las pruebas:

```bash
cd app
npm test
```

Puedes crear tests en la carpeta:

```text
app/src/**/__tests__
```

---

## Troubleshooting

### Error de conexión a PostgreSQL

Verifica que:

- el contenedor de la base de datos esté levantado
- las variables `POSTGRES_*` estén correctas
- el servicio `db` esté disponible en Docker

### Error 404 en rutas

Asegúrate de que la ruta esté montada en `app/src/server.ts` y que el prefijo sea correcto.

### Error al subir el seeder

Verifica que:

- el archivo sea JSON válido
- el campo del formulario sea `file`
- el endpoint sea `POST /api/seeder/upload`

---

## Contribución

1. Haz un fork del proyecto
2. Crea una rama para tu feature o corrección
3. Realiza tus cambios
4. Abre un pull request con una descripción clara

---

## Licencia

Este proyecto fue desarrollado como ejercicio académico y práctico de backend con Node.js y TypeScript para gestión clínica e inventario médico.

---

## Autor

Proyecto desarrollado por Efrain Martinez en el contexto de Riwi para la gestión de clínicas, stock de medicamentos, almacenes y solicitudes médicas.
