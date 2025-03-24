import { inMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-checkIns-repository"
import { ValidateCheckinService } from "./validate-checkin"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { ResourceNotExists } from "./errors/resource-not-exists"

let checkinRepository : inMemoryCheckInRepository
let sut :ValidateCheckinService
describe('Validate Checkin service', () => {
    beforeEach(async () => {
        checkinRepository = new inMemoryCheckInRepository()
        sut = new ValidateCheckinService(checkinRepository)


        // vi.useFakeTimers()
    })
    afterEach(() =>{
        // vi.useRealTimers()
    })
    it('should be able to validate the checkin', async () => {

        const checkin = await checkinRepository.create({
            gym_id: "gym-01",
            user_id: "user-01",
        })

        const {checkIn} = await sut.execute({
            checkinId: checkin.id
        })

        expect(checkin.validated_at).toEqual(expect.any(Date))
        expect(checkinRepository.items[0].validated_at).toEqual(expect.any(Date))
    })

    it('should not be able to validate an inexistent checkin', async () => {

        await expect(() => sut.execute({
            checkinId: "inexistent-checkin-id"
        })).rejects.toBeInstanceOf(ResourceNotExists)
    })

})