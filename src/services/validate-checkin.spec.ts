import { inMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-checkIns-repository"
import { ValidateCheckinService } from "./validate-checkin"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { ResourceNotExistsError } from "./errors/resource-not-exists"
import dayjs from "dayjs"

let checkinRepository : inMemoryCheckInRepository
let sut :ValidateCheckinService
describe('Validate Checkin service', () => {
    beforeEach(async () => {
        checkinRepository = new inMemoryCheckInRepository()
        sut = new ValidateCheckinService(checkinRepository)


        vi.useFakeTimers()
    })
    afterEach(() =>{
        vi.useRealTimers()
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
        })).rejects.toBeInstanceOf(ResourceNotExistsError)
    })

    it('should not be abe to validate the checkin after 20 minutes of its creation', async () => {
        vi.setSystemTime(new Date(2025,2,24,17,28))
        const createdCheckin = await checkinRepository.create({
            gym_id: "gym-01",
            user_id: "user-01",
        })

        const vinteUmMinutosEmMs = 1000 * 60 * 21

        vi.advanceTimersByTime(vinteUmMinutosEmMs)

        await expect (() => sut.execute({
            checkinId: createdCheckin.id
        })).rejects.toBeInstanceOf(Error)
    })

})