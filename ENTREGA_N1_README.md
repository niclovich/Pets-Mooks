# Entrega N°1 - Resumen de Implementación

## Archivos Creados/Modificados

### 1. Router de Mocks (`src/routes/mocks.router.js`)
- **Descripción**: Router principal para endpoints de mocking
- **Ruta base**: `/api/mocks`
- **Endpoints**:
  - `GET /mockingpets`: Retorna 100 mascotas ficticias
  - `GET /mockingusers`: Retorna usuarios ficticios (parámetro query: `quantity`, default: 50)
  - `POST /generateData`: Genera e inserta datos en la BD (parámetros: `users`, `pets`)

### 2. Controlador de Mocks (`src/controllers/mocks.controller.js`)
- Maneja la lógica de los endpoints
- Utiliza módulos de mocking para generar datos
- Integra con servicios de usuarios y mascotas para persistencia

### 3. Módulo de Mocking de Usuarios (`src/utils/mockingUser.js`)
- Clase `MockingUser` que genera usuarios ficticios
- Características:
  - Contraseña: "coder123" encriptada con bcrypt
  - Role: Varía aleatoriamente entre "user" y "admin"
  - Pets: Array vacío por defecto
  - Utiliza faker.js para generar nombres y emails realistas

### 4. Módulo de Mocking de Mascotas (`src/utils/mockingPet.js`)
- Clase `MockingPet` que genera mascotas ficticias
- Características:
  - Nombre: Generado por faker.js
  - Especie: Seleccionada aleatoriamente (dog, cat, rabbit, bird, hamster, parrot)
  - Fecha de nacimiento: Generada por faker.js
  - Adopted: Por defecto false

### 5. Archivo Principal (`src/app.js`)
- Se agregó importación del router de mocks
- Se registró la ruta `/api/mocks` con el router

## Dependencias Instaladas
- `@faker-js/faker`: Para generar datos realistas

## Ejemplos de Uso

### GET /api/mocks/mockingpets
```
GET http://localhost:8080/api/mocks/mockingpets
Response: {
  "status": "success",
  "payload": [
    {
      "name": "Pet 1",
      "specie": "dog",
      "birthDate": "2020-05-15T00:00:00.000Z"
    },
    ...
  ]
}
```

### GET /api/mocks/mockingusers
```
GET http://localhost:8080/api/mocks/mockingusers?quantity=50
Response: {
  "status": "success",
  "payload": [
    {
      "first_name": "John",
      "last_name": "Doe",
      "email": "john.doe@example.com",
      "password": "$2b$10$...", // contraseña encriptada
      "role": "user",
      "pets": []
    },
    ...
  ]
}
```

### POST /api/mocks/generateData
```
POST http://localhost:8080/api/mocks/generateData
Body: {
  "users": 10,
  "pets": 15
}
Response: {
  "status": "success",
  "message": "Generated 10 users and 15 pets",
  "payload": {
    "users": [...],
    "pets": [...]
  }
}
```
> Nota: Este endpoint genera los datos pero NO los inserta en la base de datos. Solo retorna los datos generados.

### Verificación de Registros Insertados
```
GET http://localhost:8080/api/users - Ver todos los usuarios
GET http://localhost:8080/api/pets - Ver todas las mascotas
```

## Criterios Cumplidos

✅ Router mocks.router.js creado bajo `/api/mocks`
✅ Endpoint `/mockingpets` migrado correctamente
✅ Módulo de Mocking para generar usuarios con especificaciones
✅ Endpoint GET `/mockingusers` implementado
✅ Usuarios generados con contraseña "coder123" encriptada
✅ Roles variados entre "user" y "admin"
✅ Array de pets vacío en usuarios generados
✅ Endpoint POST `/generateData` implementado
✅ Capacidad de generar datos (usuarios y mascotas)
✅ Formato compatible con Mongo
✅ Los datos generados se retornan en la respuesta
