import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { GetUserProfileService } from "../get_user_profile"

export function makeGetUserProfileService(){
    const userRepository = new PrismaUsersRepository()
            
    const service = new GetUserProfileService(userRepository)

    return service
}