import 'dotenv/config'; // Carrega as variáveis de ambiente automaticamente
import fastify from 'fastify';
import cors from '@fastify/cors';
import { CreateNote } from '../routes/create-note';
import { UpdateNote } from '../routes/update-note';
import { UpdateFavoriteNote } from '../routes/update-favorite-camp';
import { DeleteNote } from '../routes/delete-note';
import { UpdateColorNote } from '../routes/update-color-note';
import { GetAllNotes } from '../routes/get-notes';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';

const app = fastify();

// Garantindo que a variável de ambiente `PORT` seja um número
const port = Number(process.env.PORT) || 3333; // Converte para número ou usa 3333 como fallback

// Registro do CORS
app.register(cors, {
  origin: true,
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
});

// Configura o compilador de validador e serializador
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

// Registrando rotas
app.register(GetAllNotes);
app.register(CreateNote);
app.register(UpdateNote);
app.register(UpdateFavoriteNote);
app.register(UpdateColorNote);
app.register(DeleteNote);

// Inicializando o servidor
app.listen({ port }).then(() => {
  console.log(`HTTP server running on port ${port}`);
});
