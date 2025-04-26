import { FastifyInstance } from "fastify";
import { prisma } from "../utils/prisma";
import { z } from "zod";
import { ZodTypeProvider } from "fastify-type-provider-zod";

export async function UpdateColorNote(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().patch(
    "/update-note-color/:id",
    {
      schema: {
        params: z.object({
          id: z.string().uuid(),
        }),
        body: z.object({
          color: z.string()
        }),
        response: {
          200: z.object({
            id: z.string().uuid(),
            color: z.string()
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const { color } = request.body;

      try {
        const note = await prisma.note.update({
          where: { id },
          data: {
            color
          },
          select: {
            id: true,
            color: true
          }
        });
        return reply.send(note);
      } catch (error) {
        return reply.status(404).send(error);
      }
    }
  );
}
