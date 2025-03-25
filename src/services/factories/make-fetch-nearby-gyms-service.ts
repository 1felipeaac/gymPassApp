import { PrismaGymRepository } from "@/repositories/prisma/prisma-gyms-repository"
import { FetchNearbyGymsGymService } from "../fetch-nearby-gyms"

export function makeFetchNearbyGymsGymService(){
    const repository = new PrismaGymRepository()
            
    const service = new FetchNearbyGymsGymService(repository)

    return service
}