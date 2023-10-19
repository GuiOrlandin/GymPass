import { FastifyInstance } from "fastify";

import { verifyJWT } from "../../middleware/verify-jwt";

import { create } from "./create";
import { validate } from "./validate";
import { metrics } from "./metrics";
import { history } from "./history";

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.get("/check-ins/metrics", metrics);
  app.get("/check-ins/history", history);

  app.post("/gyms/:gymId/check-ins", create);
  app.patch("/check-ins/:checkInId/validate", validate);
}
