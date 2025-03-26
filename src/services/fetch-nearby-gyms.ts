import { GymsRepository } from "@/repositories/gymsRepository"
import { inMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository"
import { Gym } from "@prisma/client"

let gymRepository : inMemoryGymsRepository
let sut : FetchNearbyGymsService
const latitude = -5.1421768
const longitude = -42.8345395
interface FetchNearbyGymsServiceRequest{
    userLatitude: number,
    userLongitude: number,
}

interface FetchNearbyGymsServiceResponse{
    gyms: Gym[]
}

export class FetchNearbyGymsService{
    
    constructor(private gymRepository: GymsRepository){}

    async execute({
        userLatitude,
        userLongitude
    }: FetchNearbyGymsServiceRequest):Promise<FetchNearbyGymsServiceResponse>{
        
        const gyms = await this.gymRepository.findManyNearby({
            latitude: userLatitude, 
            longitude:userLongitude
        });
        return {gyms}
    }
}