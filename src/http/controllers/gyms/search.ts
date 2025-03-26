import { makeSearchGymService } from "@/services/factories/make-search-gyms-service"
import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"

export async function search(request: FastifyRequest, reply: FastifyReply){
    const searchGymBodySchema = z.object({
        q: z.string(),
        page: z.coerce.number().min(1).default(1)
    })

    const {q , page} = searchGymBodySchema.parse(request.query)
        
    const searchGym = makeSearchGymService()

    const {gyms} = await searchGym.execute({query: q, page})
    

    return reply.status(200).send({gyms})

}