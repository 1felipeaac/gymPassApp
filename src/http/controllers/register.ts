import { RegisterService } from "@/services/register"
import { FastifyReply, FastifyRequest } from "fastify"
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { z } from "zod"
import { UserAlreadyExistsError } from "@/services/errors/user-already-exists-error"
export async function register(request: FastifyRequest, reply: FastifyReply){
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string(),
        password: z.string().min(6),
    })

    const {name, email, password} = registerBodySchema.parse(request.body)

    try {
        const prismaUserRepository = new PrismaUsersRepository()
        
        const registerUser = new RegisterService(prismaUserRepository)

        await registerUser.execute({name, email, password})
    } catch (error) {
        if(error instanceof UserAlreadyExistsError){
            return reply.status(409).send({message: error.message})
        }
        throw error
    }

    return reply.status(201).send()

}