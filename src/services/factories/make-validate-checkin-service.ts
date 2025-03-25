import { PrismaCheckinsRepository } from "@/repositories/prisma/prisma-checkins-repository"
import { ValidateCheckinService } from "../validate-checkin"

export function makeValidateCheckinService(){
    const repository = new PrismaCheckinsRepository()
            
    const service = new ValidateCheckinService(repository)

    return service
}