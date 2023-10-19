import { makeCheckInsUseCase } from "@/use-cases/factories/make-check-ins-use-case";
import { makeValidateCheckInsUseCase } from "@/use-cases/factories/make-validate-check-in-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckInsParamsSchema = z.object({
    checkInId: z.string().uuid(),
  });

  const { checkInId } = validateCheckInsParamsSchema.parse(request.body);

  const validateCheckInsUseCase = makeValidateCheckInsUseCase();

  await validateCheckInsUseCase.execute({
    checkInId,
  });

  return reply.status(204).send();
}
