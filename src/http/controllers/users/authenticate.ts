import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
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
        const {user} = await authenticate.execute({email, password})

        const token = await reply.jwtSign(
            {
                role: user.role
            }, 
            {
                sign: {
                    sub: user.id
                },
            }
        )

        const refreshToken = await reply.jwtSign(
            {
                role: user.role
            }, 
            {
                sign: {
                    sub: user.id,
                    expiresIn: '7d'
                },
            }
        )
        return reply
            .status(200)
            .setCookie('refreshToken', refreshToken, {
                path: '/', // todas as rotas exergam o cookie
                secure: true, //HTTPS
                sameSite: true,
                httpOnly: true
            })
            .send({token})
    } catch (error) {
        if(error instanceof InvalidCredentialsError){
            return reply.status(400).send({message: error.message})
        }
        throw error
    }

}