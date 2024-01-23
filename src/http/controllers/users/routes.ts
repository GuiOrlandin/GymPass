import { FastifyInstance } from "fastify";
import { authenticate } from "./authenticate";
import { verifyJWT } from "../../middleware/verify-jwt";
import { register } from "./register";
import { profile } from "./profile";
import { refresh } from "./refresh";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/users", register);
  app.post("/sessions", authenticate);


  app.patch("/token/refresh", refresh);

  /* Authenticated */
  app.get("/me", { onRequest: [verifyJWT] }, profile);
}
