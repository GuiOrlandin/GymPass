import { FastifyInstance } from "fastify";

import { verifyJWT } from "../../middleware/verify-jwt";

import { create } from "./create";
import { validate } from "./validate";
import { metrics } from "./metrics";
import { history } from "./history";

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.patch("/check-ins/metrics", metrics);
  app.patch("/check-ins/history", history);

  app.post("/gyms/:gymId/check-ins", create);
  app.patch("/check-ins/:checInId/validate", validate);
}
