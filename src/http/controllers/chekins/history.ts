import { makeFetchUsersChcekinsHistoryService } from "@/services/factories/make-fech-users-checkins-history-service"
import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"

export async function history(request: FastifyRequest, reply: FastifyReply){
    const checkinHistoryBodySchema = z.object({
        page: z.coerce.number().min(1).default(1)
    })

    const {page} = checkinHistoryBodySchema.parse(request.query)
        
    const historyService = makeFetchUsersChcekinsHistoryService()

    const {checkins} = await historyService.execute(
        {
            userId: request.user.sub,
            page
        }
    )
    

    return reply.status(200).send({checkins})

}