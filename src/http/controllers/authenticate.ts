import { FastifyReply, FastifyRequest } from "fastify"
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { z } from "zod"
import { AuthenticateService } from "@/services/authenticate"
import { InvalidCredentialsError } from "@/services/errors/invalid-credentials-error"
import { makeAuthenticateService } from "@/services/factories/make-authenticate-service"
export async function authenticate(request: FastifyRequest, reply: FastifyReply){
    const authenticateBodySchema = z.object({
        email: z.string(),
        password: z.string().min(6),
    })

    const {email, password} = authenticateBodySchema.parse(request.body)

    try {
         
        const authenticate = makeAuthenticateService()
        await authenticate.execute({email, password})
    } catch (error) {
        if(error instanceof InvalidCredentialsError){
            return reply.status(400).send({message: error.message})
        }
        throw error
    }

    return reply.status(200).send()

}