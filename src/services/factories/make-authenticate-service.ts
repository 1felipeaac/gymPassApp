import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { AuthenticateService } from "../authenticate"

export function makeAuthenticateService(){
    const userRepository = new PrismaUsersRepository()
            
    const registerUser = new AuthenticateService(userRepository)

    return registerUser
}