import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../utils/prisma";

export async function DeleteNote(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    "/delete-note/:id",
    {
      schema: {
        params: z.object({
          id: z.string().uuid(),
        }),
        response: {
          200: z.object({
            id: z.string(),
            title: z.string(),
            description: z.string().nullable(),
            isFavorite: z.boolean().nullable(),
            createdAt: z.date(),
            updatedAt: z.date(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      try {
        const note = await prisma.note.delete({
          where: { id },
        });
        return reply.send(note);
      } catch (error) {
        return reply.status(500).send(error);
      }
    }
  );
}
