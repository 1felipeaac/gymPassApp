import { GymsRepository } from "@/repositories/gymsRepository"
import { inMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository"
import { Gym } from "@prisma/client"

let gymRepository : inMemoryGymsRepository
let sut : FetchNearbyGymsGymService
const latitude = -5.1421768
const longitude = -42.8345395
interface FetchNearbyGymsGymServiceRequest{
    userLatitude: number,
    userLongitude: number,
}

interface FetchNearbyGymsGymServiceResponse{
    gyms: Gym[]
}

export class FetchNearbyGymsGymService{
    
    constructor(private gymRepository: GymsRepository){}

    async execute({
        userLatitude,
        userLongitude
    }: FetchNearbyGymsGymServiceRequest):Promise<FetchNearbyGymsGymServiceResponse>{
        
        const gyms = await this.gymRepository.findManyNearby({
            latitude: userLatitude, 
            longitude:userLongitude
        });
        return {gyms}
    }
}