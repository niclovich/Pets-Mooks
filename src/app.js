import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yaml';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import 'dotenv/config';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT||8080;

// Conectar a MongoDB Atlas
const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://coder1:coder1@cluster0.srl88.mongodb.net/apimockspets?retryWrites=true&w=majority';
mongoose.connect(mongoURI)
    .then(() => console.log('✅ Conectado a MongoDB'))
    .catch(err => console.log('❌ Error conectando a MongoDB:', err.message));

// Cargar documentación de Swagger
const swaggerFile = fs.readFileSync(join(__dirname, 'docs', 'swagger.yaml'), 'utf8');
const swaggerDocument = YAML.parse(swaggerFile);

app.use(express.json());
app.use(cookieParser());

// Ruta de documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);
app.use('/api/mocks',mocksRouter);

app.listen(PORT,()=>{
    console.log(`Listening on ${PORT}`)
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`)
})
