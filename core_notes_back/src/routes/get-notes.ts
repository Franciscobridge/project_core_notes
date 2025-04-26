import { FastifyInstance } from "fastify";
import { prisma } from "../utils/prisma";

export async function GetAllNotes(app: FastifyInstance) {
  app.get(
    "/all-notes", async (request, reply) => {
      try {
        const notes = await prisma.note.findMany();
        return reply.send(notes);
      } catch (error) {
        return reply.status(500).send(error);
      }
    }
  );
}
