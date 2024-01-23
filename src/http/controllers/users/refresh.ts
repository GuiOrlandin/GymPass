import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function refresh(
  request: FastifyRequest,
  reply: FastifyReply
) {

    await request.jwtVerify({ onlyCookie: true }); //vai olhar somente se na requisição contem um refreshToken (e esta valido).


    const { role } = request.user


    const token = await reply.jwtSign(
        { role },
        {
            sign: {
                sub: request.user.sub,
            },
        }
    );

    const refreshToken = await reply.jwtSign(
        { role },
        {
            sign: {
                sub: request.user.sub,
                expiresIn: "7d",
            },
        }
    );

    return reply.
        setCookie("refreshToken", refreshToken, {
            path: "/",
            secure: true,
            sameSite: true,
            httpOnly: true,
        }).
        status(200).send({
            token,
       
        });
}
