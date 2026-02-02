# Usar imagen oficial de Node.js
FROM node:22-alpine

# Establecer directorio de trabajo en el contenedor
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias de producción
RUN npm ci --only=production

# Copiar el resto del proyecto
COPY . .

# Exponer el puerto
EXPOSE 8080

# Variable de entorno
ENV NODE_ENV=production

# Comando para iniciar la aplicación
CMD ["npm", "start"]
