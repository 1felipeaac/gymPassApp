import { PrismaGymRepository } from "@/repositories/prisma/prisma-gyms-repository"
import { CreateGymService } from "../create-gym"

export function makeCreateGymService(){
    const repository = new PrismaGymRepository()
            
    const service = new CreateGymService(repository)

    return service
}