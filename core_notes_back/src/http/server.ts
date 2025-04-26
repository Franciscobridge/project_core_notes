import fastify from "fastify";
import { CreateNote } from "../routes/create-note";
import { UpdateNote } from "../routes/update-note";
import cors from "@fastify/cors";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { UpdateFavoriteNote } from "../routes/update-favorite-camp";
import { DeleteNote } from "../routes/delete-note";
import { UpdateColorNote } from "../routes/update-color-note";
import { GetAllNotes } from "../routes/get-notes";

const app = fastify();

app.register(cors, {
  origin: true,
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(GetAllNotes);
app.register(CreateNote);
app.register(UpdateNote);
app.register(UpdateFavoriteNote);
app.register(UpdateColorNote);
app.register(DeleteNote);

app.listen({ port: 3333 }).then(() => {
  console.log("HTTP server running!");
});
