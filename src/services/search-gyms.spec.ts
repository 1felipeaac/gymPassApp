import { inMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository"
import { SearchGymService } from "./search-gyms"
import { beforeEach, describe, expect, it } from "vitest"

let gymRepository : inMemoryGymsRepository
let sut : SearchGymService
const latitude = -5.1421768
const longitude = -42.8345395
describe('fetch user checkins service', () => {
    beforeEach(async () => {
        gymRepository = new inMemoryGymsRepository()
        sut = new SearchGymService(gymRepository)

        })
    it('should be able to search for gyms', async () => {

        await gymRepository.create({
            title: "JS Gym",
            description: "",
            phone: "",
            latitude: latitude,
            longitude: longitude
        })

        await gymRepository.create({
            title: "TS Gym",
            description: "",
            phone: "",
            latitude: latitude,
            longitude: longitude
        })


        const {gyms} = await sut.execute({
            query: "JS",
            page: 1
        })

        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([
            expect.objectContaining({title: "JS Gym"}),
        ])
    })

    it('should be able to fetch paginated gyms search', async () => {

        for(let i = 0; i <= 22; i++){
            await gymRepository.create({
                title: `JS gym-${i}`,
                description: "",
                phone: "",
                latitude: latitude,
                longitude: longitude
            })
        }

        const {gyms} = await sut.execute({
            query:"JS",
            page: 2,
        })

        expect(gyms).toHaveLength(3)
        expect(gyms).toEqual([
            expect.objectContaining({title: "JS gym-20"}),
            expect.objectContaining({title: "JS gym-21"}),
            expect.objectContaining({title: "JS gym-22"}),
        ])
    })

})
