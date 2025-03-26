import { makeGetUserProfileService } from "@/services/factories/make-get_user_profile-service";
import { FastifyRequest, FastifyReply } from "fastify";

export async function profile(request: FastifyRequest, reply: FastifyReply){

    const getUserProfile = makeGetUserProfileService()

    const {user} = await getUserProfile.execute({
        userId: request.user.sub
    })

    // console.log(request.user.sub)
   
    return reply.status(200).send({
        user:{
            ...user,
            password_hash: undefined
        }
    })

}