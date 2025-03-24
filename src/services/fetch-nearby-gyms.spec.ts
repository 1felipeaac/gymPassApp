import { inMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository"
import { FetchNearbyGymsGymService } from "./fetch-nearby-gyms"
import { beforeEach, describe, expect, it } from "vitest"

let gymRepository : inMemoryGymsRepository
let sut : FetchNearbyGymsGymService
const latitude = -5.1421768
const longitude = -42.8345395
describe('fetch nearby user gyms service', () => {
    beforeEach(async () => {
        gymRepository = new inMemoryGymsRepository()
        sut = new FetchNearbyGymsGymService(gymRepository)

        })
    it('should be able to fetch nearby gyms', async () => {

        await gymRepository.create({
            title: "Near Gym",
            description: "",
            phone: "",
            latitude: latitude,
            longitude: longitude
        })
        
        await gymRepository.create({
            title: "Far Gym",
            description: "",
            phone: "",
            latitude: -5.0819789,
            longitude: -42.7637889
        })


        const {gyms} = await sut.execute({
            userLatitude: latitude,
            userLongitude: longitude
        })

        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([
            expect.objectContaining({title: "Near Gym"}),
        ])
    })

})