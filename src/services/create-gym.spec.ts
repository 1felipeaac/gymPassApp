import { inMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository"
import { CreateGymService } from "./create-gym"
import { beforeEach, describe, expect, it } from "vitest"

let userRepository : inMemoryGymsRepository
let sut :CreateGymService
const latitude = -5.1421768
const longitude = -42.8345395
describe('create gym service', () => {
    beforeEach(() => {
         userRepository = new inMemoryGymsRepository()
         sut = new CreateGymService(userRepository)
    })
    it('should be able to gym', async () => {
        

        const {gym} = await sut.execute({
            title: "JS Gym",
            description: "",
            phone: "",
            latitude: latitude,
            longitude: longitude
        })

        expect(gym.id).toEqual(expect.any(String))
    })

})