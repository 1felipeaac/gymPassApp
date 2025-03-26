import { makeValidateCheckinService } from "@/services/factories/make-validate-checkin-service"
import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"

export async function validate(request: FastifyRequest, reply: FastifyReply){
    const validateCheckinParamsSchema = z.object({
        checkinId: z.string().uuid()
    })

   

    const {checkinId} = validateCheckinParamsSchema.parse(request.params)
        
    const checkinService = makeValidateCheckinService()

    await checkinService.execute(
        {
            checkinId
        })
    

    return reply.status(204).send()

}