import { SearchGymService } from "../search-gyms"
import { PrismaGymRepository } from "@/repositories/prisma/prisma-gyms-repository"

export function makeSearchGymService(){
    const repository = new PrismaGymRepository()
            
    const service = new SearchGymService(repository)

    return service
}