# 🐳 Guía de Deployment - Docker Hub

Este documento proporciona instrucciones paso a paso para construir y subir la imagen Docker del proyecto a Docker Hub.

## 📋 Requisitos Previos

1. **Docker instalado**: [Descargar Docker Desktop](https://www.docker.com/products/docker-desktop)
2. **Cuenta en Docker Hub**: [Crear cuenta](https://hub.docker.com/signup)
3. **Docker CLI configurado**: `docker login`
4. **Git instalado** (opcional)

## 🔑 Paso 1: Login a Docker Hub

Abre una terminal y ejecuta:

```bash
docker login
```

Te pedirá tu nombre de usuario y contraseña de Docker Hub. Ingresa tus credenciales.

**Verificación:**
```bash
docker info
```

Deberías ver tu username en la salida.

## 🔨 Paso 2: Construir la Imagen Localmente

Desde la raíz del proyecto, ejecuta:

```bash
docker build -t tuusuario/apimockspets:1.0.0 .
```

Donde:
- `tuusuario` = Tu nombre de usuario en Docker Hub
- `apimockspets` = Nombre del repositorio
- `1.0.0` = Versión (tag)

**Ejemplo:**
```bash
docker build -t nicolasdiazn/apimockspets:1.0.0 .
```

**Verificación:**
```bash
docker images
```

Deberías ver tu imagen en la lista.

## 🧪 Paso 3: Probar la Imagen Localmente

Antes de subir, verifica que funciona:

```bash
docker run -p 8080:8080 \
  -e MONGODB_URI="mongodb+srv://coder1:coder1@cluster0.xxxxx.mongodb.net/apimockspets?retryWrites=true&w=majority" \
  tuusuario/apimockspets:1.0.0
```

Verifica que la API responda:
```bash
curl http://localhost:8080/api-docs
```

## 📤 Paso 4: Subir la Imagen a Docker Hub

### Opción A: Subir versión específica

```bash
docker push tuusuario/apimockspets:1.0.0
```

### Opción B: Subir como `latest`

```bash
# Crear tag latest
docker tag tuusuario/apimockspets:1.0.0 tuusuario/apimockspets:latest

# Subir ambas versiones
docker push tuusuario/apimockspets:1.0.0
docker push tuusuario/apimockspets:latest
```

**Tiempo estimado:** 2-5 minutos

## ✅ Paso 5: Verificar en Docker Hub

1. Ve a [hub.docker.com](https://hub.docker.com)
2. Login con tu cuenta
3. Busca tu repositorio `apimockspets`
4. Verifica que los tags estén disponibles

## 🔗 Paso 6: Usar la Imagen Publicada

Cualquiera puede ahora usar tu imagen:

```bash
# Pull la imagen
docker pull tuusuario/apimockspets:latest

# Ejecutar
docker run -p 8080:8080 \
  -e MONGODB_URI="mongodb+srv://coder1:coder1@cluster0.xxxxx.mongodb.net/apimockspets?retryWrites=true&w=majority" \
  tuusuario/apimockspets:latest
```

## 📝 Ejemplo Completo

```bash
# 1. Login
docker login

# 2. Construir
docker build -t nicolasdiazn/apimockspets:1.0.0 .

# 3. Probar localmente
docker run -p 8080:8080 \
  -e MONGODB_URI="mongodb+srv://coder1:coder1@cluster0.xxxxx.mongodb.net/apimockspets?retryWrites=true&w=majority" \
  nicolasdiazn/apimockspets:1.0.0

# 4. Crear tag latest
docker tag nicolasdiazn/apimockspets:1.0.0 nicolasdiazn/apimockspets:latest

# 5. Subir a Docker Hub
docker push nicolasdiazn/apimockspets:1.0.0
docker push nicolasdiazn/apimockspets:latest
```

## 🚀 Actualizar la Imagen

Para nuevas versiones:

```bash
# Cambiar versión en docker build
docker build -t tuusuario/apimockspets:1.0.1 .

# Probar
docker run -p 8080:8080 \
  -e MONGODB_URI="..." \
  tuusuario/apimockspets:1.0.1

# Subir nueva versión
docker push tuusuario/apimockspets:1.0.1

# Actualizar latest
docker tag tuusuario/apimockspets:1.0.1 tuusuario/apimockspets:latest
docker push tuusuario/apimockspets:latest
```

## 🐛 Troubleshooting

### Error: "denied: requested access to the resource is denied"
```bash
# Solución: Verificar que:
docker login
# - Username es correcto
# - Contraseña es correcta
```

### Error: "image not found"
```bash
# Verificar que la imagen existe localmente
docker images

# Si no existe, construir
docker build -t tuusuario/apimockspets:1.0.0 .
```

### Error: "no space left on device"
```bash
# Limpiar imágenes sin usar
docker system prune -a

# Limpiar volúmenes
docker volume prune
```

## 📊 Comandos Útiles

```bash
# Ver todas las imágenes
docker images

# Ver historial de construcción
docker history tuusuario/apimockspets:1.0.0

# Buscar en Docker Hub desde CLI
docker search apimockspets

# Inspeccionar imagen
docker inspect tuusuario/apimockspets:1.0.0

# Ver logs de construcción
docker build --progress=plain -t tuusuario/apimockspets:1.0.0 .

# Eliminar imagen local
docker rmi tuusuario/apimockspets:1.0.0
```

## 🔐 Mejores Prácticas

1. **Usar tags específicos de versión** (1.0.0) no solo `latest`
2. **Probar la imagen antes de subir**
3. **Mantener el Dockerfile pequeño** (Alpine)
4. **No incluir secretos** en la imagen (usar variables de entorno)
5. **Usar .dockerignore** para excluir archivos innecesarios

## 📚 Enlaces Útiles

- [Docker Hub Docs](https://docs.docker.com/docker-hub/)
- [Docker Push Documentation](https://docs.docker.com/engine/reference/commandline/push/)
- [Best Practices for Writing Dockerfiles](https://docs.docker.com/develop/dev-best-practices/dockerfile_best-practices/)

---

**¡Tu imagen estará disponible en Docker Hub para que cualquiera pueda usarla!** 🎉
