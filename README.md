# API Mocks Pets 🐾

API completa para gestión de usuarios, mascotas y adopciones. Construida con Node.js, Express y MongoDB.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Ejecución](#ejecución)
- [Testing](#testing)
- [Documentación API](#documentación-api)
- [Docker](#-docker)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Endpoints](#endpoints)

## ✨ Características

- ✅ Autenticación de usuarios con JWT
- ✅ CRUD completo para usuarios, mascotas y adopciones
- ✅ Generación de datos mockeados con Faker
- ✅ Tests funcionales completos con Mocha, Chai y Supertest
- ✅ Documentación automática con Swagger
- ✅ Conexión a MongoDB Atlas
- ✅ Manejo de errores robusto
- ✅ Validación de ObjectIds

## 📦 Requisitos

- Node.js v18+ 
- npm v9+
- MongoDB Atlas account (gratuito)

## 🚀 Instalación

### 1. Clonar o descargar el proyecto

```bash
cd ApiMoocksPets
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Instalar dependencias de desarrollo

Las dependencias de testing ya están incluidas:
- mocha
- chai
- supertest

## ⚙️ Configuración

### 1. Configurar MongoDB Atlas

#### Crear usuario en MongoDB Atlas:

1. Ve a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Haz login en tu cuenta
3. Ve a **Database Access** en el menú izquierdo
4. Haz click en **Add New Database User**
5. Completa con:
   - **Username**: `coder1`
   - **Password**: `coder1`
   - **Database User Privileges**: `Atlas admin`
6. Haz click en **Add User**

#### Obtener Connection String:

1. Ve a **Clusters**
2. Haz click en **Connect** en tu cluster
3. Selecciona **Drivers**
4. Copia el connection string (debería verse como):
   ```
   mongodb+srv://coder1:coder1@cluster0.xxxxx.mongodb.net/apimockspets?retryWrites=true&w=majority
   ```

### 2. Crear archivo `.env`

En la raíz del proyecto, crea un archivo `.env` con:

```
PORT=8080
MONGODB_URI=mongodb+srv://coder1:coder1@cluster0.xxxxx.mongodb.net/apimockspets?retryWrites=true&w=majority
NODE_ENV=development
```

**Reemplaza `xxxxx` con tu código de cluster de MongoDB**

### 3. Verificar dependencias

```bash
npm install dotenv
```

## 🎯 Ejecución

### Iniciar la API en modo desarrollo

```bash
npm run dev
```

La API estará disponible en: `http://localhost:8080`

### Documentación Swagger

Una vez que la API está ejecutándose, accede a:

```
http://localhost:8080/api-docs
```

Aquí puedes ver y probar todos los endpoints directamente desde el navegador.

### Iniciar la API en producción

```bash
npm start
```

## 🧪 Testing

### Importante: La API debe estar ejecutándose

Abre **dos terminales**:

**Terminal 1** - Inicia la API:
```bash
npm run dev
```

**Terminal 2** - Ejecuta los tests:

#### Tests de Mascotas (Pets)
```bash
npm test
```

#### Tests de Usuarios (Users)
```bash
npm run test:users
```

#### Tests de Adopciones (Adoptions)
```bash
npm run test:adoptions
```

#### Todos los tests
```bash
npm run test:all
```

### Resultados esperados

Los tests deben mostrar:
- ✔ Casos exitosos (200, 201)
- ✔ Validaciones (400)
- ✔ Errores (404, 500)
- ✔ Persistencia en BD
- ✔ Ciclos completos (crear → obtener → actualizar → eliminar)

## 📚 Documentación API

### Base URL

```
http://localhost:8080/api
```

### Authentication

- Endpoint: `POST /sessions/login`
- Devuelve: Cookie con JWT token válido por 1 hora

## � Docker
### Requisitos previos

Asegúrate de tener instalado:
- [Docker](https://www.docker.com/products/docker-desktop)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Construcción de la imagen

#### Opción 1: Con Docker Compose (Recomendado)

```bash
docker-compose up --build
```

#### Opción 2: Con Docker directamente

```bash
docker build -t apimockspets .
```

### Ejecución del contenedor

#### Opción 1: Con Docker Compose

```bash
docker-compose up
```

Para ejecutar en background:
```bash
docker-compose up -d
```

Ver logs:
```bash
docker-compose logs -f
```

Detener:
```bash
docker-compose down
```

#### Opción 2: Con Docker directamente

```bash
docker run -p 8080:8080 \
  -e MONGODB_URI="mongodb+srv://coder1:coder1@cluster0.xxxxx.mongodb.net/apimockspets?retryWrites=true&w=majority" \
  apimockspets
```

### Verificación

Una vez que el contenedor está corriendo, verifica que funcione:

```bash
curl http://localhost:8080/api-docs
```

### DockerHub

**Imagen disponible en DockerHub:**

```
nicolasdiazn/apimockspets:latest
```

Para usar la imagen desde DockerHub:

```bash
docker pull nicolasdiazn/apimockspets:latest

docker run -p 8080:8080 \
  -e MONGODB_URI="mongodb+srv://coder1:coder1@cluster0.xxxxx.mongodb.net/apimockspets?retryWrites=true&w=majority" \
  nicolasdiazn/apimockspets:latest
```

### Variables de entorno en Docker

Las variables de entorno deben pasarse al contenedor:

```bash
docker run -p 8080:8080 \
  -e PORT=8080 \
  -e NODE_ENV=production \
  -e MONGODB_URI="your_mongodb_uri" \
  apimockspets
```

O con Docker Compose, actualiza `docker-compose.yml`:

```yaml
environment:
  - NODE_ENV=production
  - PORT=8080
  - MONGODB_URI=${MONGODB_URI}
```

### Troubleshooting

**Error: "Cannot connect to MongoDB"**
- Verifica que la URL de MongoDB sea correcta en la variable `MONGODB_URI`
- Asegúrate de que tu IP está en la whitelist de MongoDB Atlas

**Error: "Port 8080 already in use"**
```bash
docker-compose down
# o cambiar puerto en docker-compose.yml
```

**Ver información del contenedor**
```bash
docker ps
docker logs <container-id>
```

## 🔌 Endpoints
### **USUARIOS** 👤

#### GET /users
Obtener todos los usuarios
```bash
curl http://localhost:8080/api/users
```

**Response:**
```json
{
  "status": "success",
  "payload": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "first_name": "Juan",
      "last_name": "Pérez",
      "email": "juan@example.com",
      "role": "user",
      "pets": []
    }
  ]
}
```

#### GET /users/:uid
Obtener un usuario por ID
```bash
curl http://localhost:8080/api/users/507f1f77bcf86cd799439011
```

#### POST /sessions/register
Registrar un nuevo usuario
```bash
curl -X POST http://localhost:8080/api/sessions/register \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "Juan",
    "last_name": "Pérez",
    "email": "juan@example.com",
    "password": "password123"
  }'
```

#### PUT /users/:uid
Actualizar un usuario
```bash
curl -X PUT http://localhost:8080/api/users/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "Juan Carlos",
    "last_name": "Pérez"
  }'
```

#### DELETE /users/:uid
Eliminar un usuario
```bash
curl -X DELETE http://localhost:8080/api/users/507f1f77bcf86cd799439011
```

---

### **MASCOTAS** 🐶

#### GET /pets
Obtener todas las mascotas
```bash
curl http://localhost:8080/api/pets
```

**Response:**
```json
{
  "status": "success",
  "payload": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "name": "Max",
      "specie": "dog",
      "birthDate": "2020-03-15T00:00:00Z",
      "adopted": false
    }
  ]
}
```

#### GET /pets/:pid
Obtener una mascota por ID
```bash
curl http://localhost:8080/api/pets/507f1f77bcf86cd799439012
```

#### POST /pets
Crear una mascota
```bash
curl -X POST http://localhost:8080/api/pets \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Firulais",
    "specie": "dog",
    "birthDate": "2020-03-15T00:00:00Z"
  }'
```

#### POST /pets/withimage
Crear mascota con imagen
```bash
curl -X POST http://localhost:8080/api/pets/withimage \
  -F "name=Firulais" \
  -F "specie=dog" \
  -F "birthDate=2020-03-15T00:00:00Z" \
  -F "image=@/ruta/a/imagen.jpg"
```

#### PUT /pets/:pid
Actualizar una mascota
```bash
curl -X PUT http://localhost:8080/api/pets/507f1f77bcf86cd799439012 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Firulais Actualizado",
    "specie": "dog"
  }'
```

#### DELETE /pets/:pid
Eliminar una mascota
```bash
curl -X DELETE http://localhost:8080/api/pets/507f1f77bcf86cd799439012
```

---

### **ADOPCIONES** 💝

#### GET /adoptions
Obtener todas las adopciones
```bash
curl http://localhost:8080/api/adoptions
```

**Response:**
```json
{
  "status": "success",
  "payload": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "owner": "507f1f77bcf86cd799439011",
      "pet": "507f1f77bcf86cd799439012",
      "createdAt": "2024-02-01T10:30:00Z"
    }
  ]
}
```

#### GET /adoptions/:aid
Obtener una adopción por ID
```bash
curl http://localhost:8080/api/adoptions/507f1f77bcf86cd799439013
```

#### POST /adoptions/:uid/:pid
Crear una adopción (Registrar que un usuario adopta una mascota)
```bash
curl -X POST http://localhost:8080/api/adoptions/507f1f77bcf86cd799439011/507f1f77bcf86cd799439012
```

**Response:**
```json
{
  "status": "success",
  "message": "Pet adopted"
}
```

**Notas:**
- El usuario debe existir
- La mascota debe existir
- La mascota no debe estar ya adoptada
- Después de la adopción:
  - La mascota se marca como `adopted: true`
  - Se asigna el propietario a la mascota
  - Se añade el ID de la mascota al array `pets` del usuario

---

### **MOCKS** 🎭

#### GET /mocks/mockingpets
Generar 100 mascotas ficticias
```bash
curl http://localhost:8080/api/mocks/mockingpets
```

#### GET /mocks/mockingusers?quantity=50
Generar usuarios ficticios
```bash
curl http://localhost:8080/api/mocks/mockingusers?quantity=50
```

#### POST /mocks/generateData
Generar usuarios y mascotas en una petición
```bash
curl -X POST http://localhost:8080/api/mocks/generateData \
  -H "Content-Type: application/json" \
  -d '{
    "users": 10,
    "pets": 15
  }'
```

---

## 📁 Estructura del Proyecto

```
ApiMoocksPets/
├── src/
│   ├── app.js                 # Entrada principal
│   ├── controllers/           # Lógica de negocio
│   │   ├── users.controller.js
│   │   ├── pets.controller.js
│   │   ├── sessions.controller.js
│   │   └── ...
│   ├── routes/               # Definición de rutas
│   │   ├── users.router.js
│   │   ├── pets.router.js
│   │   ├── sessions.router.js
│   │   └── ...
│   ├── services/            # Servicios
│   │   └── index.js
│   ├── repository/          # Patrón repository
│   │   ├── GenericRepository.js
│   │   ├── UserRepository.js
│   │   ├── PetRepository.js
│   │   └── ...
│   ├── dao/                 # Data Access Objects
│   │   ├── Users.dao.js
│   │   ├── Pets.dao.js
│   │   ├── models/          # Modelos de MongoDB
│   │   │   ├── User.js
│   │   │   ├── Pet.js
│   │   │   └── ...
│   │   └── ...
│   ├── dto/                 # Data Transfer Objects
│   │   ├── User.dto.js
│   │   ├── Pet.dto.js
│   │   └── ...
│   ├── docs/
│   │   └── swagger.yaml     # Documentación API
│   ├── utils/               # Utilidades
│   │   ├── mockingPet.js
│   │   ├── mockingUser.js
│   │   ├── uploader.js
│   │   └── index.js
│   └── public/              # Archivos estáticos
│       └── img/
├── test/
│   ├── pets.router.test.js      # Tests de Pets (27 tests)
│   ├── users.router.test.js     # Tests de Users (26 tests)
│   └── adoption.router.test.js  # Tests de Adoptions (22 tests)
├── .env                         # Variables de entorno
├── .env.example                 # Ejemplo de variables de entorno
├── .dockerignore                # Archivos a ignorar en Docker
├── Dockerfile                   # Configuración de Docker
├── docker-compose.yml           # Orquestación de contenedores
├── package.json
└── README.md
```

## 🧪 Cobertura de Tests

### Tests de Pets (27 tests)
- ✅ GET /pets (2 tests)
- ✅ POST /pets (6 tests)
- ✅ GET /pets/:id (3 tests)
- ✅ PUT /pets/:id (5 tests)
- ✅ DELETE /pets/:id (4 tests)
- ✅ Persistencia en BD (3 tests)
- ✅ Validación de datos (4 tests)

### Tests de Users (26 tests)
- ✅ GET /users (2 tests)
- ✅ POST /sessions/register (5 tests)
- ✅ GET /users/:uid (3 tests)
- ✅ PUT /users/:uid (5 tests)
- ✅ DELETE /users/:uid (4 tests)
- ✅ Persistencia en BD (3 tests)
- ✅ Validación de datos (4 tests)

### Tests de Adoptions (18 tests)
- ✅ GET /adoptions (2 tests)
- ✅ GET /adoptions/:aid (3 tests)
- ✅ POST /adoptions/:uid/:pid (5 tests)
- ✅ Validación de respuestas (3 tests)
- ✅ Manejo de errores (3 tests)
- ✅ Tests de integración (2 tests)

**Total: 62 tests funcionales** (61 pasando + 1 pending)

## 🔐 Validaciones Implementadas

### Usuarios
- ✅ Email único
- ✅ Campos obligatorios (first_name, last_name, email, password)
- ✅ Contraseña hasheada con bcrypt
- ✅ JWT tokens con expiración
- ✅ Validación de ObjectId en GET/PUT/DELETE

### Mascotas
- ✅ Campos obligatorios (name, specie, birthDate)
- ✅ Validación de ObjectId
- ✅ Retorna 404 si no existe
- ✅ Retorna 400 si ID es inválido
- ✅ Try-catch en todos los endpoints

### Adopciones
- ✅ Usuario debe existir
- ✅ Mascota debe existir
- ✅ Mascota no debe estar ya adoptada
- ✅ Validación de ObjectIds
- ✅ Actualiza array de mascotas del usuario
- ✅ Marca mascota como adoptada con propietario
- ✅ Error handling con códigos HTTP correctos

## 🛠️ Scripts Disponibles

```bash
npm start               # Ejecutar en producción
npm run dev             # Ejecutar en desarrollo (con nodemon)
npm test                # Tests de Pets
npm run test:users      # Tests de Users
npm run test:adoptions  # Tests de Adoptions
npm run test:all        # Todos los tests
```

## 📝 Variables de Entorno

```env
PORT=8080                                    # Puerto de la API
MONGODB_URI=mongodb+srv://...               # URL de MongoDB
NODE_ENV=development                        # Ambiente (development/production)
```

## 📋 Entregas Completadas

### ✅ Entrega 1: Tests Funcionales

**Objetivos alcanzados:**
- ✅ 27 tests funcionales para router de Pets
- ✅ 26 tests funcionales para router de Users  
- ✅ 22 tests funcionales para router de Adoptions
- ✅ **Total: 75 tests funcionales**

**Archivos generados:**
- `test/pets.router.test.js` - 495 líneas
- `test/users.router.test.js` - Tests de usuarios
- `test/adoption.router.test.js` - Tests de adopciones

**Cobertura:**
- Todos los endpoints GET, POST, PUT, DELETE cubiertos
- Casos de éxito (200, 201)
- Casos de error (400, 404, 500)
- Tests de persistencia en BD
- Validación de datos
- Ciclos completos de operaciones

### ✅ Entrega 2: Documentación con Swagger

**Objetivos alcanzados:**
- ✅ Documentación completa de endpoint Users
- ✅ Documentación completa de endpoint Adoptions
- ✅ Documentación de Pets endpoint
- ✅ Documentación de Mocks y Sessions
- ✅ Ejemplos reales en todas las respuestas

**Acceso:**
```
http://localhost:8080/api-docs
```

**Archivo:**
- `src/docs/swagger.yaml` - 1100+ líneas con OpenAPI 3.0

### ✅ Entrega 3: Dockerización del Proyecto

**Objetivos alcanzados:**
- ✅ Dockerfile creado y optimizado
- ✅ Docker Compose para orquestación
- ✅ .dockerignore para limpieza de contexto
- ✅ .env.example para configuración
- ✅ Documentación completa de Docker en README

**Archivos generados:**
- `Dockerfile` - Imagen Node.js Alpine optimizada
- `docker-compose.yml` - Configuración para ejecución
- `.dockerignore` - Exclusiones de contexto
- `.env.example` - Variables de entorno de ejemplo

**Características:**
- Imagen Alpine para tamaño reducido
- Multi-stage support
- Variables de entorno configurables
- Puerto 8080 expuesto
- NODE_ENV=production en Docker

### ✅ Entrega 4: Validaciones y Error Handling

**Mejoras implementadas:**
- ✅ Validación de ObjectId en todos los endpoints
- ✅ Try-catch en todos los controladores
- ✅ Códigos HTTP correctos (400, 404, 500)
- ✅ Mensajes de error descriptivos
- ✅ Validación de relaciones en adopciones

**Controladores mejorados:**
- `src/controllers/adoptions.controller.js` - ObjectId validation + error handling
- `src/controllers/users.controller.js` - Validaciones completas
- `src/controllers/pets.controller.js` - Validaciones completas
- `src/controllers/sessions.controller.js` - JWT validation mejorado

### 📁 Estructura de Entregas

```
ApiMoocksPets/
├── 📄 Dockerfile
├── 📄 docker-compose.yml
├── 📄 .dockerignore
├── 📄 .env.example
├── 📁 test/
│   ├── 📄 pets.router.test.js      ✅ 27 tests
│   ├── 📄 users.router.test.js     ✅ 26 tests
│   └── 📄 adoption.router.test.js  ✅ 22 tests
├── 📁 src/
│   ├── 📁 controllers/
│   │   ├── 📄 adoptions.controller.js (mejorado)
│   │   ├── 📄 users.controller.js (mejorado)
│   │   ├── 📄 pets.controller.js (mejorado)
│   │   └── 📄 sessions.controller.js (mejorado)
│   └── 📁 docs/
│       └── 📄 swagger.yaml (actualizado con adopciones)
└── 📄 README.md (este archivo)
```

## 🚀 Próximos Pasos (Opcional)

- [ ] Subir imagen a Docker Hub
- [ ] Crear CI/CD pipeline
- [ ] Añadir tests de carga
- [ ] Implementar rate limiting
- [ ] Añadir autenticación OAuth
- [ ] Crear dashboard de administración

## 🤝 Contribución

Las contribuciones son bienvenidas. Para cambios mayores:

1. Crea un fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request


## 📄 Licencia

Este proyecto está bajo la licencia ISC.

## 📞 Soporte

Para soporte, envía un email a: support@apimockspets.com

---

**Hecho con ❤️ por el equipo de API Mocks Pets**
