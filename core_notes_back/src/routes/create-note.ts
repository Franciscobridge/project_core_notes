import { FastifyInstance } from "fastify";
import { prisma } from "../utils/prisma";
import { z } from "zod";
import { ZodTypeProvider } from "fastify-type-provider-zod";

export async function CreateNote(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/create-note",
    {
      schema: {
        body: z.object({
          title: z.string(),
          description: z.string().optional().nullable(),
          isFavorite: z.boolean().optional().nullable()
        }),
        response: {
          201: z.object({
            id: z.string(),
            title: z.string(),
            description: z.string().nullable(),
            color: z.string(),
            isFavorite: z.boolean().nullable(),
            createdAt: z.date(),
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { title, description, isFavorite } = request.body;

      try {
        const note = await prisma.note.create({
          data: {
            title,
            description,
            isFavorite
          },
          select: {
            id: true,
            title: true,
            description: true,
            color: true,
            isFavorite: true,
            createdAt: true,
          },
        });
        return reply.send(note);
      } catch (error) {
        return reply.status(404).send(error);
      }
    }
  );
}
