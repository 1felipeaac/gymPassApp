import { PrismaGymRepository } from "@/repositories/prisma/prisma-gyms-repository"
import { FetchNearbyGymsService } from "../fetch-nearby-gyms"

export function makeFetchNearbyGymsService(){
    const repository = new PrismaGymRepository()
            
    const service = new FetchNearbyGymsService(repository)

    return service
}