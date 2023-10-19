import { makeCreateGymsUseCase } from "@/use-cases/factories/make-create-gym-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createGymBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { title, description, latitude, longitude, phone } =
    createGymBodySchema.parse(request.body);

  const createGymUseCase = makeCreateGymsUseCase();

  await createGymUseCase.execute({
    title,
    description,
    latitude,
    longitude,
    phone,
  });

  return reply.status(201).send();
}
