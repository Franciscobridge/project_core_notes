import { FastifyInstance } from "fastify";
import { prisma } from "../utils/prisma";
import { z } from "zod";
import { ZodTypeProvider } from "fastify-type-provider-zod";

export async function UpdateNote(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().patch(
    "/update-note/:id",
    {
      schema: {
        params: z.object({
          id: z.string().uuid(),
        }),
        body: z.object({
          title: z.string().optional(),
          description: z.string().optional(),
        }),
        response: {
          200: z.object({
            id: z.string().uuid(),
            title: z.string(),
            description: z.string().nullable(),
            isFavorite: z.boolean().nullable(),
            updatedAt: z.date(),
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const { title, description } = request.body;

      try {
        const note = await prisma.note.update({
          where: { id },
          data: {
            ...(title !== null && { title }),
            ...(description !== null && { description }),
            updatedAt: new Date(),
          },
        });
        return reply.send(note);
      } catch (error) {
        return reply.status(404).send(error);
      }
    }
  );
}
