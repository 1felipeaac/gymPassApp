import { PrismaCheckinsRepository } from "@/repositories/prisma/prisma-checkins-repository"
import { CheckinService } from "../checkin"
import { PrismaGymRepository } from "@/repositories/prisma/prisma-gyms-repository"

export function makeCheckinService(){
    const checkinRepository = new PrismaCheckinsRepository()
    const gymRepository = new PrismaGymRepository()
            
    const service = new CheckinService(checkinRepository, gymRepository)

    return service
}