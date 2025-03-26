import { makeGetUsersMetricsService } from "@/services/factories/make-get-users-metrics-service"
import { FastifyRequest, FastifyReply } from "fastify"

export async function metrics(request: FastifyRequest, reply: FastifyReply){
   
        
    const metricsHistory = makeGetUsersMetricsService()

    const {checkinsCount} = await metricsHistory.execute(
        {
            userId: request.user.sub
        }
    )
    
    return reply.status(200).send({checkinsCount})

}