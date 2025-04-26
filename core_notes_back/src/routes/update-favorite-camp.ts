import { FastifyInstance } from "fastify";
import { prisma } from "../utils/prisma";
import { z } from "zod";
import { ZodTypeProvider } from "fastify-type-provider-zod";

export async function UpdateFavoriteNote(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().patch(
    "/update-note-favorite/:id",
    {
      schema: {
        params: z.object({
          id: z.string().uuid(),
        }),
        body: z.object({
          isFavorite: z.boolean()
        }),
        response: {
          200: z.object({
            id: z.string().uuid(),
            isFavorite: z.boolean().nullable()
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const { isFavorite } = request.body;

      try {
        const note = await prisma.note.update({
          where: { id },
          data: {
            isFavorite
          },
          select: {
            id: true,
            isFavorite: true
          }
        });
        return reply.send(note);
      } catch (error) {
        return reply.status(404).send(error);
      }
    }
  );
}
