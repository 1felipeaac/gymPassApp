import fastify from "fastify";
import { usersRoutes } from "./http/controllers/users/routes";
import { ZodError } from "zod";
import { env } from "./env";
import fastifyJwt from "@fastify/jwt";
import { gymsRoutes } from "./http/controllers/gyms/routes";
import { checkinsRoutes } from "./http/controllers/chekins/routes";

export const app = fastify();

app.register(fastifyJwt, {
    secret: env.JWT_SECRET
})

app.register(usersRoutes)
app.register(gymsRoutes)
app.register(checkinsRoutes)

app.setErrorHandler((error, _, reply) => {
    if(error instanceof ZodError){
        return reply.status(400).send({
            message: 'Erro de Validação',
            issues: error.format()
        })
    }

    if(env.NODE_ENV !== 'production'){
        console.error(error)
    }else{
        //TODO log para ferramente externa
    }

    reply.status(500).send({message: 'Internal Server Error'})
})